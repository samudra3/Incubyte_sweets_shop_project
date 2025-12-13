const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/modules/auth/user.model");
const Sweet = require("../src/modules/sweets/sweet.model");
const jwt = require("jsonwebtoken");

describe("Sweets: Create (Admin)", () => {
  let adminToken;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@sweets.com",
      password: "hashedpassword",
      role: "admin"
    });

    adminToken = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET
    );
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it("should allow admin to add a new sweet", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Kaju Katli",
        category: "Mithai",
        price: 800,
        quantity: 20
      });

    expect(response.statusCode).toBe(201);

    const sweet = await Sweet.findOne({ name: "Kaju Katli" });
    expect(sweet).not.toBeNull();
    expect(sweet.category).toBe("Mithai");
  });

  it("should block non-admin users", async () => {
    const user = await User.create({
      name: "Normal User",
      email: "user@sweets.com",
      password: "hashedpassword",
      role: "user"
    });

    const userToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Mithai",
        price: 300,
        quantity: 10
      });

    expect(response.statusCode).toBe(403);
  });
});
