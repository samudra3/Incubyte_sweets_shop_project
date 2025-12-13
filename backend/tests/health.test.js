const request = require("supertest");
const app = require("../src/app");

describe("Health Check API", () => {
  it("should confirm API is running", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet Shop API is running");
  });
});
