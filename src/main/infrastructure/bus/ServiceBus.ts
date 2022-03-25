import { IProcessMessages } from "../IProcessMessages";
import { IReadMessages } from "../IReadMessages";
import { ISendNotifications } from "../ISendNotifications";
import { IMessageReceivedBus } from "./IMessageReceivedBus";
import { ISendFinalStateBus } from "./ISendFinalStateBus";
import { ISendNotificationBus } from "./ISendNotificationBus";

export class ServiceBus
  implements
    IMessageReceivedBus,
    ISendFinalStateBus,
    ISendNotificationBus,
    IReadMessages
{
  private marsRoverController!: IProcessMessages;
  private marsRoverSender!: ISendNotifications;

  callback(marsRoverController: IProcessMessages): void {
    this.marsRoverController = marsRoverController;
  }

  trigger(marsRoverSender: ISendNotifications): void {
    this.marsRoverSender = marsRoverSender;
  }

  NotifyMessageReceived(rebuiltMessage: string): void {
    this.marsRoverController.process(rebuiltMessage);
  }

  NotifyError(): void {
    this.marsRoverSender.sendError();
  }

  NotifyExecution(finalState: string): void {
    this.marsRoverSender.send(finalState);
  }
}
