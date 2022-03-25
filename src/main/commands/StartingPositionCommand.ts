import { Position } from "../model/Position";
import { ICommand } from "./ICommand";

export class StartingPositionCommand implements ICommand {
  private startingPosition: Position;

  constructor(startingPosition: Position) {
    this.startingPosition = startingPosition;
  }

  execute(position: Position): Position {
    return this.startingPosition;
  }
}
