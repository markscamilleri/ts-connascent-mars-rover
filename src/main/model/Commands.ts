import { IMovementCommand } from "../commands/ICommand";
import { InitializationCommand } from "../commands/InitializationCommand";
import { StartingPositionCommand } from "../commands/StartingPositionCommand";

export interface Commands {
  initializationCommand: InitializationCommand;
  startingPositionCommand: StartingPositionCommand;
  movementCommands: IMovementCommand[];
}
