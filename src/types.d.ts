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

// declare module: 表示声明一个模块
// declare namespace: 表示声明一个命名空间
// declare global: 表示声明一个全局变量(必须要在模块化的环境中才有效)

declare namespace User {
  interface Address {
    province: string;
    city: string;
  }

  interface UserInfo {
    _id: string;
    loginId: string;
    loginPwd: string;
    loves: string[];
    name: string;
    age: number;
    address: Address;
  }
}