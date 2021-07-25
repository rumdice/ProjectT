import express from "express";

const app = express();

let aalist = [];
aalist.push(1);
aalist.push(2);
aalist.push(3);
aalist.push(4);
aalist.push(5);
aalist.shift();
console.log(aalist);

aalist.pop();