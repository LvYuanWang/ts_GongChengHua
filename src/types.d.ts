/// <reference path="../lib/index.d.ts" />

interface User {
  id: number;
  name: string;
  lever: Level;
}

type showStudent = (stu: Student) => void;