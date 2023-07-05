import { Container, Button, Box } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bill from "../Bill/Bill";
import Category from "../Category/Category";
import Header from "../Header/Header";
import { StoreProvider } from "../../store/context/store-context";

const MainPage = observer(({ store }) => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (!store.user) navigate("/login");
      else {
        await store.getBudgetItemList();
      }
    })();
  }, []);
  const handleLogout = () => {
    store.logout();
    navigate("/login");
  };
  return (
    <StoreProvider store={store}>
      <Container maxWidth="md" sx={{ marginY: 25 }}>
        {store.user && (
          <>
            <Header getTotalBudget={store.getTotalBudget} />
            <Category />
            <Bill />
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
    </StoreProvider>
  );
});

export default MainPage;
