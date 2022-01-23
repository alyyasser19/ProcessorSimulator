
 //init 
 //inst queue 
 let instQueue = {instruction: [], issue: [], execute: [], writeResult: []}

 //clock
 let clock = 0;

 //latencies 
 let addLatency;
 let multLatency;
 let loadLatency;
 let storeLatency;

 //add buffers
 let A1 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: 0}
 let A2 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: 0}
 let A3 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: 0}

 //Multiply buffers
 let M1 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: 0}
 let M2 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: 0}

 //Load Buffer 
 let L1 = {busy:false, address:"", cycle: 0}
 let L2 = {busy:false, address:"", cycle: 0}

 //store buffer 
 let S1 = {busy:false, V: "", Q: "", address:"", cycle: 0}
 let S2 = {busy:false, V: "", Q: "", address:"", cycle: 0}

 let memory =  []
 
 //reg file 
 let regFile = [];
 for(let i =0; i< 32; i++){
    regFile.push({name: `R${i}`, Qi:0, used: false})
 }

 //push mem with random values 
 for(let i =0; i< 100; i++){
//let user load his own values 
    regFile.push(i)
 }
 



function addLatencies(add, mult, load, store){

    addLatency = add;
    multLatency = mult;
    loadLatency = load;
    storeLatency = store;

}

function addInstructions(inst){
    instQueue.instruction.push(inst);
}


function getRegNumber(regName, src){
    let regNum = parseInt(regName.substring(1, src.length-1))
    return regFile[regNum];
}

function checkStations(regName){
 
}

function issueInst(){
    let dest;
    let src1;
    let src2;
    let address;

    let currInst =  instQueue.instruction.pop();

    //split my current instruction
    let instSplit =  currInst.split(",");

    //Check the operation
    let currOp = instSplit[0];

    if(currOp === "ADD.D" || currOp === "SUB.D" ){
        dest = instSplit[1];
        src1 = instSplit[2];
        src2 = instSplit[3];

        //get the reg number to search in reg file
        let reg1 = getRegNumber(src1)
        let reg2 = getRegNumber(src1)

        if(!(A1.busy)){
            A1.op = currOp
          //Check if it exists in regFile
            if (reg1.used) { 
             checkStations(reg1)
           }else{
             A1.Vj = reg1.Qi; //Assign the value I found 
           }

           if (reg2.used) {
            checkStations(reg2)
       } else{
            A1.Vk= reg2.Qi; //Assign the value I found  
       }

        }else if(!(A2.busy)){
            A2.op = currOp

            //Check if it exists in regFile
            if (reg1.used) {
            checkStations(reg1)  
           } else{
            A2.Vj = reg1.Qi; 
           }

           if (reg2.used) {
           checkStations(reg2)
       }else{
            A2.Vk =reg2.Qi; 
       }

        } else if(!(A3.busy)){
            A3.op = currOp

            //Check if it exists in regFile
            if (reg1.used) {
              checkStations(reg1) 
           }else{
            A3.Vj = reg1.Qi; 
           }

           if (reg2.used) {
           checkStations(reg2) 
         } else{
             A3.Vk =reg2.Qi; 
       }
        } else {
            console.log("All are busy")
        }
    }

    if(currOp === "MUL.D" || currOp === "DIV.D" ){
        dest = instSplit[1];
        src1 = instSplit[2];
        src2 = instSplit[3];
                //get the reg number to search in reg file
                let reg1 = getRegNumber(src1)
                let reg2 = getRegNumber(src2)
        
                if(!(M1.busy)){
                    M1.op = currOp
                    //Check if it exists in regFile
                    if (reg1.used) { 
                       checkStations(reg1)
                   }else{
                    M1.Vj = reg1.Qi; //Assign the value I found 
                   }
        
                   if (reg2.used) {
                    checkStations(reg2)
               }else{
                M1.Vk= reg2.Qi; //Assign the value I found 
               }
        
                }else if(!(M2.busy)){
                    M2.op = currOp
        
                    //Check if it exists in regFile
                    if (reg1.used) {
                     checkStations(reg1)
                   }else{
                    M2.Vj = reg1.Qi; 
                   }
        
                   if (reg2.used) {
                     checkStations(reg2)
               }else{
                M2.Vk =reg2.Qi; 
               }

                } else{
                    console.log("All are busy so we stall")
                    clock ++;
                }
    }

    if(currOp === "L.D"){
        dest = instSplit[1];
        address = instSplit[2];

    }

    if(currOp === "S.D"){
        src1 = instSplit[1];
        address = instSplit[2];

        let reg1 = getRegNumber(src1)

        if(!(S1.busy)){
            S1.address = address;
            S1.op = currOp
             //Check if it exists in regFile
            if (reg1.used) { 
            checkStations(reg1)
           } else{
            S1.V = reg1.Qi; //Assign the value I found 
           }

        }else if(!(S2.busy)){
            S2.address = address;
            S2.op = currOp
            //Check if it exists in regFile
            if (reg1.used) {
            checkStations(reg1)
           }else{
            S2.V = reg1.Qi; 
           }

        } else{
            console.log("All are busy")
        }
        
    }


}

function executeInst(){


if(A1.busy){
    if(A1.cycle ){}
}


}


