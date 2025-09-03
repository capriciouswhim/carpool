import { PlatformTest } from "@tsed/platform-http/testing";
import SuperTest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Server } from "../server.js";
import { CarpoolController } from "./carpool.controller.js";

describe("CarpoolController", () => {
  beforeAll(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [CarpoolController]
      }
    })
  );
  afterAll(PlatformTest.reset);

  it("should call GET /carpool", async () => {
    const request = SuperTest(PlatformTest.callback());
    const response = await request.get("/carpool").expect(200);

    expect(response.text).toEqual("carpool");
  });
});
