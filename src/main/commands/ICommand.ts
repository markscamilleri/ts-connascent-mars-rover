import { Position } from "../model/Position";

export interface ICommand {
  execute(position: Position): Position;
}

export type IMovementCommand = ICommand;
