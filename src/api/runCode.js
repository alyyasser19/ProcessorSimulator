import {
  clock,
  A1,
  A2,
  A3,
  M1,
  M2,
  L1,
  L2,
  S1,
  S2,
  memory,
  regFile,
  addLatencies,
  addInstructions,
  runCycle,
  getReg,
} from "./mainComponent.js";



let inst1 = "L.D R10 2";
let inst2 = "DIV.D R10 R0 R10";
let inst3 = "S.D R10 0";
let inst4 = "SUB.D R5 R10 R10";
let inst5 = "S.D R10 10";
let inst6 = "S.D R10 2";
let inst7 = "DIV.D R10 R10 R10";
let inst8 = "S.D R10 0";
let inst9 = "SUB.D R5 R11 R10";
let inst10 = "L.D R5 10";

addLatencies(3, 2, 2, 2, 2, 2);

addInstructions(inst1);
addInstructions(inst2);
addInstructions(inst3);
addInstructions(inst4);
addInstructions(inst5);
addInstructions(inst6);
addInstructions(inst7);
addInstructions(inst8);
addInstructions(inst9);
addInstructions(inst10);

runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();
runCycle();


// console.log(A1)
// console.log(A2);

console.log(getReg("R10"));
console.log(getReg("R5"));
console.log("Mem of 0 is:", memory[0]);
console.log("Mem of 2 is:", memory[2]);
console.log("Mem of 10 is:", memory[10]);
