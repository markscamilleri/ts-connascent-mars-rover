import { Coordinate } from "../model/Coordinate";
import { Position } from "../model/Position";
import { ICommand } from "./ICommand";

export class InitializationCommand implements ICommand {
  private topRightCoordinate: Coordinate;

  constructor(topRightCoordinate: Coordinate) {
    this.topRightCoordinate = topRightCoordinate;
  }

  execute(position: Position): Position {
    return position;
  }
}
