import { CommandInterpreter } from "../main/app/CommandInterpreter";
import { InitializationCommand } from "../main/commands/InitializationCommand";
import { MoveForwardCommand } from "../main/commands/MoveForwardCommand";
import { StartingPositionCommand } from "../main/commands/StartingPositionCommand";
import { TurnLeftCommand } from "../main/commands/TurnLeftCommand";
import { TurnRightCommand } from "../main/commands/TurnRightCommand";
import { Commands } from "../main/model/Commands";
import { Coordinate } from "../main/model/Coordinate";
import { Position } from "../main/model/Position";

describe("Command Interpreter ", () => {
  it.each([
    [
      "5 5\n3 3 E\nLFLFR",
      {
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(3, 3, "E")
        ),
        movementCommands: [
          new TurnLeftCommand(),
          new MoveForwardCommand(),
          new TurnLeftCommand(),
          new MoveForwardCommand(),
          new TurnRightCommand(),
        ],
      },
    ],
    [
      "5 5\n3 3 E\nL",
      {
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(3, 3, "E")
        ),
        movementCommands: [new TurnLeftCommand()],
      },
    ],
    [
      "5 5\n3 3 E\nF",
      {
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(3, 3, "E")
        ),
        movementCommands: [new MoveForwardCommand()],
      },
    ],
    [
      "5 5\n3 3 E\nR",
      {
        initializationCommand: new InitializationCommand(new Coordinate(5, 5)),
        startingPositionCommand: new StartingPositionCommand(
          new Position(3, 3, "E")
        ),
        movementCommands: [new TurnRightCommand()],
      },
    ],
  ] as Array<[string, Commands]>)(
    "should parse commands",
    (inputCommand: string, expectedCommands: Commands) => {
      const commandInterpreter: CommandInterpreter = new CommandInterpreter();
      const commands: Commands = commandInterpreter.translate(
        inputCommand.trim()
      );

      expect(commands).toStrictEqual(expectedCommands);
    }
  );
});
