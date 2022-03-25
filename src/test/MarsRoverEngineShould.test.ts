import { MarsRoverEngine } from "../main/app/MarsRoverEngine";
import { InitializationCommand } from "../main/commands/InitializationCommand";
import { MoveForwardCommand } from "../main/commands/MoveForwardCommand";
import { StartingPositionCommand } from "../main/commands/StartingPositionCommand";
import { TurnLeftCommand } from "../main/commands/TurnLeftCommand";
import { TurnRightCommand } from "../main/commands/TurnRightCommand";
import { Commands } from "../main/model/Commands";
import { Coordinate } from "../main/model/Coordinate";
import { Position } from "../main/model/Position";

describe("MarsRoverEngine ", () => {
  it.each([
    [
      {
        movementCommands: [],
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(2, 2, "N")
        ),
      },
      new Position(2, 2, "N"),
    ],
    [
      {
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(2, 2, "N")
        ),
        movementCommands: [new TurnLeftCommand()],
      },
      new Position(2, 2, "W"),
    ],
    [
      {
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(2, 2, "N")
        ),
        movementCommands: [new TurnRightCommand()],
      },
      new Position(2, 2, "E"),
    ],
    [
      {
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(2, 2, "2")
        ),
        movementCommands: [new MoveForwardCommand()],
      },
      new Position(2, 3, "N"),
    ],
  ] as Array<[Commands, Position]>)(
    "should execute commands %s then end in %s position",
    (commands, finalPosition) => {
      const roverEngine: MarsRoverEngine = new MarsRoverEngine();

      roverEngine.execute(commands);

      const position = roverEngine.getPosition();
      expect(position).toStrictEqual(finalPosition);
    }
  );
});
