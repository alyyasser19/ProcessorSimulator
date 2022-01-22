
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
 let A1 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: ""}
 let A2 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: ""}
 let A3 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: ""}

 //Multiply buffers
 let M1 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: ""}
 let M2 = {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: false, cycle: ""}

 //Load Buffer 
 let L1 = {busy:false, address:"", cycle: ""}
 let L2 = {busy:false, address:"", cycle: ""}

 //store buffer 
 let S1 = {busy:false, V = "", Q= "", address:"", cycle: ""}
 let S2 = {busy:false, address:"", cycle: ""}

 let memory =  {data: []} 
 
 //reg file 
 let regFile = [];
 for(let i =0; i< 32; i++){
    regFile.push({name: `R${i}`, Qi:""})
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


function parseInst(){
    let dest;
    let src1;
    let src2;
    let address;

    let currInst =  instQueue.instruction.pop();

    //split my current instruction
    let instSplit =  currInst.split(",");

    //Check the operation
    let currOp = instSplit[0];

    if(op === "ADD.D" || op === "SUB.D" ){
        dest = instSplit[1];
        src1 = instSplit[2];
        src2 = instSplit[3];

        //get the reg number to search in reg file
        let regNum = src1.substring(1, src1.length-1); 
        let regNum2 = src2.substring(1, src1.length-1); 

        if(!(A1.busy)){
            A1.op = currOp

            //Check if it exists in regFile
            if (!(regFile[regNum].Qi === undefined) && !(regFile[regNum].Qi === null)) { 
                A1.Vj = regFile[regNum].Qi; //Assign the value I found 
           }

           if (!(regFile[regNum2].Qi === undefined) && !(regFile[regNum2].Qi === null)) {
            A1.Vk= regFile[regNum2].Qi; //Assign the value I found 
       }

        }else if(!(A2.busy)){
            A2.op = currOp

            //Check if it exists in regFile
            if (!(regFile[regNum].Qi === undefined) && !(regFile[regNum].Qi === null)) {
                A2.Vj = regFile[regNum].Qi; 
           }

           if (!(src2 === undefined) && !(src2 === null)) {
            A2.Vk =regFile[regNum2].Qi; 
       }

        } else if(!(A3.busy)){
            A3.op = currOp

            //Check if it exists in regFile
            if (!(regFile[regNum].Qi === undefined) && !(regFile[regNum].Qi === null)) {
                A3.Vj = regFile[regNum].Qi; 
           }

           if (!(regFile[regNum2].Qi === undefined) && !(regFile[regNum2].Qi === null)) {
            A3.Vk =regFile[regNum2].Qi; 
       }
        } else {
            //check reservation stations and buffers
        }
    }

    if(op === "MUL.D" || op === "DIV.D" ){
        dest = instSplit[1];
        src1 = instSplit[2];
        src2 = instSplit[3];
                //get the reg number to search in reg file
                let regNum = src1.substring(1, src1.length-1); 
                let regNum2 = src2.substring(1, src1.length-1); 
        
                if(!(M1.busy)){
                    M1.op = currOp
                    //Check if it exists in regFile
                    if (!(regFile[regNum].Qi === undefined) && !(regFile[regNum].Qi === null)) { 
                        M1.Vj = regFile[regNum].Qi; //Assign the value I found 
                   }
        
                   if (!(regFile[regNum2].Qi === undefined) && !(regFile[regNum2].Qi === null)) {
                    M1.Vk= regFile[regNum2].Qi; //Assign the value I found 
               }
        
                }else if(!(M2.busy)){
                    M2.op = currOp
        
                    //Check if it exists in regFile
                    if (!(regFile[regNum].Qi === undefined) && !(regFile[regNum].Qi === null)) {
                        M2.Vj = regFile[regNum].Qi; 
                   }
        
                   if (!(src2 === undefined) && !(src2 === null)) {
                    M2.Vk =regFile[regNum2].Qi; 
               }

                } else{
                    //check reservation stations and buffers
                }
    }

    if(op === "L.D"){
        dest = instSplit[1];
        address = instSplit[2];

    }

    if(op === "S.D"){
        src1 = instSplit[1];
        address = instSplit[2];

        let regNum = src1.substring(1, src1.length-1); 

        if(!(S1.busy)){
            S1.address = address;
            S1.op = currOp
             //Check if it exists in regFile
            if (!(regFile[regNum].Qi === undefined) && !(regFile[regNum].Qi === null)) { 
                S1.V = regFile[regNum].Qi; //Assign the value I found 
           }

        }else if(!(S2.busy)){
            S2.address = address;
            S2.op = currOp
            //Check if it exists in regFile
            if (!(regFile[regNum].Qi === undefined) && !(regFile[regNum].Qi === null)) {
                S2.V = regFile[regNum].Qi; 
           }

        } else{
             //check reservation stations and buffers
        }

        

        
    }


}


