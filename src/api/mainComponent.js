
//init
//inst queue
let instQueue = { instruction: [], issue: [], execute: [], writeResult: [] };

//clock
let clock = 0;

//latencies
let addLatency;
let multLatency;
let loadLatency;
let storeLatency;
let subLatency;
let divLatency;

//add buffers
let A1 = {
  op: "",
  Vj: "",
  Vk: "",
  Qj: "",
  Qk: "",
  dest: "",
  busy: false,
  a: "",
  cycle: 0,
};
let A2 = {
  op: "",
  Vj: "",
  Vk: "",
  Qj: "",
  Qk: "",
  dest: "",
  busy: false,
  a: "",
  cycle: 0,
};
let A3 = {
  op: "",
  Vj: "",
  Vk: "",
  Qj: "",
  Qk: "",
  dest: "",
  busy: false,
  a: "",
  cycle: 0,
};

//Multiply buffers
let M1 = {
  op: "",
  Vj: "",
  Vk: "",
  Qj: "",
  Qk: "",
  dest: "",
  busy: false,
  a: "",
  cycle: 0,
};
let M2 = {
  op: "",
  Vj: "",
  Vk: "",
  Qj: "",
  Qk: "",
  dest: "",
  busy: false,
  a: "",
  cycle: 0,
};

//Load Buffer
let L1 = { busy: false, address: "", Q: "", V: "", a: "", cycle: 0 };
let L2 = { busy: false, address: "", Q: "", V: "", a: "", cycle: 0 };

//store buffer
let S1 = { busy: false, V: "", Q: "", address: "", a: "", cycle: 0 };
let S2 = { busy: false, V: "", Q: "", address: "", a: "", cycle: 0 };

let memory = [];

//reg file
let regFile = [];
for (let i = 0; i < 32; i++) {
  regFile.push({ name: `R${i}`, Qi: 0, value: 1, used: false });
}

//push mem with random values
for (let i = 0; i < 100; i++) {
  //let user load his own values
  memory.push(i);
}

function addLatencies(add, mult, load, store, div, sub) {
  addLatency = add;
  subLatency = sub;
  multLatency = mult;
  divLatency = div;
  loadLatency = load;
  storeLatency = store;
}

function addInstructions(inst) {
  instQueue.instruction.push(inst);
}

export function getReg(regName) {
  let regNum = parseInt(regName.substring(1, regName.length));
  return regFile[regNum];
}

function issueInst() {
    console.log("inside issue");
  let currInst = instQueue.instruction.pop();
  instQueue.issue.push(currInst);
}

function readOp(i) {
      console.log("inside readOp");
      console.log("value of i: ", i);
  let dest;
  let src1;
  let src2;
  let address;
  let currInst = instQueue.issue[i];
  //split my current instruction
  let instSplit = currInst.split(" ");
  console.log("split inst: ", instSplit);

  //Check the operation
  let currOp = instSplit[0];

  if (currOp === "ADD.D" || currOp === "SUB.D") {
    dest = instSplit[1];
    src1 = instSplit[2];
    src2 = instSplit[3];

    //get the reg number to search in reg file
    let reg1 = getReg(src1);
    let reg2 = getReg(src2);

    let message = "";

    if (!A1.busy) {
      A1.op = currOp;
      A1.dest = dest;
      getReg(dest).used = true;
      getReg(dest).Qi = "A1";
      A1.busy = true;

      if (reg1.used) {
        A1.Qj = reg1.Qi;
        message += `A1.Qj = ${reg1.Qi} `;
      } else if (!reg1.used) {
        A1.Vj = reg1.value; //Assign the value I found
        message += `A1.Vj = ${reg1.value} `;
      }

      if (reg2.used) {
        A1.Qk = reg2.Qi;
        message += `A1.Qk = ${reg2.Qi} `;
      } else if (!reg2.used) {
        A1.Vk = reg2.value; //Assign the value I found
        message += `A1.Vk = ${reg2.value} `;
      }
      return message;
    } else if (!A2.busy) {
      A2.op = currOp;
      A2.dest = dest;
      getReg(dest).used = true;
      getReg(dest).Qi = "A2";
      A2.busy = true;

      //Check if it exists in regFile
      if (reg1.used) {
        A2.Qj = reg1.Qi;
        message += `A2.Qj = ${reg1.Qi} `;
      } else if (!reg1.used) {
        A2.Vj = reg1.value; //Assign the value I found
        message += `A2.Vj = ${reg1.value} `;
      }

      if (reg2.used) {
        A2.Qk = reg2.Qi;
        message += `A2.Qk = ${reg2.Qi} `;
      } else if (!reg2.used) {
        A2.Vk = reg2.value; //Assign the value I found
        message += `A2.Vk = ${reg2.value} `;
      }
      return message;
    } else if (!A3.busy) {
      A3.op = currOp;
      A3.dest = dest;
      getReg(dest).used = true;
      getReg(dest).Qi = "A3";
      A3.busy = true;

      //Check if it exists in regFile
      if (reg1.used) {
        A3.Qj = reg1.Qi;
        message += `A3.Qj = ${reg1.Qi} `;
      } else if (!reg1.used) {
        A3.Vj = reg1.value; //Assign the value I found
        message += `A3.Vj = ${reg1.value} `;
      }

      if (reg2.used) {
        A3.Qk = reg2.Qi;
        message += `A3.Qk = ${reg2.Qi} `;
      } else if (!reg2.used) {
        A3.Vk = reg2.value; //Assign the value I found
        message += `A3.Vk = ${reg2.value} `;
      }
      return message;
    } else {
      return "No free stations";
    }
  }

  if (currOp === "MUL.D" || currOp === "DIV.D") {
    dest = instSplit[1];
    src1 = instSplit[2];
    src2 = instSplit[3];
    //get the reg number to search in reg file
    let reg1 = getReg(src1);
    let reg2 = getReg(src2);

    let message = "";

    if (!M1.busy) {
      M1.op = currOp;
      M1.dest = dest;
      getReg(dest).used = true;
      getReg(dest).Qi = "M1";
      M1.busy = true;
      //Check if it exists in regFile
      if (reg1.used) {
        M1.Qj = reg1.Qi;
        message += `M1.Qj = ${reg1.Qi} `;
      } else if (!reg1.used) {
        M1.Vj = reg1.value; //Assign the value I found
        message += `M1.Vj = ${reg1.value} `;
      }

      if (reg2.used) {
        M1.Qk = reg2.Qi;
        message += `M1.Qk = ${reg2.Qi} `;
      } else if (!reg2.used) {
        M1.Vk = reg2.value; //Assign the value I found
        message += `M1.Vk = ${reg2.value} `;
      }
      return message;
    } else if (!M2.busy) {
      M2.op = currOp;
      M2.dest = dest;
      getReg(dest).used = true;
      getReg(dest).Qi = "M2";
      M2.busy = true;

      //Check if it exists in regFile
      if (reg1.used) {
        M2.Qj = reg1.Qi;
        message += `M2.Qj = ${reg1.Qi} `;
      } else if (!reg1.used) {
        M2.Vj = reg1.value; //Assign the value I found
        message += `M2.Vj = ${reg1.value} `;
      }

      if (reg2.used) {
        M2.Qk = reg2.Qi;
        message += `M2.Qk = ${reg2.Qi} `;
      } else if (!reg2.used) {
        M2.Vk = reg2.value; //Assign the value I found
        message += `M2.Vk = ${reg2.value} `;
      }
      return message;
    } else {
      return "No free stations";
    }
  }

  if (currOp === "L.D") {
    dest = instSplit[1];
    address = instSplit[2];

    //get the reg number to search in reg file
      let reg = getReg(dest);
      
    let message = "";

    if (!L1.busy) {
        L1.address = address;
        L1.dest = dest;
      L1.busy = true;

      if (reg.used) {
        L1.Q = reg.Qi;
        message += `L1.Qj = ${reg.Qi} `;
      } else if (!reg.used) {
        L1.V = reg.name; //Assign the value I found
        message += `L1.Vj = ${reg.name} `;
      }
      return message;
    } else if (!L2.busy) {
        L2.address = address;
        L2.dest = dest;
      L2.busy = true;

      if (reg.used) {
        L2.Q = reg.Qi;
        message += `L2.Qj = ${reg.Qi} `;
      } else if (!reg.used) {
        L2.V = reg.name; //Assign the value I found
        message += `L2.Vj = ${reg.name} `;
      }
      return message;
    }
  } else {
    return "No free stations";
  }

  if (currOp === "S.D") {
    let src = instSplit[1];
    address = instSplit[2];

    let reg1 = getReg(src);
    let message = "";

    if (!S1.busy) {
      S1.address = address;
      S1.busy = true;
      //Check if it exists in regFile
      if (reg1.used) {
        S1.Q = reg1.Qi;
        message += `S1.Q = ${reg1.Qi} `;
      } else if (!reg1.used) {
        S1.V = reg1.value; //Assign the value I found
        message += `S1.V = ${reg1.Value} `;
      }
      return message;
    } else if (!S2.busy) {
      S2.address = address;
      S2.busy = true;

      //Check if it exists in regFile
      if (reg1.used) {
        S2.Q = reg1.Qi;
        message += `S2.Q = ${reg1.Qi} `;
      } else if (!reg1.used) {
        S2.V = reg1.value; //Assign the value I found
        message += `S2.V = ${reg1.Value} `;
      }
      return message;
    } else {
      return "No free stations";
    }
  }
}

function forward(station) {

    if (station === "A1") {
        if(A2.Qj === "A1") {
            A2.Qj = "";
            A2.Vj = A1.a;
        }
        if (A2.Qk === "A1") {
            A2.Qk = "";
            A2.Vk = A1.a;
        }
        if (A3.Qj === "A1") {
            A3.Qj = "";
            A3.Vj = A1.a;
        }
        if (A3.Qk === "A1") {
            A3.Qk = "";
            A3.Vk = A1.a;
        }
        if (M1.Qj === "A1") {
            M1.Qj = "";
            M1.Vj = A1.a;
        }
        if (M1.Qk === "A1") {
            M1.Qk = "";
            M1.Vk = A1.a;
        }
        if (M2.Qj === "A1") {
            M2.Qj = "";
            M2.Vj = A1.a;
        }
        if (M2.Qk === "A1") {
            M2.Qk = "";
            M2.Vk = A1.a;
        }
        if (L1.Q === "A1") {
            L1.Q = "";
            L1.V = A1.a;
        }
        if (L2.Q === "A1") {
            L2.Q = "";
            L2.V = A1.a;
        }
        if (S1.Q === "A1") {
            S1.Q = "";
            S1.V = A1.a;
        }
        if (S2.Q === "A1") {
            S2.Q = "";
            S2.V = A1.a;
        }
    } else if (station === "A2") {
        if(A1.Qj === "A2") {
            A1.Qj = "";
            A1.Vj = A2.a;
        }
        if (A1.Qk === "A2") {
            A1.Qk = "";
            A1.Vk = A2.a;
        }
        if (A3.Qj === "A2") {
            A3.Qj = "";
            A3.Vj = A2.a;
        }
        if (A3.Qk === "A2") {
            A3.Qk = "";
            A3.Vk = A2.a;
        }
        if (M1.Qj === "A2") {
            M1.Qj = "";
            M1.Vj = A2.a;
        }
        if (M1.Qk === "A2") {
            M1.Qk = "";
            M1.Vk = A2.a;
        }
        if (M2.Qj === "A2") {
            M2.Qj = "";
            M2.Vj = A2.a;
        }
        if (M2.Qk === "A2") {
            M2.Qk = "";
            M2.Vk = A2.a;
        }
        if (L1.Q === "A2") {
            L1.Q = "";
            L1.V = A2.a;
        }
        if (L2.Q === "A2") {
            L2.Q = "";
            L2.V = A2.a;
        }
        if (S1.Q === "A2") {
            S1.Q = "";
            S1.V = A2.a;
        }
        if (S2.Q === "A2") {
            S2.Q = "";
            S2.V = A2.a;
        }
    } else if (station === "A3") {
        if(A1.Qj === "A3") {
            A1.Qj = "";
            A1.Vj = A3.a;
        }
        if (A1.Qk === "A3") {
            A1.Qk = "";
            A1.Vk = A3.a;
        }
        if (A2.Qj === "A3") {
            A2.Qj = "";
            A2.Vj = A3.a;
        }
        if (A2.Qk === "A3") {
            A2.Qk = "";
            A2.Vk = A3.a;
        }
        if (M1.Qj === "A3") {
            M1.Qj = "";
            M1.Vj = A3.a;
        }
        if (M1.Qk === "A3") {
            M1.Qk = "";
            M1.Vk = A3.a;
        }
        if (M2.Qj === "A3") {
            M2.Qj = "";
            M2.Vj = A3.a;
        }
        if (M2.Qk === "A3") {
            M2.Qk = "";
            M2.Vk = A3.a;
        }
        if (L1.Q === "A3") {
            L1.Q = "";
            L1.V = A3.a;
        }
        if (L2.Q === "A3") {
            L2.Q = "";
            L2.V = A3.a;
        }
        if (S1.Q === "A3") {
            S1.Q = "";
            S1.V = A3.a;
        }
        if (S2.Q === "A3") {
            S2.Q = "";
            S2.V = A3.a;
        }
    } else if (station === "M1") {
        if(A1.Qj === "M1") {
            A1.Qj = "";
            A1.Vj = M1.a;
        }
        if (A1.Qk === "M1") {
            A1.Qk = "";
            A1.Vk = M1.a;
        }
        if (A2.Qj === "M1") {
            A2.Qj = "";
            A2.Vj = M1.a;
        }
        if (A2.Qk === "M1") {
            A2.Qk = "";
            A2.Vk = M1.a;
        }
        if (A3.Qj === "M1") {
            A3.Qj = "";
            A3.Vj = M1.a;
        }
        if (A3.Qk === "M1") {
            A3.Qk = "";
            A3.Vk = M1.a;
        }
        if (M2.Qj === "M1") {
            M2.Qj = "";
            M2.Vj = M1.a;
        }
        if (M2.Qk === "M1") {
            M2.Qk = "";
            M2.Vk = M1.a;
        }
        if (L1.Q === "M1") {
            L1.Q = "";
            L1.V = M1.a;
        }
        if (L2.Q === "M1") {
            L2.Q = "";
            L2.V = M1.a;
        }
        if (S1.Q === "M1") {
            S1.Q = "";
            S1.V = M1.a;
        }
        if (S2.Q === "M1") {
            S2.Q = "";
            S2.V = M1.a;
        }
    } else if (station === "M2") {
        if(A1.Qj === "M2") {
            A1.Qj = "";
            A1.Vj = M2.a;
        }
        if (A1.Qk === "M2") {
            A1.Qk = "";
            A1.Vk = M2.a;
        }
        if (A2.Qj === "M2") {
            A2.Qj = "";
            A2.Vj = M2.a;
        }
        if (A2.Qk === "M2") {
            A2.Qk = "";
            A2.Vk = M2.a;
        }
        if (A3.Qj === "M2") {
            A3.Qj = "";
            A3.Vj = M2.a;
        }
        if (A3.Qk === "M2") {
            A3.Qk = "";
            A3.Vk = M2.a;
        }
        if (M1.Qj === "M2") {
            M1.Qj = "";
            M1.Vj = M2.a;
        }
        if (M1.Qk === "M2") {
            M1.Qk = "";
            M1.Vk = M2.a;
        }
        if (L1.Q === "M2") {
            L1.Q = "";
            L1.V = M2.a;
        }
        if (L2.Q === "M2") {
            L2.Q = "";
            L2.V = M2.a;
        }
        if (S1.Q === "M2") {
            S1.Q = "";
            S1.V = M2.a;
        }
        if (S2.Q === "M2") {
            S2.Q = "";
            S2.V = M2.a;
        }
    } else if (station === "L1") {
        if(A1.Qj === "L1") {
            A1.Qj = "";
            A1.Vj = L1.a;
        }
        if (A1.Qk === "L1") {
            A1.Qk = "";
            A1.Vk = L1.a;
        }
        if (A2.Qj === "L1") {
            A2.Qj = "";
            A2.Vj = L1.a;
        }
        if (A2.Qk === "L1") {
            A2.Qk = "";
            A2.Vk = L1.a;
        }
        if (A3.Qj === "L1") {
            A3.Qj = "";
            A3.Vj = L1.a;
        }
        if (A3.Qk === "L1") {
            A3.Qk = "";
            A3.Vk = L1.a;
        }
        if (M1.Qj === "L1") {
            M1.Qj = "";
            M1.Vj = L1.a;
        }
        if (M1.Qk === "L1") {
            M1.Qk = "";
            M1.Vk = L1.a;
        }
        if (M2.Qj === "L1") {
            M2.Qj = "";
            M2.Vj = L1.a;
        }
        if (M2.Qk === "L1") {
            M2.Qk = "";
            M2.Vk = L1.a;
        }
        if (L2.Q === "L1") {
            L2.Q = "";
            L2.V = L1.a;
        }
        if (S1.Q === "L1") {
            S1.Q = "";
            S1.V = L1.a;
        }
        if (S2.Q === "L1") {
            S2.Q = "";
            S2.V = L1.a;
        }
    } else if (station === "L2") {
        if(A1.Qj === "L2") {
            A1.Qj = "";
            A1.Vj = L2.a;
        }
        if (A1.Qk === "L2") {
            A1.Qk = "";
            A1.Vk = L2.a;
        }
        if (A2.Qj === "L2") {
            A2.Qj = "";
            A2.Vj = L2.a;
        }
        if (A2.Qk === "L2") {
            A2.Qk = "";
            A2.Vk = L2.a;
        }
        if (A3.Qj === "L2") {
            A3.Qj = "";
            A3.Vj = L2.a;
        }
        if (A3.Qk === "L2") {
            A3.Qk = "";
            A3.Vk = L2.a;
        }
        if (M1.Qj === "L2") {
            M1.Qj = "";
            M1.Vj = L2.a;
        }
        if (M1.Qk === "L2") {
            M1.Qk = "";
            M1.Vk = L2.a;
        }
        if (M2.Qj === "L2") {
            M2.Qj = "";
            M2.Vj = L2.a;
        }
        if (M2.Qk === "L2") {
            M2.Qk = "";
            M2.Vk = L2.a;
        }
        if (L1.Q === "L2") {
            L1.Q = "";
            L1.V = L2.a;
        }
        if (S1.Q === "L2") {
            S1.Q = "";
            S1.V = L2.a;
        }
        if (S2.Q === "L2") {
            S2.Q = "";
            S2.V = L2.a;
        }
    } else if (station === "S1") {
        if(A1.Qj === "S1") {
            A1.Qj = "";
            A1.Vj = S1.a;
        }
        if (A1.Qk === "S1") {
            A1.Qk = "";
            A1.Vk = S1.a;
        }
        if (A2.Qj === "S1") {
            A2.Qj = "";
            A2.Vj = S1.a;
        }
        if (A2.Qk === "S1") {
            A2.Qk = "";
            A2.Vk = S1.a;
        }
        if (A3.Qj === "S1") {
            A3.Qj = "";
            A3.Vj = S1.a;
        }
        if (A3.Qk === "S1") {
            A3.Qk = "";
            A3.Vk = S1.a;
        }
        if (M1.Qj === "S1") {
            M1.Qj = "";
            M1.Vj = S1.a;
        }
        if (M1.Qk === "S1") {
            M1.Qk = "";
            M1.Vk = S1.a;
        }
        if (M2.Qj === "S1") {
            M2.Qj = "";
            M2.Vj = S1.a;
        }
        if (M2.Qk === "S1") {
            M2.Qk = "";
            M2.Vk = S1.a;
        }
        if (L1.Q === "S1") {
            L1.Q = "";
            L1.V = S1.a;
        }
        if (L2.Q === "S1") {
            L2.Q = "";
            L2.V = S1.a;
        }
        if (S2.Q === "S1") {
            S2.Q = "";
            S2.V = S1.a;
        }
    } else if (station === "S2") {
        if(A1.Qj === "S2") {
            A1.Qj = "";
            A1.Vj = S2.a;
        }
        if (A1.Qk === "S2") {
            A1.Qk = "";
            A1.Vk = S2.a;
        }
        if (A2.Qj === "S2") {
            A2.Qj = "";
            A2.Vj = S2.a;
        }
        if (A2.Qk === "S2") {
            A2.Qk = "";
            A2.Vk = S2.a;
        }
        if (A3.Qj === "S2") {
            A3.Qj = "";
            A3.Vj = S2.a;
        }
        if (A3.Qk === "S2") {
            A3.Qk = "";
            A3.Vk = S2.a;
        }
        if (M1.Qj === "S2") {
            M1.Qj = "";
            M1.Vj = S2.a;
        }
        if (M1.Qk === "S2") {
            M1.Qk = "";
            M1.Vk = S2.a;
        }
        if (M2.Qj === "S2") {
            M2.Qj = "";
            M2.Vj = S2.a;
        }
        if (M2.Qk === "S2") {
            M2.Qk = "";
            M2.Vk = S2.a;
        }
        if (L1.Q === "S2") {
            L1.Q = "";
            L1.V = S2.a;
        }
        if (L2.Q === "S2") {
            L2.Q = "";
            L2.V = S2.a;
        }
        if (S1.Q === "S2") {
            S1.Q = "";
            S1.V = S2.a;
        }
    }
}

function executeInst() {
    console.log("inside execute")
  //check if there are instructions to execute
  if (instQueue.execute.length > 0) {
    if (A1.busy && A1.Qi === "" && A1.Qj === "") {
      A1.cycle++;
    }
    if (A2.busy && A2.Qi === "" && A2.Qj === "") {
      A2.cycle++;
    }
    if (A3.busy && A3.Qi === "" && A3.Qj === "") {
      A3.cycle++;
    }
    if (M1.busy && M1.Qi === "" && M1.Qj === "" && M1.Qk === "") {
      M1.cycle++;
    }
    if (M2.busy && M2.Qi === "" && M2.Qj === "" && M2.Qk === "") {
      M2.cycle++;
    }
    if (L1.busy) {
      L1.cycle++;
    }
    if (L2.busy) {
      L2.cycle++;
    }
    if (S1.busy && S1.Q === "") {
      S1.cycle++;
    }
    if (S2.busy && S2.Q === "") {
      S2.cycle++;
    }

    // execute instructions
    if (A1.busy && A1.op === "ADD.D" && A1.cycle === addLatency) {
      let reg1 = getReg(A1.dest);
      reg1.value = A1.Vj + A1.Vk;
      reg1.used = false;
        A1.busy = false;
        A1.a = reg1.value;
        forward("A1")
      A1.Qi = "";
      A1.Qj = "";
      A1.Qk = "";
      A1.Vj = "";
      A1.Vk = "";
      A1.op = "";
      A1.dest = "";
      A1.cycle = 0;
    }
    if (A2.busy && A2.op === "ADD.D" && A2.cycle === addLatency) {
      let reg1 = getReg(A2.dest);
      reg1.value = A2.Vj + A2.Vk;
      reg1.used = false;
        A2.busy = false;
        A2.a = reg1.value;
        forward("A2")
      A2.Qi = "";
      A2.Qj = "";
      A2.Qk = "";
      A2.Vj = "";
      A2.Vk = "";
      A2.op = "";
      A2.dest = "";
      A2.cycle = 0;
    }
    if (A3.busy && A3.op === "ADD.D" && A3.cycle === addLatency) {
      let reg1 = getReg(A3.dest);
      reg1.value = A3.Vj + A3.Vk;
      reg1.used = false;
        A3.busy = false;
        A3.a = reg1.value;
        forward("A3")
      A3.Qi = "";
      A3.Qj = "";
      A3.Qk = "";
      A3.Vj = "";
      A3.Vk = "";
      A3.op = "";
      A3.dest = "";
      A3.cycle = 0;
      }
      if (M1.busy && M1.op === "MUL.D" && M1.cycle === multLatency) {
        let reg1 = getReg(M1.dest);
        reg1.value = M1.Vj * M1.Vk;
        reg1.used = false;
          M1.busy = false;
          M1.a = reg1.value;
          forward("M1")
        M1.Qi = "";
        M1.Qj = "";
        M1.Qk = "";
        M1.Vj = "";
        M1.Vk = "";
        M1.op = "";
        M1.dest = "";
        M1.cycle = 0;
      }
      if (M2.busy && M2.op === "MUL.D" && M2.cycle === multLatency) {
        let reg1 = getReg(M2.dest);
        reg1.value = M2.Vj * M2.Vk;
        reg1.used = false;
          M2.busy = false;
          M2.a = reg1.value;
          forward("M2")
        M2.Qi = "";
        M2.Qj = "";
        M2.Qk = "";
        M2.Vj = "";
        M2.Vk = "";
        M2.op = "";
        M2.dest = "";
        M2.cycle = 0;
      }
      if (L1.busy && L1.op === "L.D" && L1.cycle === loadLatency) {
          let reg1 = getReg(L1.dest);
        reg1.value = memory[L1.address]
        reg1.used = false;
          L1.busy = false;
          L1.a = reg1.value;
          forward("L1")
        L1.Q = "";
        L1.V = "";
        L1.op = "";
        L1.dest = "";
        L1.cycle = 0;
      }
      if (L2.busy && L2.op === "L.D" && L2.cycle === loadLatency) {
        let reg1 = getReg(L2.dest);
          reg1.value = memory[L2.address]
        reg1.used = false;
          L2.busy = false;
          L2.a = reg1.value;
          forward("L2")
        L2.Q = "";
        L2.V = "";
        L2.op = "";
        L2.dest = "";
        L2.cycle = 0;
      }
      if (S1.busy && S1.op === "S.D" && S1.cycle === storeLatency) {
          let reg1 = getReg(S1.dest);
        memory[S1.address] = reg1.value;
        reg1.used = false;
          S1.busy = false;
          S1.a = reg1.value;
          forward("S1")
        S1.Q = "";
        S1.V = "";
        S1.op = "";
        S1.dest = "";
        S1.cycle = 0;
      }
      if (S2.busy && S2.op === "S.D" && S2.cycle === storeLatency) {
          let reg1 = getReg(S2.dest);
        memory[S2.address] = reg1.value;
        reg1.used = false;
          S2.busy = false;
          S2.a = reg1.value;
          forward("S2")
        S2.Q = "";
        S2.V = "";
        S2.op = "";
        S2.dest = "";
        S2.cycle = 0;
      }
      if (A1.busy && A1.op === "SUB.D" && A1.cycle === subLatency) {
        let reg1 = getReg(A1.dest);
        reg1.value = A1.Vj - A1.Vk;
        reg1.used = false;
          A1.busy = false;
          A1.a = reg1.value;
          forward("A1")
        A1.Qi = "";
        A1.Qj = "";
        A1.Qk = "";
        A1.Vj = "";
        A1.Vk = "";
        A1.op = "";
        A1.dest = "";
        A1.cycle = 0;
      }
      if (A2.busy && A2.op === "SUB.D" && A2.cycle === subLatency) {
        let reg1 = getReg(A2.dest);
        reg1.value = A2.Vj - A2.Vk;
        reg1.used = false;
          A2.busy = false;
          A2.a = reg1.value;
          forward("A2")
        A2.Qi = "";
        A2.Qj = "";
        A2.Qk = "";
        A2.Vj = "";
        A2.Vk = "";
        A2.op = "";
        A2.dest = "";
        A2.cycle = 0;
      }
      if (A3.busy && A3.op === "SUB.D" && A3.cycle === subLatency) {
        let reg1 = getReg(A3.dest);
        reg1.value = A3.Vj - A3.Vk;
        reg1.used = false;
          A3.busy = false;
          A3.a = reg1.value;
          forward("A3")
        A3.Qi = "";
        A3.Qj = "";
        A3.Qk = "";
        A3.Vj = "";
        A3.Vk = "";
        A3.op = "";
        A3.dest = "";
        A3.cycle = 0;
      }
      if (M1.busy && M1.op === "DIV.D" && M1.cycle === divLatency) {
        let reg1 = getReg(M1.dest);
        reg1.value = M1.Vj / M1.Vk;
        reg1.used = false;
          M1.busy = false;
          M1.a = reg1.value;
          forward("M1")
        M1.Qi = "";
        M1.Qj = "";
        M1.Qk = "";
        M1.Vj = "";
        M1.Vk = "";
        M1.op = "";
        M1.dest = "";
        M1.cycle = 0;
      }
      if (M2.busy && M2.op === "DIV.D" && M2.cycle === divLatency) {
        let reg1 = getReg(M2.dest);
        reg1.value = M2.Vj / M2.Vk;
        reg1.used = false;
          M2.busy = false;
          M2.a = reg1.value;
          forward("M2")
        M2.Qi = "";
        M2.Qj = "";
        M2.Qk = "";
        M2.Vj = "";
        M2.Vk = "";
        M2.op = "";
        M2.dest = "";
        M2.cycle = 0;
      }
  }
}
 function runCycle() {
     console.log("inside runCycle")
    issueInst();
    for (let i=0; i < instQueue.issue.length - 1; i++){
        let cur = readOp(i);
        if (cur === "No free stations")
            continue;
        else {
            console.log(cur);
            break;
        }
        }
    executeInst();
    clock++;
}
export{clock, A1,A2,A3, M1, M2, L1, L2, S1, S2, memory,regFile, addLatencies, addInstructions,runCycle}