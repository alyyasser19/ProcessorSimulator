import React from "react";
import { Grid, Typography } from "@mui/material";
import {clock, A1,A2,A3, M1, M2, L1, L2, S1, S2, memory,regFile, addLatencies, addInstructions,runCycle} from "./api/mainComponent";
function Home() {
    let inst1 = "ADD.D R3 R1 R2"
    addLatencies(2,2,2,2,2,2)
    addInstructions(inst1)
     runCycle();
    runCycle();
    runCycle();
    runCycle();
    console.log(regFile)

    return (
        <Grid container direction="column">
<Typography variant= "h3">
    Tomasulo Simulator 
</Typography>
        </Grid>
    )
}

export default Home;