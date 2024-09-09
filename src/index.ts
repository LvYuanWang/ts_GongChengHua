// console.log(num);
// console.log(str);
// console.log(nickname);

// const call = nickname;

// const p = power(2, 3);

// const MyAdd: FnAdd = (a, b) => a + b;

// const person: Person = {
//   id: 1,
//   name: 'Joker',
//   age: 18
// }

// import _ from 'lodash';
// const r = _.add(1, 3);
// console.log(r);

// import notFound from './assets/404.png';
// console.log(notFound);

const user: User.UserInfo = {
  _id: '1',
  loginId: 'joker',
  loginPwd: '123456',
  loves: ['LOL', 'PuBg'],
  name: 'Joker',
  age: 18,
  address: {
    province: 'Jiangsu',
    city: 'Nanjing'
  }
}

const a: Animal = {
  id: 1,
  name: 'Joker'
}

// 希望给内置的String类型添加自定义方法
if (!String.prototype.propendHello) {
  String.prototype.propendHello = function () {
    return 'Hello ' + this;
  }
}

if (!Array.prototype.removeLast) {
  Array.prototype.removeLast = function () {
    this.pop();
    return this;
  }
}

console.log("typescript".propendHello());

const arr = ['a', 'b', 'c'];
console.log(arr.removeLast());


// 声明合并
// type A = {
//   id: number;
// }

class A {
  constructor(public id: number, public age: number) { }
}

interface A {
  name: string;
}

const a2: A = {
  id: 1,
  age: 18,
  name: 'Joker'
}