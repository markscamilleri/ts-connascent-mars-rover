import { Position } from "../model/Position";
import { IMovementCommand } from "./ICommand";

export class MoveForwardCommand implements IMovementCommand {
  execute(position: Position): Position {
    return position.moveForward();
  }
}
