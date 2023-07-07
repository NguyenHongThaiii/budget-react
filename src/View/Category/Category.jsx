import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ButtonMove from "../components/ButtonMove/ButtonMove";
import { useStore } from "../../store/context/store-context";
import CategoryItem from "./components/CategoryItem";
import ModalCategory from "./components/Modal/ModalCategory";
import { GAP_SLIDE, QUANTITY_SLIDE_SHOW } from "../../utils";
import { useSlideShow } from "../../hooks/useSlideShow";
const Category = ({}) => {
  const store = useStore();
  const [listCats, setListCats] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const btnPrevRef = useRef();
  const btnNextRef = useRef();
  const [category, setCategory] = useState({});
  const budgetListRef = useRef();
  const { handleSlideListBudget } = useSlideShow(budgetListRef);

  const handleToggleModal = (cat) => {
    setIsModal((prev) => !prev);
    setCategory(cat);
  };

  useEffect(() => {
    (async () => {
      await store.getCategoryList();
      setListCats(JSON.parse(JSON.stringify(store.categoryList)));
    })();
  }, []);

  const handleOnSubmit = async (formValues) => {
    await store.addBudgetItem(formValues, category);
    setIsModal(false);
  };
  return (
    <Box
      sx={{
        background: "#c0e3dd",
        display: "flex",
        alignItems: "center",
        gap: "0 40px",
        padding: "20px",
        color: "#000",
      }}
    >
      <Box sx={{ minWidth: "120px" }}>
        <Typography
          component="p"
          sx={{ fontSize: "28px", fontWeight: "500", mb: "12px" }}
        >
          Category
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: 1,
            position: "relative", // Add this line
            zIndex: 1, // Add this line
          }}
        >
          <ButtonMove
            type="prev"
            text="Previous"
            ref={btnPrevRef}
            onClick={handleSlideListBudget}
          />
          <ButtonMove
            type="next"
            text="Next"
            ref={btnNextRef}
            onClick={handleSlideListBudget}
          />
        </Box>
      </Box>
      <Box
        ref={budgetListRef}
        component="ul"
        sx={{
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          gap: `0 ${GAP_SLIDE}px`,
          overflow: "hidden",
          padding: "20px",
        }}
      >
        {listCats.map((cat, i) => (
          <CategoryItem key={cat.id} cat={cat} onShow={handleToggleModal} />
        ))}
      </Box>
      {isModal && (
        <ModalCategory
          onShow={() => setIsModal((status) => !status)}
          onSubmit={handleOnSubmit}
          cat={category}
        />
      )}
    </Box>
  );
};

export default Category;
