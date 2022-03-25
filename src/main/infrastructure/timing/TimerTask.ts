export interface TimerTask {
  // Manual
  run(): void;

  cancel(): void;
}
