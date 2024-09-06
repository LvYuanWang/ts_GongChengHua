// ESModule 的模块化
import { show } from "./myModule.js";
import "./a/index.js"
show();

// 只有在node环境下有效, 在浏览器下必须要是完整的路径 ./node_modules/n/index.js
import "n";
