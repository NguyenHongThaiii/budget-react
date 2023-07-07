import { useState } from "react";
import { GAP_SLIDE, QUANTITY_SLIDE_SHOW } from "../utils";

export function useSlideShow(budgetListRef) {
  const [slide, setSlide] = useState({
    countNext: 0,
    countPrev: 0,
  });
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
          "translateX(" + (-item.offsetWidth - GAP_SLIDE) * temp + "px" + ")";
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
          (-item.offsetWidth - GAP_SLIDE) * slide.countPrev +
          "px" +
          ")";
      });
    }
  };
  return {
    slide,
    setSlide,
    handleSlideListBudget,
  };
}
