import { Commands } from "../model/Commands";
import { Position } from "../model/Position";

export class MarsRoverEngine {
  private position: Position = new Position(0, 0, "N");

  execute({ startingPositionCommand, movementCommands }: Commands): void {
    this.position = startingPositionCommand.execute(this.position);

    for (const movementCommand of movementCommands) {
      this.position = movementCommand.execute(this.position);
    }
  }
  getPosition(): Position {
    return this.position;
  }
}
