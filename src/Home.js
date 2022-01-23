import React from "react";
import { Grid, Typography } from "@mui/material";
import { getReg } from "./api/mainComponent";
function Home() {
    
    console.log(getReg("R0"));

    return (
        <Grid container direction="column">
<Typography variant= "h3">
    Tomasulo Simulator 
</Typography>
        </Grid>
    )
}

export default Home;