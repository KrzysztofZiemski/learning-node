import { expect, test, describe, jest } from "@jest/globals";
import request from "supertest";
import app from "../../app";

const dateInFuture = new Date("2092-01-01").toString();

describe("Test GET /launches", () => {
  test("It should respond withh 200 success", async () => {
    const response = await request(app).get("/launches");
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});

describe("Test POST /launches", () => {
  test("It should respond withh 200 success", async () => {
    const payload = {
      mission: "aaa",
      rocket: "rocket 1",
      destination: "uua",
      launchDate: dateInFuture,
    };

    const response = await request(app)
      .post("/launches")
      .set("Accept", "application/json")
      .send(payload);
    expect(response.statusCode).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);

    //setting same format date like in payload
    response.body.launchDate = new Date(response.body.launchDate).toString();

    expect(response.body).toMatchObject(payload);
  });

  test("It should catch missing required properties", async () => {
    const payload = {
      mission: "aaa",
      rocket: "rocket 1",
      //missing destination property
      launchDate: dateInFuture,
    };

    const response = await request(app)
      .post("/launches")
      .set("Accept", "application/json")
      .send(payload);
    expect(response.statusCode).toEqual(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toStrictEqual({
      error: "Invalid input Data",
      fields: "destination",
    });
  });

  test("It should catch invalid dates", async () => {
    const payload = {
      mission: "aaa",
      rocket: "rocket 1",
      destination: "uua",
      launchDate: "zoot",
    };

    const response = await request(app)
      .post("/launches")
      .set("Accept", "application/json")
      .send(payload);
    expect(response.statusCode).toEqual(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toStrictEqual({
      error: "Invalid input Data",
      fields: "launchDate",
    });
  });
});
