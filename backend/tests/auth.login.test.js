const request = require("supertest");
const app = require("../src/app");

describe("Auth: Login", () => {
  it("should fail for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "wrongpassword"
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should login successfully with correct credentials", async () => {
    // NOTE: this user must exist in DB (created via register test)
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "amit@example.com",
        password: "secret123"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
