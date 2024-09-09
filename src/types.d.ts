declare let num: number;
declare let str: string;
declare const nickname = "Joker";
declare function power(x: number, y: number): number;

type FnAdd = (a: number, b: number) => number;

interface Person {
  id: number;
  name: string;
  age: number;
}