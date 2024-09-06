require("./a");
require("./b");
const fs = require("fs");
fs.readFile("tsconfig.json", "utf-8", (err, data) => {
  if (err) {
    console.log("文件读取失败");
  } else {
    console.log("文件读取成功");
  }
})
require("n");