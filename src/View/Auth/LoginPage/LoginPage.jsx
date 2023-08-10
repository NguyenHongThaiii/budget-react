import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import ButtonCommon from "@views/components/ButtonCommon/ButtonCommon";
import InputField from "@views/components/InputField/InputField";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = observer(({ store }) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {
    try {
      const { email, password } = values;
      await store.login(email, password);

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError("Email or password is not correct");
    }
  };
  useEffect(() => {
    if (store.user?.id) return navigate("/");
  }, []);
  console.log("object");
  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "200px auto",
        backgroundColor: "#fff",
        textAlign: "center",
        borderRadius: 3,
        color: "#000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "20px",
        }}
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Typography component="h1" sx={{ fontSize: 32, fontWeight: "bold" }}>
          {" "}
          Login Form
        </Typography>

        <Box sx={{ "& div": { width: "100% " } }}>
          <InputField
            control={control}
            name="email"
            placeholder="Fill out your email"
            type="email"
          />
        </Box>
        <Box sx={{ "& div": { width: "100% " } }}>
          <InputField
            control={control}
            name="password"
            placeholder="Fill out your password"
            type="password"
          />
        </Box>

        <ButtonCommon
          disabled={isSubmitting}
          text="Submit"
          status="success"
          type="submit"
        />
      </Box>
      {error && (
        <Typography
          sx={{
            mb: 1,
            color: "red",
            fontSize: 16,
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          {error}
        </Typography>
      )}
      <Box
        sx={{
          "& > a ": {
            textDecoration: "none",
            color: "#000",
            fontSize: 16,
            transition: "all 0.05s linear",
            fontStyle: "italic",
            "&:hover": { color: "blue" },
          },
          pb: 1,
        }}
      >
        <Link to={"/register"}>Yet have account? Register here!</Link>
      </Box>
    </Box>
  );
});

export default LoginPage;
