import { useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header/Header";
import Category from "./Category/Category";
import Bill from "./Bill/Bill";
import { Store } from "./store/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <Box maxWidth="800px" m="200px auto 200px">
    <Container maxWidth="md" sx={{ marginY: 25 }}>
      <Header store={Store} />
      <Category store={Store} />
      <Bill store={Store} />
    </Container>
    // </Box>
  );
}

export default App;
