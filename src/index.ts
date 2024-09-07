// ESModule 的模块化
import { show } from "./myModule.js";
import { moduleMethod } from "./Module/type.js";
import { fn } from "a";
import pak from "../package.json" assert { type: "json" };  // assert { type: "json" } 用于告诉 esbuild 这是一个 json 文件，不要将其视为 js 文件
show();
moduleMethod();
fn();
console.log(pak)
// .mjs --> es6 module
// .cjs  .js  --> commonjs module

import axios from "axios";