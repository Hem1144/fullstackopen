const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Blog API Tests", () => {
  test("GET /api/blogs returns correct amount of blog posts in JSON format", async () => {
    const response = await supertest(app).get("/api/blogs");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(2);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
