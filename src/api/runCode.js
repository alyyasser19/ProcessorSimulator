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


    let inst1 = "L.D R3 20";
    addLatencies(3, 2, 2, 2, 2, 2);
    addInstructions(inst1);
runCycle();
runCycle();
runCycle();

console.log(A1)
console.log(getReg("R3"))