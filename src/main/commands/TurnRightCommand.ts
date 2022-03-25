import { Position } from "../model/Position";
import { IMovementCommand } from "./ICommand";

export class TurnRightCommand implements IMovementCommand {
  execute(position: Position): Position {
    return position.turnRight();
  }
}
