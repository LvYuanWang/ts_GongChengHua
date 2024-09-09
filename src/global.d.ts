export { }

declare global {
  interface Animal {
    id: number;
    name: string;
  }

  interface String {
    propendHello(): string;
  }

  interface Array<T> {
    removeLast(): T[];
  }
}