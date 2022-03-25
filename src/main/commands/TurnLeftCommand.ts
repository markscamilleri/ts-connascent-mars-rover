import { Position } from "../model/Position";
import { IMovementCommand } from "./ICommand";

export class TurnLeftCommand implements IMovementCommand {
  execute(position: Position): Position {
    return position.turnLeft();
  }
}
