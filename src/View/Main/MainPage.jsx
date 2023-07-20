import { Box, Button, Container } from "@mui/material";
import { StoreProvider } from "@store/context/store-context";
import Bill from "@views/Bill/Bill";
import Category from "@views/Category/Category";
import Header from "@views/Header/Header";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
