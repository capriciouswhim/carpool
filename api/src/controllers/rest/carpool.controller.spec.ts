import { PlatformTest } from "@tsed/platform-http/testing";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CarpoolController } from "./carpool.controller.js";

describe("CarpoolController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<CarpoolController>(CarpoolController);
    // const instance = PlatformTest.invoke<CarpoolController>(CarpoolController); // get fresh instance

    expect(instance).toBeInstanceOf(CarpoolController);
  });
});
