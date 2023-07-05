import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ButtonMove from "../components/ButtonMove/ButtonMove";
import { useStore } from "../../store/context/store-context";
import CategoryItem from "./components/CategoryItem";
import ModalCategory from "./components/Modal/ModalCategory";
import { QUANTITY_SLIDE_SHOW } from "../../utils";

const Category = ({}) => {
  const store = useStore();
  const [listCats, setListCats] = useState([]);
  const [slide, setSlide] = useState({
    countNext: 0,
    countPrev: 0,
  });
  const [isModal, setIsModal] = useState(false);
  const btnPrevRef = useRef();
  const btnNextRef = useRef();
  const budgetListRef = useRef();
  const [category, setCategory] = useState({});
  const handleSlideListBudget = (type = "next") => {
    if (type === "next") {
      if (
        slide.countNext >=
        budgetListRef.current.children.length - QUANTITY_SLIDE_SHOW
      )
        return;
      const temp = slide.countNext + QUANTITY_SLIDE_SHOW;

      Array.from(budgetListRef.current.childNodes).map((item, index) => {
        item.style.transform =
          "translateX(" + (-item.offsetWidth - 30) * temp + "px" + ")";
      });
      setSlide((old) => ({ ...old, countNext: temp }));
    } else {
      slide.countPrev = slide.countNext;
      if (slide.countPrev == 0) return;
      slide.countPrev -= QUANTITY_SLIDE_SHOW;
      slide.countNext -= QUANTITY_SLIDE_SHOW;
      Array.from(budgetListRef.current.childNodes).map((item, index) => {
        item.style.transform =
          "translateX(" +
          (-item.offsetWidth - 30) * slide.countPrev +
          "px" +
          ")";
      });
    }
  };

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
          gap: "0 30px",
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
