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

let inst0 = "L.D R10 0";
let inst1 = "MUL.D R10 R10 R0";
let inst2 = "ADD.D R10 R11 R12";
let inst3 = "SUB.D R10 R10 R9";
addLatencies(3, 2, 2, 2, 2, 2);
addInstructions(inst0);
addInstructions(inst1);
// addInstructions(inst2);
// addInstructions(inst3);
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
