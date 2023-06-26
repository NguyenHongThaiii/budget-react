import { Container, Button, Box } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bill from "../Bill/Bill";
import Category from "../Category/Category";
import Header from "../Header/Header";

const MainPage = observer(({ store }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.user) navigate("/login");
  }, []);
  const handleLogout = () => {
    store.logout();
    navigate("/login");
  };
  return (
    <Container maxWidth="md" sx={{ marginY: 25 }}>
      {store.user && (
        <>
          <Header store={store} />
          <Category store={store} />
          <Bill store={store} />
          <Box sx={{ textAlign: "right" }}>
            <Button
              onClick={handleLogout}
              sx={{ backgroundColor: "#fff", mt: 2 }}
            >
              logout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
});

export default MainPage;
