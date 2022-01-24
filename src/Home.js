import React from "react";
import { Grid, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Autocomplete, Button, CircularProgress, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
  instQueue,
  runCycle,
} from "./api/mainComponent";

function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function Home() {
  //create a dropdown menu
  const options = ["ADD.D", "SUB.D", "MUL.D", "DIV.D", "L.D", "S.D"]
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  
  const [destination, setDestination] = React.useState("");
  const [source1, setSource1] = React.useState("");
  const [source2, setSource2] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [loading, setLoading] = React.useState(true);

  const [instructions, setInstructions] = React.useState([]);
  const [addLatency, setAddLatency] = React.useState("0");
  const [mulLatency, setMulLatency] = React.useState("0");
  const [loadLatency, setLoadLatency] = React.useState("0");
  const [storeLatency, setStoreLatency] = React.useState("0");
  const [divLatency, setDivLatency] = React.useState("0");
  const [subLatency, setSubLatency] = React.useState("0");
  const [issue, setIssue] = React.useState([]);
  const [memoryFile, setMemoryFile] = React.useState([]);
  const [registers, setRegisters] = React.useState([]);
  const [adder1, setAdder1] = React.useState([]);
  const [adder2, setAdder2] = React.useState([]);
  const [adder3, setAdder3] = React.useState([]);
  const [multiplier1, setMultiplier1] = React.useState([]);
  const [multiplier2, setMultiplier2] = React.useState([]);
  const [load1, setLoad1] = React.useState([]);
  const [load2, setLoad2] = React.useState([]);
  const [store1, setStore1] = React.useState([]);
  const [store2, setStore2] = React.useState([]);
  const [clockCycle, setClockCycle] = React.useState(0);
  const [isLatency, setIsLatency] = React.useState(false);
  const [tick, setTick] = React.useState(false);

  const forceUpdate = useForceUpdate();
  
    const handleSubmit = (event) => {
      let instruction;
      if (
        value === "ADD.D" ||
        value === "SUB.D" ||
        value === "MUL.D" ||
        value === "DIV.D"
      ) {
        instruction = `${value} ${destination} ${source1} ${source2}`;
      } else if (value === "L.D" || value === "S.D") {
        instruction = `${value} ${destination} ${address}`;
      }
      addInstructions(instruction);
      setInstructions([ ])
      setInstructions(instQueue.instruction);
      console.log(instQueue.instruction);
  };
  
  const handleUpdateLatencies = (event) => {
    addLatencies(
      parseInt(addLatency)
      , parseInt(mulLatency)
      , parseInt(loadLatency)
      , parseInt(storeLatency)
      , parseInt(divLatency)
      , parseInt(subLatency)
    );
    setIsLatency(true);
  };


  React.useEffect(() => {
    setInstructions(instQueue.instruction);
    setIssue(instQueue.issue);
    setMemoryFile(memory);
    setRegisters(regFile);
    setAdder1(A1);
    setAdder2(A2);
    setAdder3(A3);
    setMultiplier1(M1);
    setMultiplier2(M2);
    setLoad1(L1);
    setLoad2(L2);
    setStore1(S1);
    setStore2(S2);
    setClockCycle(clock);
    setLoading(false);
    if (tick) {
      const interval = setInterval(() => {
        runCycle();
        setClockCycle(clock);
        setIssue(instQueue.issue);
        setMemoryFile(memory);
        setRegisters(regFile);
        setAdder1(A1);
        setAdder2(A2);
        setAdder3(A3);
        setMultiplier1(M1);
        setMultiplier2(M2);
        setLoad1(L1);
        setLoad2(L2);
        setStore1(S1);
        setStore2(S2);
        forceUpdate();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [tick, forceUpdate]);

  if (loading) {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: "100vh" }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction='column'
      sx={{ p: 3, alignContent: "center", alignItems: "center" }}>
      <Typography variant='h3'>Tomasulo Simulator</Typography>
      <Grid container direction='row' sx={{ p: 7, placeContent: "center" }}>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            if (
              newInputValue === "ADD.D" ||
              newInputValue === "SUB.D" ||
              newInputValue === "MUL.D" ||
              newInputValue === "DIV.D"
            ) {
              setVisible(true);
            } else {
              setVisible(false);
            }
          }}
          id='INST SELECT'
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Operation' />}
        />
        <TextField
          label={inputValue !== "S.D" ? "Destination" : "source"}
          value={destination}
          onChange={(event) => {
            setDestination(event.target.value);
          }}
          sx={{ ml: 5 }}
        />
        {visible && (
          <>
            <TextField
              label='Source 1'
              value={source1}
              onChange={(event) => {
                setSource1(event.target.value);
              }}
              sx={{ ml: 5 }}
            />
            <TextField
              id='Source 2'
              label='Source 2'
              value={source2}
              onChange={(event) => {
                setSource2(event.target.value);
              }}
              sx={{ ml: 5 }}
            />
          </>
        )}
        {!visible && (
          <TextField
            id='Address'
            label='Address'
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            sx={{ ml: 5 }}
          />
        )}
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            handleSubmit();
            forceUpdate();
          }}
          sx={{ ml: 5 }}>
          ADD INSTRUCTION
        </Button>
      </Grid>
      <Typography variant='h5'>Set Latencies</Typography>
      <Grid container direction='row' sx={{ p: 7, placeContent: "center" }}>
        <TextField
          id='Latency ADD'
          label='ADD'
          value={addLatency}
          onChange={(event) => {
            setAddLatency(event.target.value);
          }}
          sx={{ ml: 5, width: "10%" }}
        />
        <TextField
          id='Latency SUB'
          label='SUB'
          value={subLatency}
          onChange={(event) => {
            setSubLatency(event.target.value);
          }}
          sx={{ ml: 5, width: "10%" }}
        />
        <TextField
          id='Latency MUL'
          label='MUL'
          value={mulLatency}
          onChange={(event) => {
            setMulLatency(event.target.value);
          }}
          sx={{ ml: 5, width: "10%" }}
        />
        <TextField
          id='Latency DIV'
          label='DIV'
          value={divLatency}
          onChange={(event) => {
            setDivLatency(event.target.value);
          }}
          sx={{ ml: 5, width: "10%" }}
        />
        <TextField
          id='Latency L.D'
          label='LOAD'
          value={loadLatency}
          onChange={(event) => {
            setLoadLatency(event.target.value);
          }}
          sx={{ ml: 5, width: "10%" }}
        />
        <TextField
          id='Latency S.D'
          label='STORE'
          value={storeLatency}
          onChange={(event) => {
            setStoreLatency(event.target.value);
          }}
          sx={{ ml: 5, width: "10%" }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            handleUpdateLatencies();
            forceUpdate();
          }}
          sx={{ ml: 5 }}>
          UPDATE LATENCIES
        </Button>
      </Grid>
      <Typography variant='h5'>Control Panel</Typography>
      <Grid container direction='row' sx={{ p: 7, placeContent: "center" }}>
        <Chip
          avatar={<AccessTimeIcon />}
          label={`Clock Cycle ${clockCycle}`}
          variant='outlined'
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setLoading(true);
            runCycle();
            setClockCycle(clock);
            setLoading(false);
            forceUpdate();
          }}
          disabled= {!isLatency}
          sx={{ ml: 5 }}>
          RUN CYCLE
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setLoading(true);
            for (let i = 0; i < 50; i++) {
              runCycle();
              setClockCycle(clock);
            }
            setLoading(false);
            forceUpdate();
          }}
          disabled= {!isLatency}
          sx={{ ml: 5 }}>
          RUN 50 CYCLES
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setLoading(true);
            for (let i = 0; i < 100; i++) {
              runCycle();
              setClockCycle(clock);
            }
            setClockCycle(clock);
            setLoading(false);
            forceUpdate();
          }}
          disabled= {!isLatency}
          sx={{ ml: 5 }}>
          RUN 100 CYCLES
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setTick(!tick);
          }}
          disabled= {!isLatency}
          sx={{ ml: 5 }}>
          {tick?"STOP TICKING":"KEEP TICKING"}
        </Button>
      </Grid>
      <Grid container direction='row' sx={{ p: 3, alignContent: "center" }}>
        <TableContainer component={Paper}>
          <Table sx={{ textAlignLast: "center" }}>
            <TableHead>
              <TableRow>
                <TableCell>INSTRUCTION QUEUE</TableCell>
                <TableCell>Instruction</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instructions.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component='th' scope='row'>
                    {i}
                  </TableCell>
                  <TableCell>{row}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ textAlignLast: "center" }}>
            <TableHead>
              <TableRow>
                <TableCell>ISSUE</TableCell>
                <TableCell>Instruction</TableCell>
                <TableCell>Issued</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issue.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component='th' scope='row'>
                    {i}
                  </TableCell>
                  <TableCell>{row.instruction}</TableCell>
                  <TableCell>{row.issued.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container direction='row' sx={{ p: 3, alignContent: "center" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 300, textAlignLast: "center" }}
            aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ADDER</TableCell>
                <TableCell align='right'>Busy</TableCell>
                <TableCell align='right'>OP</TableCell>
                <TableCell align='right'>VJ</TableCell>
                <TableCell align='right'>VK</TableCell>
                <TableCell align='right'>QJ</TableCell>
                <TableCell align='right'>QK</TableCell>
                <TableCell align='right'>A</TableCell>
                <TableCell align='right'>Clock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"A1"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"ADDER 1"}
                </TableCell>
                <TableCell align='right'>{adder1.busy.toString()}</TableCell>
                <TableCell align='right'>{adder1.op}</TableCell>
                <TableCell align='right'>{adder1.Vj}</TableCell>
                <TableCell align='right'>{adder1.Vk}</TableCell>
                <TableCell align='right'>{adder1.Qj}</TableCell>
                <TableCell align='right'>{adder1.Qk}</TableCell>
                <TableCell align='right'>{adder1.a}</TableCell>
                <TableCell align='right'>{adder1.cycle}</TableCell>
              </TableRow>
              <TableRow
                key={"A2"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"ADDER 2"}
                </TableCell>
                <TableCell align='right'>{adder2.busy.toString()}</TableCell>
                <TableCell align='right'>{adder2.op}</TableCell>
                <TableCell align='right'>{adder2.Vj}</TableCell>
                <TableCell align='right'>{adder2.Vk}</TableCell>
                <TableCell align='right'>{adder2.Qj}</TableCell>
                <TableCell align='right'>{adder2.Qk}</TableCell>
                <TableCell align='right'>{adder2.a}</TableCell>
                <TableCell align='right'>{adder2.cycle}</TableCell>
              </TableRow>
              <TableRow
                key={"A3"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"ADDER 3"}
                </TableCell>
                <TableCell align='right'>{adder3.busy.toString()}</TableCell>
                <TableCell align='right'>{adder3.op}</TableCell>
                <TableCell align='right'>{adder3.Vj}</TableCell>
                <TableCell align='right'>{adder3.Vk}</TableCell>
                <TableCell align='right'>{adder3.Qj}</TableCell>
                <TableCell align='right'>{adder3.Qk}</TableCell>
                <TableCell align='right'>{adder3.a}</TableCell>
                <TableCell align='right'>{adder3.cycle}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container direction='row' sx={{ p: 3, alignContent: "center" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, textAlignLast: "center" }}
            aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>MULTIPLIER</TableCell>
                <TableCell align='right'>Busy</TableCell>
                <TableCell align='right'>OP</TableCell>
                <TableCell align='right'>VJ</TableCell>
                <TableCell align='right'>VK</TableCell>
                <TableCell align='right'>QJ</TableCell>
                <TableCell align='right'>QK</TableCell>
                <TableCell align='right'>A</TableCell>
                <TableCell align='right'>Clock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"M1"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"MULTIPLIER 1"}
                </TableCell>
                <TableCell align='right'>
                  {multiplier1.busy.toString()}
                </TableCell>
                <TableCell align='right'>{multiplier1.op}</TableCell>
                <TableCell align='right'>{multiplier1.Vj}</TableCell>
                <TableCell align='right'>{multiplier1.Vk}</TableCell>
                <TableCell align='right'>{multiplier1.Qj}</TableCell>
                <TableCell align='right'>{multiplier1.Qk}</TableCell>
                <TableCell align='right'>{multiplier1.a}</TableCell>
                <TableCell align='right'>{multiplier1.cycle}</TableCell>
              </TableRow>
              <TableRow
                key={"M2"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"MULTIPLIER 2"}
                </TableCell>
                <TableCell align='right'>
                  {multiplier2.busy.toString()}
                </TableCell>
                <TableCell align='right'>{multiplier2.op}</TableCell>
                <TableCell align='right'>{multiplier2.Vj}</TableCell>
                <TableCell align='right'>{multiplier2.Vk}</TableCell>
                <TableCell align='right'>{multiplier2.Qj}</TableCell>
                <TableCell align='right'>{multiplier2.Qk}</TableCell>
                <TableCell align='right'>{multiplier2.a}</TableCell>
                <TableCell align='right'>{multiplier2.cycle}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid
        container
        direction='row'
        sx={{ p: 3, alignContent: "center", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ width: "40%" }}>
          <Table
            sx={{ minWidth: 300, textAlignLast: "center" }}
            aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>LOAD BUFFERS</TableCell>
                <TableCell align='right'>Busy</TableCell>
                <TableCell align='right'>Address</TableCell>
                <TableCell align='right'>Clock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"LB1"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"LOAD BUFFER 1"}
                </TableCell>
                <TableCell align='right'>{load1.busy.toString()}</TableCell>
                <TableCell align='right'>{load1.address}</TableCell>
                <TableCell align='right'>{load1.cycle}</TableCell>
              </TableRow>
              <TableRow
                key={"LB2"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"LOAD BUFFER 2"}
                </TableCell>
                <TableCell align='right'>{load2.busy.toString()}</TableCell>
                <TableCell align='right'>{load2.address}</TableCell>
                <TableCell align='right'>{load2.cycle}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ width: "40%", ml: 5 }}>
          <Table
            sx={{ minWidth: 300, textAlignLast: "center" }}
            aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>STORE BUFFERS</TableCell>
                <TableCell align='right'>Busy</TableCell>
                <TableCell align='right'>Address</TableCell>
                <TableCell align='right'>Clock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"SB1"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"STORE BUFFER 1"}
                </TableCell>
                <TableCell align='right'>{store1.busy.toString()}</TableCell>
                <TableCell align='right'>{store1.address}</TableCell>
                <TableCell align='right'>{store1.cycle}</TableCell>
              </TableRow>
              <TableRow
                key={"SB2"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {"STORE BUFFER 2"}
                </TableCell>
                <TableCell align='right'>{store2.busy.toString()}</TableCell>
                <TableCell align='right'>{store2.address}</TableCell>
                <TableCell align='right'>{store2.cycle}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid
        container
        direction='row'
        sx={{ p: 3, alignContent: "center", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "40%", height: "50vh" }}>
          <Table
            sx={{ minWidth: 300, textAlignLast: "center" }}
            aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>REGISTER FILE</TableCell>
                <TableCell align='right'>Qi</TableCell>
                <TableCell align='right'>value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registers.map((r, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {"R" + i}
                    </TableCell>
                    <TableCell align='right'>{r.Qi}</TableCell>
                    <TableCell align='right'>{r.value}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ width: "40%", ml: 5, height: "50vh" }}>
          <Table
            sx={{ minWidth: 300, textAlignLast: "center" }}
            aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>MEMORY</TableCell>
                <TableCell align='right'>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memoryFile.map((m, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {`M [${i}]`}
                    </TableCell>
                    <TableCell align='right'>{memory[i]}</TableCell>
                    <TableCell align='right'>{m[i]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Home;
