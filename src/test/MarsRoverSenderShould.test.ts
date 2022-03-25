import { mock } from "jest-mock-extended";

import { INasaAntenna } from "../main/infrastructure/spacecomm/INasaAntenna";
import { MarsRoverSender } from "../main/infrastructure/spacecomm/MarsRoverSender";

describe("Test: MarsRoverSender", () => {
  it("should send message correctly", () => {
    const nasaAntenna: INasaAntenna = mock<INasaAntenna>();
    const marsRoverSender: MarsRoverSender = new MarsRoverSender(nasaAntenna);

    marsRoverSender.send("6 99 S");

    expect(nasaAntenna.received).toBeCalledWith(["X6", "Y99", "DS"]);
  });

  it("should send error message", () => {
    const nasaAntenna: INasaAntenna = mock<INasaAntenna>();
    const marsRoverSender: MarsRoverSender = new MarsRoverSender(nasaAntenna);

    marsRoverSender.sendError();

    expect(nasaAntenna.received).toBeCalledWith(["ER"]);
  });
});
