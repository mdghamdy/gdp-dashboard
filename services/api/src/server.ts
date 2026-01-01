import cors from "@fastify/cors";
import Fastify from "fastify";

type AuditEventType = "CREATED" | "OPENED" | "SUBMITTED" | "EXPIRED";
type TokenStatus = "valid" | "expired" | "used";

type TokenRecord = {
  token: string;
  status: TokenStatus;
  expiresAt: number;
  audit: AuditEventType[];
  lastIdempotencyKey?: string;
  lastSubmission?: { answer: string };
};

const server = Fastify({ logger: true });

const tokens = new Map<string, TokenRecord>();

const createToken = (token: string, ttlMinutes: number) => {
  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
  const record: TokenRecord = {
    token,
    status: "valid",
    expiresAt,
    audit: ["CREATED"]
  };

  tokens.set(token, record);
  return record;
};

const isExpired = (record: TokenRecord) => Date.now() > record.expiresAt;

const markExpired = (record: TokenRecord) => {
  if (!record.audit.includes("EXPIRED")) {
    record.audit.push("EXPIRED");
  }
  record.status = "expired";
};

createToken("demo-token", 60);

server.get("/health", async () => {
  return { status: "ok" };
});

server.get("/tokens/:token", async (request, reply) => {
  const { token } = request.params as { token: string };
  const record = tokens.get(token);

  if (!record) {
    return reply.code(404).send({ status: "expired" });
  }

  if (record.status === "used") {
    return reply.send({ status: "used" });
  }

  if (isExpired(record)) {
    markExpired(record);
    return reply.send({ status: "expired" });
  }

  record.audit.push("OPENED");
  return reply.send({ status: "valid" });
});

server.post("/tokens/:token/submit", async (request, reply) => {
  const { token } = request.params as { token: string };
  const idempotencyKey = request.headers["idempotency-key"];

  if (!idempotencyKey || Array.isArray(idempotencyKey)) {
    return reply.code(400).send({ message: "Idempotency-Key header required." });
  }

  const body = request.body as { answer?: string };
  const record = tokens.get(token);

  if (!record) {
    return reply.code(404).send({ status: "expired" });
  }

  if (record.status === "used") {
    return reply.send({ status: "used", submission: record.lastSubmission });
  }

  if (isExpired(record)) {
    markExpired(record);
    return reply.send({ status: "expired" });
  }

  if (record.lastIdempotencyKey === idempotencyKey) {
    return reply.send({ status: "used", submission: record.lastSubmission });
  }

  record.lastIdempotencyKey = idempotencyKey;
  record.lastSubmission = { answer: body.answer ?? "" };
  record.status = "used";
  record.audit.push("SUBMITTED");

  return reply.send({ status: "used" });
});

const start = async () => {
  try {
    await server.register(cors, { origin: true });
    await server.listen({ port: 3000, host: "0.0.0.0" });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
