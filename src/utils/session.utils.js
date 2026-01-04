const redis = require("../config/redis");

async function saveSession(
  sessionId,
  { id, name, email, role, refreshToken },
  ttl = 60 * 60 * 24 * 7
) {
  const sessionKey = `session:${sessionId}`;
  await redis.set(
    sessionKey,
    JSON.stringify({ id, name, email, role, refreshToken }),
    "EX",
    ttl
  );
}

async function getSession(sessionId) {
  const sessionKey = `session:${sessionId}`;
  const data = await redis.get(sessionKey);
  return data ? JSON.parse(data) : null;
}

async function deleteSession(sessionId) {
  const sessionKey = `session:${sessionId}`;
  await redis.del(sessionKey);
}

module.exports = {
  saveSession,
  getSession,
  deleteSession,
};
