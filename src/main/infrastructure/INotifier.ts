export interface INotifier {
  notifyMessage(datagrams: Array<string>): void;
}
