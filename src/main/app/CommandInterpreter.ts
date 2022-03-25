import { ICommand } from "../commands/ICommand";
import { InitializationCommand } from "../commands/InitializationCommand";
import { MoveForwardCommand } from "../commands/MoveForwardCommand";
import { StartingPositionCommand } from "../commands/StartingPositionCommand";
import { TurnLeftCommand } from "../commands/TurnLeftCommand";
import { TurnRightCommand } from "../commands/TurnRightCommand";
import { Commands } from "../model/Commands";
import { Coordinate } from "../model/Coordinate";
import { Direction } from "../model/Direction";
import { Position } from "../model/Position";

export class CommandInterpreter {
  private letterToDirection: Map<string, Direction> = new Map([
    ["N", Direction.NORTH()],
    ["E", Direction.EAST()],
    ["S", Direction.SOUTH()],
    ["W", Direction.WEST()],
  ]);

  translate(commands: string): Commands {
    return {
      initializationCommand: this.getInitializationCommand(commands),
      startingPositionCommand: this.getStartingPositionCommand(commands),
      movementCommands: this.getMovementCommands(commands),
    };
  }

  private getMovementCommands(commands: string): ICommand[] {
    const movementCommands = new Array<ICommand>();
    const lines: string[] = commands.split("\n");
    for (const command of Array.from(lines[2])) {
      //Position
      switch (
        command //Meaning
      ) {
        case "L":
          movementCommands.push(new TurnLeftCommand());
          break;
        case "F":
          movementCommands.push(new MoveForwardCommand());
          break;
        case "R":
          movementCommands.push(new TurnRightCommand());
          break;
      }
    }
    return movementCommands;
  }

  private getInitializationCommand(commands: string): InitializationCommand {
    const lines: string[] = commands.split("\n");
    const topRight: string[] = lines[0].split(" "); //Position
    return new InitializationCommand(
      new Coordinate(parseInt(topRight[0]), parseInt(topRight[1]))
    );
  }

  private getStartingPositionCommand(
    commands: string
  ): StartingPositionCommand {
    const lines: string[] = commands.split("\n"); // position
    const coords: string[] = lines[1].split(" "); // position

    const coordinate: Coordinate = new Coordinate(
      parseInt(coords[0]),
      parseInt(coords[1])
    ); // position
    const direction: Direction = <Direction>(
      this.letterToDirection.get(coords[2])
    ); // position
    const position: Position = new Position(
      coordinate.x,
      coordinate.y,
      direction.toString()
    ); //Type
    return new StartingPositionCommand(position);
  }
}
