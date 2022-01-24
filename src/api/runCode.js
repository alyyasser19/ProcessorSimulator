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
} from "./mainComponent.js"


let inst1 = "ADD.D R3 R3 R2";
let inst2 = "ADD.D R4 R3 R6";
    let inst3 = "SUB.D R10 R4 R9";
    addLatencies(3, 2, 2, 2, 2, 2);
addInstructions(inst1);
addInstructions(inst2);
addInstructions(inst3);
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
console.log(getReg("R3"))
 console.log(A1)
console.log(getReg("R4"))
  console.log(getReg("R10"));