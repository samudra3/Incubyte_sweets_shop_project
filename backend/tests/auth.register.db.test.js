const request = require("supertest");
const app = require("../src/app");
const User = require("../src/modules/auth/user.model");

describe("Auth: Register with DB", () => {
  it("should store user in database with hashed password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Amit Verma",
        email: "amit@example.com",
        password: "secret123"
      });

    const user = await User.findOne({ email: "amit@example.com" });

    expect(user).not.toBeNull();
    expect(user.password).not.toBe("secret123");
  });
});
