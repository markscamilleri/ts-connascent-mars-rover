import { ServiceBus } from "./infrastructure/bus/ServiceBus";
import { ISendNotifications } from "./infrastructure/ISendNotifications";
import { MarsRoverController } from "./infrastructure/MarsRoverController";
import { MarsRoverReceiver } from "./infrastructure/spacecomm/MarsRoverReceiver";

export class MarsRover {
  private marsRoverServiceBus: ServiceBus;
  private marsRoverReceiver: MarsRoverReceiver;
  private marsRoverSender: ISendNotifications;
  private controller: MarsRoverController;

  constructor(
    marsRoverServiceBus: ServiceBus,
    marsRoverReceiver: MarsRoverReceiver,
    marsRoverSender: ISendNotifications,
    controller: MarsRoverController
  ) {
    this.marsRoverServiceBus = marsRoverServiceBus;
    this.marsRoverReceiver = marsRoverReceiver;
    this.marsRoverSender = marsRoverSender;
    this.controller = controller;

    this.marsRoverReceiver.writesTo(this.marsRoverServiceBus);

    this.controller.readsFrom(this.marsRoverServiceBus);
    this.controller.writesTo(this.marsRoverServiceBus);

    this.marsRoverSender.readsFrom(this.marsRoverServiceBus);
  }
}
