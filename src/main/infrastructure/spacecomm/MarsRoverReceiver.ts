import { IMessageReceivedBus } from "../bus/IMessageReceivedBus";
import { IWriteToServiceBus } from "../bus/IWriteToServiceBus";
import { INotifier } from "../INotifier";
import { SmartTimer } from "../timing/SmartTimer";
import { Message } from "./Message";

export class MarsRoverReceiver implements IWriteToServiceBus {
  private marsRoverServiceBus!: IMessageReceivedBus;
  private datagrams: Array<string> = new Array<string>();
  private smartTimer: SmartTimer = new SmartTimer();
  private notifier: INotifier = new (class implements INotifier {
    private receiver: MarsRoverReceiver;
    constructor(receiver: MarsRoverReceiver) {
      this.receiver = receiver;
    }
    notifyMessage(data: Array<string>): void {
      this.receiver.notifyMessage2(data);
    } // Order
  })(this);
  private MAX_DELAY_MILLISECONDS = 3000;

  writesTo(marsRoverServiceBus: IMessageReceivedBus): void {
    this.marsRoverServiceBus = marsRoverServiceBus;
  }

  received(datagram: string): void {
    this.datagrams.push(datagram);

    const message: Message = new Message(this.datagrams);

    if (message.isValid()) {
      // alogorithm
      this.marsRoverServiceBus.NotifyMessageReceived(message.toString());
      return;
    }

    this.smartTimer
      .waitMillisecond(this.MAX_DELAY_MILLISECONDS)
      .beforeDoing(this.notifier, this.datagrams);
  }

  private notifyMessage2(datagrams: Array<string>): void {
    const message: Message = new Message(datagrams);
    if (message.isValid()) {
      // alogorithm
      this.marsRoverServiceBus.NotifyMessageReceived(message.toString());
      return;
    }
    this.marsRoverServiceBus.NotifyError();
  }
}
