export interface INasaAntenna {
  received(datagrams: string[]): void;
}
