const request = require("supertest");
const app = require("../src/app");
const Sweet = require("../src/modules/sweets/sweet.model");
const jwt = require("jsonwebtoken");

describe("Sweets: Search", () => {
  let token;

  beforeAll(() => {
    token = jwt.sign(
      { userId: "test-user-id", role: "user" },
      process.env.JWT_SECRET
    );
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});
    await Sweet.insertMany([
      {
        name: "Kaju Katli",
        category: "Dry Fruit",
        price: 500,
        quantity: 10
      },
      {
        name: "Gulab Jamun",
        category: "Milk",
        price: 200,
        quantity: 20
      }
    ]);
  });

  it("should search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=kaju")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Kaju Katli");
  });

  it("should filter sweets by price range", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=100&maxPrice=300")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Gulab Jamun");
  });
});
