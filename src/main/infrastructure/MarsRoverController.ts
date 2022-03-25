import { CommandInterpreter } from "../app/CommandInterpreter";
import { MarsRoverEngine } from "../app/MarsRoverEngine";
import { Commands } from "../model/Commands";
import { Position } from "../model/Position";
import { ISendNotificationBus } from "./bus/ISendNotificationBus";
import { IProcessMessages } from "./IProcessMessages";
import { IReadMessages } from "./IReadMessages";

export class MarsRoverController implements IProcessMessages {
  private marsRoverEngine: MarsRoverEngine;
  private commandInterpreter: CommandInterpreter;
  private marsRoverServiceWriter!: ISendNotificationBus;

  constructor() {
    this.marsRoverEngine = new MarsRoverEngine();
    this.commandInterpreter = new CommandInterpreter();
  }

  //name
  writesTo(marsRoverServiceBus: ISendNotificationBus): void {
    this.marsRoverServiceWriter = marsRoverServiceBus;
  }

  //name
  readsFrom(marsRoverServiceBus: IReadMessages): void {
    marsRoverServiceBus.callback(this);
  }

  process(messageReceived: string): void {
    const commands: Commands =
      this.commandInterpreter.translate(messageReceived);
    this.marsRoverEngine.execute(commands);
    const finalPosition: Position = this.marsRoverEngine.getPosition();
    this.marsRoverServiceWriter.NotifyExecution(finalPosition.toString());
  }
}
