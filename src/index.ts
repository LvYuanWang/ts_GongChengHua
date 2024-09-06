// ESModule 的模块化
import { show } from "./myModule";
import { moduleMethod } from "./Module";
import { fn } from "a";
show();
moduleMethod();
fn();

// .mjs --> es6 module
// .cjs  .js  --> commonjs module

import axios from "axios";