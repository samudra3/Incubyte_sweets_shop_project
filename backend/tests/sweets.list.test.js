const request = require("supertest");
const app = require("../src/app");
const Sweet = require("../src/modules/sweets/sweet.model");
const jwt = require("jsonwebtoken");

describe("Sweets: List", () => {
  let token;

  beforeAll(async () => {
    token = jwt.sign(
      { userId: "test-user-id", role: "user" },
      process.env.JWT_SECRET
    );
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});
    await Sweet.create({
      name: "Kaju Katli",
      category: "Dry Fruit",
      price: 500,
      quantity: 10
    });
  });

  it("should return list of sweets for authenticated user", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should block unauthenticated access", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(401);
  });
});
