import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ButtonCommon from "../../../components/ButtonCommon/ButtonCommon";
import InputField from "../../../components/InputField/InputField";
import RadioField from "../../../components/RadioField/RadioField";
import TextareaField from "../../../components/TextAreaField/TextareaField";

const schema = yup
  .object({
    amount: yup
      .number()
      .typeError("This field must be number")
      .required("This field is required"),
    title: yup.string().required("This field must be number"),
    description: yup.string().required("This field is required"),
    action: yup
      .string()
      .required()
      .oneOf(["income", "cost"], "Choose either income or cost"),
  })
  .required();

function ModalCategory({ onShow = null, onSubmit = null }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 1,
      title: "",
      description: "",
      action: "",
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = (formValues) => {
    if (!onSubmit) return;
    onSubmit(formValues);
  };
  return (
    <Box
      className="modal"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      }}
    >
      <Box
        className="modal-body"
        sx={{
          background: "white",
          borderRadius: "8px",
          padding: "24px 32px",
        }}
      >
        <Typography
          component="p"
          className="modal-body__title"
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            paddingBottom: "12px",
            borderBottom: "1px solid #ccc",
            marginBottom: "8px",
            textAlign: "left",
          }}
        >
          Create new:
          <Typography
            component="span"
            className="modal-body__topic"
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              paddingBottom: "12px",
              borderBottom: "1px solid #ccc",
              marginBottom: "8px",
            }}
          >
            {" "}
            salary
          </Typography>
        </Typography>
        <form
          className="modal-body__form"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Box
            className="modal-body__wrap"
            sx={{
              display: "flex",
              gap: "0 12px",
              justifyContent: "space-between",
            }}
          >
            <InputField
              type="number"
              name="amount"
              placeholder="amount"
              control={control}
            />
            <InputField
              type="text"
              name="title"
              placeholder="title"
              control={control}
            />
          </Box>
          <Box className="modal-body__wrap" sx={{ mt: 2 }}>
            <TextareaField
              name="description"
              placeholder="description"
              control={control}
            />
          </Box>
          <Typography
            component="p"
            className="modal-body__mention"
            sx={{
              margin: "12px 0",
              fontWeight: "550",
              fontSize: "18px",
              textAlign: "left",
              mt: 1,
            }}
          >
            Choose type:
          </Typography>
          <Box
            className="modal-body__frag"
            sx={{
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              gap: "0 6px",
            }}
          >
            <RadioField
              textLabel="Is this your income?"
              name="action"
              defaultValue="income"
              htmlFor="income"
              control={control}
              checked
            />
          </Box>
          <Box
            className="modal-body__frag"
            sx={{
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              gap: "0 6px",
            }}
          >
            <RadioField
              textLabel="Is this your cost?"
              name="action"
              defaultValue="cost"
              htmlFor="cost"
              control={control}
            />
          </Box>
          {errors?.action?.message && (
            <Typography
              sx={{
                color: "#d32f2f",
                fontSize: 12,
                mt: 1,
                fontWeight: "normal",
              }}
            >
              {errors?.action?.message}
            </Typography>
          )}
          <Box
            className="modal-body__temp"
            sx={{
              display: "flex",
              gap: "0 10px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <ButtonCommon text="Cancel" onShow={onShow} />
            <ButtonCommon text="Create one" color="success" type="submit" />
          </Box>
          {(errors?.description ||
            errors?.action ||
            errors?.amount ||
            errors?.title) && (
            <Box
              className="modal-error"
              sx={{
                margin: "12px 0",
                textAlign: "center",
                color: "red",
                fontStyle: "italic",
                fontWeight: "600",
                display: "block",
              }}
            >
              Please fill out all the field!
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default ModalCategory;
