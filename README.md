## 什么是类型声明文件

类型声明与模块化 And 类型声明相关处理

在前面的代码中，我们说从 `typescript` 编译到 `Javascript` 的过程中，类型消失了，比如下面的代码：

```typescript
const str = "hello";
type User = {
    id: number
    name: string
    show?: (id: number, name: string) => void
}

const u:User = {
    id:1,
    name:"张三",
    show(id,name){
        console.log(id,name)
    }
}

const users:Array<User> = [
    {id:1,name:"jack"},
    {id:2,name:"rose"}
]

function addUser(u:User){
    // todos...
    return true;
}

addUser(u);
```

**编译成javascript之后：**

```javascript
"use strict";
const str = "hello";
const u = {
    id: 1,
    name: "张三",
    show(id, name) {
        console.log(id, name);
    }
};
const users = [
    { id: 1, name: "jack" },
    { id: 2, name: "rose" }
];
function addUser(u) {
    // todos...
    return true;
}
addUser(u);
```

但是是真的消失了吗？其实并不是，如果大家留意之前我们在[Playground](https://www.typescriptlang.org/zh/play?#code/MYewdgzgLgBNBOMC8MBEALApgG2yVA3AFBQCeADpjAKoSaIoDeRMrMAlgCYBcMYArgFsARvRZswAQ0GZeCdmADm41hHQgA7gH5uACi7cBI+gBopM7vKUBKZAD4YANxBciAXyKhIsft1r1kGGY2Dh4ARhMVPmlZVEACfUBIOVRIkLVNfU4zGOtgkLYvCBBsTAA6PEUMrJlrKI8PAp86eAhuAEF4eElSAB5-eAcUAG0oxgMI81iAK0lgAGtUNxS2UZ4AJirY+BA6BaIAXSIAM34wYCh2cBhJTk4+3V8+nKiAemeYKBBObZKfqPhMKD8eBgd7wfiYYgea63Jr3awEIA)上编写代码，专门有一项就叫做`DTS`

你会发现，我们写的代码都自动转换成了typescript类型声明。

当然，这在我们的VS Code编辑器中也能生成的。只需要在`tsconfig.json`文件中加上相关配置即可

```diff
{
  "compilerOptions": {
    "target": "es2016",                                  
    "esModuleInterop": true,                             
    "forceConsistentCasingInFileNames": true,            
    "strict": true,                                      
    "skipLibCheck": true,
    "outDir": "./dist",
+    "declaration": true,
+    "declarationDir": "./types",                                 
  },
  "include": ["src/**/*"],
  "exclude": ["./node_modules", "./dist", "./types"]
}
```

运行`tsc`，最后生成：**[文件名].d.ts**

```typescript
declare const str = "hello";
type User = {
    id: number;
    name: string;
    show?: (id: number, name: string) => void;
};
declare const u: User;
declare const users: Array<User>;
declare function addUser(u: User): boolean;
```

也就是说，类型并不是真的全部消失了，而是被放到了专门的类型声明文件里。

`.d.ts`结尾的文件，就是类型声明文件。`d`的含义就是`declaration`

其实`typescript`本身就包含**两种文件类型**

1、`.ts`文件：既包含类型信息，又包含可执行代码，可以被编译成`.js`文件后执行，主要是我们编写文件代码的地方

2、`.d.ts`文件：只包含类型信息的类型声明文件，不会被编译成`.js`代码，仅仅提供类型信息，所以类型文件的用途就是提供类型信息



## 类型声明文件的来源

类型声明文件主要有以下三种来源。

- TypeScript 编译器自动生成。
- TypeScript 内置类型文件。
- 外部模块的类型声明文件，需要自己安装。

### 自动生成

只要使用编译选项`declaration`，编译器就会在编译时自动生成单独的类型声明文件。

下面是在`tsconfig.json`文件里面，打开这个选项。

```typescript
{
  "compilerOptions": {
    "declaration": true
  }
}
```

[declaration](https://www.typescriptlang.org/tsconfig#declaration)这个属性还有其他两个属性有强关联：

- [`declarationDir`](https://www.typescriptlang.org/tsconfig#declarationDir)：指定生成的声明文件`d.ts`的输出目录

- [`emitDeclarationOnly`](https://www.typescriptlang.org/tsconfig#emitDeclarationOnly)：只输出 `d.ts` 文件，不输出 JavaScript 文件

- [`declarationMap`](https://www.typescriptlang.org/tsconfig#declarationMap)：为 `d.ts` 文件创建源映射

### 内置声明文件

安装 TypeScript 语言时，会同时安装一些内置的类型声明文件，主要是内置的全局对象（JavaScript 语言接口和运行环境 API）的类型声明。这也就是为什么`string`，`number`等等基础类型，Javascript的api直接就有类型提示的原因

内置声明文件位于 TypeScript 语言安装目录的`lib`文件夹内

![image-20240102214329416](./assets/image-20240102214329416.png)

这些内置声明文件的文件名统一为**lib.[description].d.ts**的形式，其中`description`部分描述了文件内容。比如，`lib.dom.d.ts`这个文件就描述了 DOM 结构的类型。

如果想了解对应的全局对象类型接口，可以去查看这些内置声明文件。

`tsconfig.json`中的配置`target`和`lib`其实就和内置声明文件是有关系的。TypeScript 编译器会自动根据编译目标`target`的值，加载对应的内置声明文件，默认不需要特别的配置。我们也可以指定加载哪些内置声明文件，自定义配置`lib`属性即可:

```typescript
"lib":["es2020","dom","dom.iterable"]
```

> **为什么我们没有安装typescript之前也有提示？**
>
> 这是由于我们的`VS Code`等IDE工具在安装或者更新的时候，已经内置了typescript的lib。一般在`你的VS Code安装路径` -> `resources` -> `app` -> `extensios` -> `node_modules` -> `typescript` 下
>
> 
>
> 如果你的`VS Code`一直没有升级，就有可能导致本地`VS Code`的`typescript`版本跟不上的情况，如果你的项目目录下，也安装的的有typescript，我们是可以进行切换的。
>
> 在`VS Code`中使用快捷键`ctrl(command) + shift + P`，输入`TypeScript`
>
> ![image-20240102215331260](./assets/image-20240102215331260.png)
>
> 选择`Select Typescript Version...`
>
> ![image-20240102215516047](./assets/image-20240102215516047.png)
>
> 你可以选择使用`VS Code`版本还是项目工作区的版本

### 外部类型声明文件

如果项目中使用了外部的某个第三方库，那么就需要这个库的类型声明文件。这时又分成三种情况了。

**1、第三方库自带了类型声明文件**

**2、社区制作的类型声明文件**

**3、没有类型声明文件**

没有类型声明这个很容易理解，我们现在不纠结这种情况，而且大多数情况下，我们也不应该去纠结他，关键是1,2两点是什么意思？其实我们下载两个常用的第三方库就能很明显的看出问题。

```shell
npm i axios lodash
```



> 注意：引入模块之前，涉及到模块的查找方式，因此在tsconfig.json中需要配置**[module](https://www.typescriptlang.org/tsconfig#module)**
>
> 对于现代 **Node.js 项目**，我们可以配置`nodenext`，注意这个配置会影响下面三个配置：
>
> ```typescript
> "moduleResolution": "nodenext",
> "esModuleInterop": true,
> "target": "esnext",
> ```
>
> 当然，**具体模块化的配置，不同的环境要求是不一样的，有一定的区别**，比如是nodejs环境，还是webpack的打包环境，或者说是在写一个第三方库的环境，对于模块化的要求是不一样的。而且还涉及到模块化解析方式等问题。这里就先不详细深入讲解了
>
> 我们先简单配置为`nodenext`即可

引入相关模块：

![image-20240103104705896](./assets/image-20240103104705896.png)

其实打开这两个库的源代码就能发现问题，axios是有`.d.ts`文件的，而lodash没有，也就是说根本没有类型声明，那当然就和提示的错误一样，无法找到模块的声明文件。

第三方库如果没有提供类型声明文件，社区往往会提供。TypeScript 社区主要使用 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)，各种类型声明文件都会提交到那里，已经包含了几千个第三方库。上面代码提示的错误，其实就是让我们到`@types`名称空间去下载lodash对应的类型声明，如果存在的话。当然，你也可以到[npm](https://www.npmjs.com/~types)上进行搜索。几乎你知道的所有较大的库，都会在上面找到，所以一般来说也要下载或者搜索都比较简单，`@types`开头，`/`后面加上**第三方库原来的名字**即可，比如：

`@types/lodash`，`@types/jquery`，`@types/node`，`@types/react`，`@types/react-dom`等等

```typescript
npm i --save-dev @types/lodash
```

```typescript
import lodash from 'lodash'

const result = lodash.add(1, 2);
console.log(result)
```



![image-20240103120656959](./assets/image-20240103120656959.png)



默认情况下，typescript会从`node_modules/@types`文件夹下导入所有类型声明至全局空间，（需要注意只会导入script文件中的声明至全局空间，module文件对全局空间是隐藏的）。

可以通过[typeRoots](https://www.typescriptlang.org/tsconfig#typeRoots)选项设置一系列为文件路径，指示typescript从哪些地方导入类型信息，默认值为`node_modules/@types`。不用纠结，一般人不会去改动这个配置，只不过如果你希望往里面添加新的配置路径，别忘记把默认的`node_modules/@types`加上。

其实，nodejs本身也没有TypeScript的类型声明，因此你会发现在`.ts`文件中直接引入nodejs相关的模块同样会报错

```typescript
import path from "path"; // error 找不到模块"path"或其相应的类型声明
```

同样，我们直接在[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)下载即可

```typescript
npm i @types/node -D
```



## 类型声明文件的用途

我们自己当然也能编写类型声明文件，但是声明文件`.d.ts`大多数时候是第三方库一起使用的，我们写代码教学阶段在nodejs环境下，单独去声明`.d.ts`文件没有太大的意义，首先大家要知道这个问题。所以，要使用`.d.ts`声明文件的场景一般是：

1、自己写了一个主要是Javascript代码的第三方库，需要给这写Javascript代码加上类型声明，以便用户使用的时候可以得到类型声明，方便调用API。

2、自己下载了别人写的第三方库，但是没有typescript类型声明，在社区 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)中也没有找到对应的类型声明，但是我们一定要用这个库，可以手动为这个库添加一些简单的类型声明，以免我们自己项目在使用这个第三方库没有类型声明报出错误提示。

3、在做应用项目的时候，需要补充一些全局的类型声明的时候，我们可能需要自己动手写`.d.ts`文件，其实这种情况大多数还是和第2点有关系

所以大家首先要明白类型声明文件使用的场景，我们再来说怎么去使用它。

## 编写类型声明文件

从之前`tsc`编译自动生成的`.d.ts`文件就能看出，大多使用`declare`关键字进行声明。

`declare`关键字用于告诉TypeScript编译器：某个变量、常量、函数或类已经存在，即使它在当前文件中没有定义。这是一种类型声明的方式，允许你在不提供具体实现的情况下，定义一个变量的类型。

它只是通知编译器某个类型是存在的，不用给出具体实现。而且，最重要的，**`declare`关键字修饰的只要不在模块文件中都是全局声明**，也就是在文件`.d.ts`文件中声明之后，后续就直接可用了，不用再进行导入等这些操作

> **注意：只要声明文件中出现顶层的 `import` 或 `export`，那么这个声明文件就会被当做模块**，模块中所有的声明都是局部变量或局部类型，必须 `export` 导出后，才能在其他文件中 `import` 导入使用。

`declare` 关键字可以描述以下类型。

- 变量（const、let、var 命令声明）
- type 或者 interface 命令声明的类型
- class
- enum
- 函数（function）
- 模块（module）
- 命名空间（namespace）

**注意1：TS编译器会处理 tsconfig.json 的 [file](https://www.typescriptlang.org/tsconfig#files)、[include](https://www.typescriptlang.org/tsconfig#include)、[exclude](https://www.typescriptlang.org/tsconfig#exclude)对应目录下的所有 `.d.ts` 文件**

**注意2：如果`.d.ts`类型声明文件和可执行的`.ts`文件在同一目录下，文件名不能同名**

```typescript
//types.d.ts
declare var num: number;
declare let str1: string;
declare const str2 = "hello";

declare function power(a: number, b: number): number

type FnAdd = (a: number, b: number) => number

interface User  { 
  id: number
  name: string
}

declare module "foo" { 
  export var bar: number;
  export function baz(a: number): string;
}
```

**具体调用：**

```typescript
import { bar, baz } from "foo";

console.log(num);
console.log(str1);
console.log(str2);
const p = power(1, 2);

console.log(bar);
baz(10);

// 上面的代码在TS中并不会报错，因为在类型声明文件中已经声明了
// 但是并不能执行，因为运行时少了具体的实现
// 其实应该还有一个具体实现js文件，比如第三方引入的power函数的具体实现

const add: FnAdd = (a, b) => a + b;

const uu: User = {
  id: 1,
  name: "张三"
}
```

###  declare module

`declare module`，应该算类型声明中的语法，它的作用其实在一般的工作场景中我们都是用来对模块声明进行增强的。

如果还不知道上面说的这段是什么意思，我们可以使用第三方库来模拟一下，比如我们导入了lodash库，但是他没有类型声明，我们之前已经通过`@types/lodash`导入了类型声明，如果没有这个类型声明的话，我们完全也能自己去声明`.d.ts`文件，简单的屏蔽模块导入错误即可

```typescript
//lodash.d.ts
declare module "lodash" { 
  export function add(a: number, b: number): number;
  export function ceil(n: number, precision?: number): number;
}
```

还比如我们在实际工作中经常可能遇到找不到图片模块的问题:

```typescript
import notFound from "./assert/404.png";

找不到模块“./assert/404.png”或其相应的类型声明。ts(2307)
```

这时，我们就可以在声明文件中处理这种模块的声明

```typescript
declare module "*.png" {
  const src: string;
  export default src;
}
```

其他后缀名的图片，甚至是css，你想以模块化的方式引入都可以用这个方式。

不过需要注意的是，这种方式用到了通配符`*`，所以仅仅相当于告诉了ts，遇到了这种后缀的模块化引入就别报错了，但是并不会去验证路径到底是否正确。

### declare namespace

`namespace` 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。

由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 `module` 关键字表示内部模块。但由于后来 ES6 也使用了 `module` 关键字，ts 为了兼容 ES6，使用 `namespace` 替代了自己的 `module`，更名为命名空间。

随着 ES6 的广泛应用， `namespace`其实失去了原本的功能，有一些公司或者项目，可能会使用namespace拿来作为命名的区分。

比如，我们平时在业务系统中，一个比较常用的用法就是用**namespace**作为命名划分以免出现同名的情况，特别是在封装**api**类型的时候

```typescript
export namespace User {
  export interface Address { 
    province: string,
    city: string
  }
  export interface UserInfo { 
    _id: string;
    address: Address;
    age: number;
    loginId: string;
    loginPwd: string;
    loves: string[];
    name: string;
  }
}
```

### declare global

如果我们希望定义全局类型，那么就必须放在非模块文件中，简单来说就是文件首位不能出现`import`或者`export`，当然，如果当前文件已经是一个模块，但是希望导出一个全局类型，那么可以使用全局声明模块`declare global`，也就是说一般语法像下面这个样子：

```typescript
// global.d.ts
export {}

declare global{
  interface User { 
    id: number
    name: string
  }
}

// 使用:index.ts
let u: User = {
  id: 1,
  name: "typescript"
};
```

其实这样声明和之前在文件中直接写interface是一个意思，但是，约定俗称的，这样去声明全局模块看起来更加的规范明确，而且也没有必须要在非模块化文件中的这样的硬性要求。

所以，如果我们希望定义一些全局类型，更加推荐的是写在`declare global`中，特别是对原生代码类型的扩展。

比如我们要给全局类型String的原型上添加类型，就可以使用`declare global`去进行扩展



```typescript
// global.d.ts
export {};

declare global {
  interface String {
    prependHello(): string;
  }
}
```

`interface String`在是`lib.es5.d.ts`中有声明

使用：

```typescript
if (!String.prototype.prependHello) { 
  String.prototype.prependHello = function () {
    return "Hello, " + this;
  };
}

console.log("typescript".prependHello());
```

比如，我们还可以扩展原生的Array中的方法

```typescript
// global.d.ts
export {};

declare global {
  interface String {
    prependHello(): string;
  }

  interface Array<T> {
    removeLast(): T[];
  } 
}
```

使用：

```typescript
// index.ts
if (!String.prototype.prependHello) { 
  String.prototype.prependHello = function () {
    return "Hello, " + this;
  };
}

console.log("typescript".prependHello());

if (!Array.prototype.removeLast) {
  Array.prototype.removeLast = function () {
    this.pop();
    return this;
  };
}

const arr = ['a', 'b', 'c'];

console.log(arr.removeLast());
```



正如前面所说，大家需要留意，**如果类型声明文件中出现了`import`或者`export`等关键字，那么就会认为这个文件是一个模块声明，那么文件中所有使用declare声明的类型就自动变为了局部声明**

```typescript
export {}
```

## 声明合并

我们知道接口是可以声明合并的，但其实声明合并其实是TS中一个比较重要的特性，因此并不是接口所独有的。当然，我们一般用的较多的也就仅仅是接口的声明合并。其他的声明合并其实用的很少，滥用反而会引起混乱。这里列举了表格，表明哪些是可以声明合并的。

|          | 值   | 类   | 枚举 | 函数 | 类型别名 | 接口 | 命名空间 | 模块 |
| -------- | ---- | ---- | ---- | ---- | -------- | ---- | -------- | ---- |
| 值       | 否   | 否   | 否   | 否   | 是       | 是   | 否       | -    |
| 类       | -    | 否   | 否   | 否   | 否       | 是   | 是       | -    |
| 枚举     | -    | -    | 是   | 否   | 否       | 否   | 是       | -    |
| 函数     | -    | -    | -    | 否   | 是       | 是   | 是       | -    |
| 类型别名 | -    | -    | -    | -    | 否       | 否   | 是       | -    |
| 接口     | -    | -    | -    | -    | -        | 是   | 是       | -    |
| 命名空间 | -    | -    | -    | -    | -        | -    | 是       | -    |
| 模块     | -    | -    | -    | -    | -        | -    | 是       | 是   |



## 三斜线指令

当我们在编写一个全局声明文件但又依赖其他声明文件时，文件内不能出现 `import` 去导入其他声明文件的声明，此时就可以通过三斜线指令来引用其他的声明文件。

三斜线指令本质上就是一个自闭合的 XML 标签，其语法大致如下：

```typescript
/// <reference path="./xxx.d.ts" />
/// <reference types="node" />
/// <reference lib="es2017.string" />
```

可以看出来，三斜线其实也是一种注释语句，只不过在原有注释两条斜线 `//` 的基础上多写一条变成了三斜线 `///` , 之后通过 `<reference />` 来引用另一个声明文件。TS 解析代码时看到这样的注释就知道我们是要引用其他声明文件了。

三个参数，代表三种不同的指令引用。

- path
- types
- lib

**它们的区别是：`path` 用于声明对另一个文件的依赖，`types` 用于声明对另一个库的依赖，而`lib`用于声明对内置库的依赖**

> 全局声明文件不是全局都能用吗？为什么还需要引用？
>
> 注意我们前面说明`.d.ts`文件的**注意事项**，**TS编译器会处理 tsconfig.json 的 file、include、exclude对应目录下的所有 `.d.ts` 文件**
>
> 也就是说，如果在自己的项目中，出现了tsconfig.json声明之外的`.d.ts`文件是引用不了的。
>
> 另外，还有可能是我们需要引用其他第三方库的`.d.ts`文件
>
> 还有一种可能就是在第三方库或者特别是`DefinitelyTyped`中，`.d.ts`文件中的内容过多，为了更明显的区分不同的内容，会将文件中的内容拆分，然后再使用三斜线指令进行引用即可

**我们可以模拟一下这个场景：**

在`tsconfig.json`文件中，配置的`"include": ["src/**/*"]`。如果新建一个`.d.ts`文件在另外的目录，就解析不了这个文件。比如我们在根目录下创建新的目录`lib/index.d.ts`

```typescript
interface Student { 
  id: number
  name: string
}

type Level = "plain" | "silver" | "gold" | "platinum" | "diamond"
```

然后在`src/types.d.ts`中要使用`Student`和`Level`类型，现在这样是发现不了这两个类型的。

```typescript
/// <reference path="../lib/index.d.ts" />

interface User {
  id: number;
  name: string;
  level?: Level;
}
type showStudent = (stu: Student) => void;
```

使用三斜线指令之后，顺利找到类型。

> **注意：三斜线指令只能用在文件的头部**，如果用在其他地方，会被当作普通的注释。另外，若一个文件中使用了三斜线命令，那么在**三斜线指令之前只允许使用单行注释、多行注释和其他三斜线命令**，否则三斜杠命令也会被当作普通的注释。

我们也可以引入一下其他第三方库的`.d.ts`文件，比如我们可以引入vite，看看vite中的声明文件

```typescript
npm i vite
```

> **注意：** `vite`版本已经更新到5.0+了，需要nodejs版本18以上，如果nodejs版本跟不上，可以引入vite4.0+，
>
> ```typescript
> npm i vite@4
> ```

我们可以在自己的类型声明文件中，使用三斜线指令，引入一下vite中的类型

```typescript
/// <reference types="vite/client" />

type A = CSSModuleClasses
type B = ImportMeta["env"]
```

其实，`reference types` 也是有索引规则的，首先会在`node_modules`的`@types`下查找，没有的话，然后才到同名项目下查找，和nodejs的模块查找规则很类型，具体关于模块查找解析的内容这里就不展开了
