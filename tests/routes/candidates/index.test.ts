import createServer from "../../../src/server";
import { initializeDB } from "../../../src/database";

const fastify = createServer();

afterAll(() => fastify.close(() => null));

beforeEach(async () => {
  await initializeDB();
});

test("Test Get /api/candidates", async () => {
  try {
    const response = await fastify.inject({
      method: "GET",
      url: "/api/candidates"
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(JSON.parse(response.payload))).toBeTruthy();
  } catch (error) {
    expect(error).toBeFalsy();
  }
});
