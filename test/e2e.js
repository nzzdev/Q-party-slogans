"use strict";

const expect = require("chai").expect;
const server = require("../server.js");
const plugins = require("../server-plugins.js");
const routes = require("../routes/routes.js");

async function start() {
  await server.register(plugins);
  server.route(routes);
  await server.start();

  describe("basic routes", () => {
    it("starts the server", () => {
      expect(server.info.port).to.be.equal(3000);
    });

    it("is healthy", async () => {
      const response = await server.inject("/health");
      expect(response.payload).to.be.equal("ok");
    });
  });

  describe("schema endpoint", () => {
    it("returns 200 for /schema.json", async () => {
      const response = await server.inject("/schema.json");
      expect(response.statusCode).to.be.equal(200);
    });
  });

  describe("stylesheet endpoint", () => {
    it("returns 200 for /stylesheet/default.123.css", async () => {
      const response = await server.inject("/stylesheet/default.123.css");
      expect(response.statusCode).to.be.equal(200);
    });

    it("returns 404 for inexistent stylesheet", async () => {
      const response = await server.inject("/stylesheet/inexisting.123.css");
      expect(response.statusCode).to.be.equal(404);
    });
  });

  const mockData = require("../resources/fixtures/data/complete.js");

  describe("rendering-info endpoint", () => {
    it("returns 200 for /rendering-info/html-static", async () => {
      const request = {
        method: "POST",
        url: "/rendering-info/html-static",
        payload: JSON.stringify({ item: mockData, toolRuntimeConfig: {} })
      };
      const response = await server.inject(request);
      expect(response.statusCode).to.be.equal(200);
    });
  });

  describe("fixture data endpoint", () => {
    it("returns 3 fixture data items for /fixtures/data", async () => {
      const response = await server.inject("/fixtures/data");
      expect(response.statusCode).to.be.equal(200);
      expect(response.result.length).to.be.equal(3);
    });
  });
}

start();
