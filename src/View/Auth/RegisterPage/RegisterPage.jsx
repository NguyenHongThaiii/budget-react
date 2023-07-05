import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import ButtonCommon from "../../components/ButtonCommon/ButtonCommon";
import InputField from "../../components/InputField/InputField";
import { auth, db } from "../../../firebase/firebase-config";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().min(6, "min 6 characters").required(),
  passwordConfirm: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Password does not match."),
});

function RegisterPage({ store }) {
  const navigate = useNavigate();
  if (store.user?.id) return navigate("/");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState("");

  const userRef = collection(db, "users");

  const handleOnSubmit = async (values) => {
    try {
      const { email, password } = values;
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(userRef, {
        email,
        password,
        id: user.user.uid,
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setError("Something went wrong. Please try again!");
    }
  };
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
          Register Form
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
        <Box sx={{ "& div": { width: "100% " } }}>
          <InputField
            control={control}
            name="passwordConfirm"
            placeholder="Fill out your password retype"
            type="password"
          />
        </Box>

        <ButtonCommon
          disabled={isSubmitting}
          text="Submit"
          status="success"
          type="submit"
        />
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
      </Box>

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
        <Link to={"/login"}>You have account? Login here!</Link>
      </Box>
    </Box>
  );
}

export default RegisterPage;
