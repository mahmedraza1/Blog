import React, { useState } from "react";
import authService from "../appwrite/auth";
import login from "../store/authslice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./index";
import { NavLink } from "react-router-dom";
import { FaBolt } from "react-icons/fa";

const Login = () => {
  const [ error, setError ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-gray-900 text-white">
    <div className="bg-gray-500/40 border-stone-500 shadow w-1/3 h-2/3 flex items-center justify-center flex-col gap-8 rounded-lg border p-4">
      <div className="flex flex-col items-center justify-center">
        <NavLink to="/" className="flex items-center gap-2">
          <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-3">
            <FaBolt className="text-gray-100 text-xl" />
          </p>
          <p className="text-2xl font-bold">Muhammad Ahmed Raza</p>
        </NavLink>
        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="w-full flex flex-col gap-4 items-center justify-center">
        <Input
          type="email"
          label="Email"
          placeholder="Enter Your Email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                "Invalid email address",
            },
          })}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter Your Password"
          {...register("password", {
            required: true,
            minLength: 8,
            validate: {
              matchPattern: (value) =>
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                "Invalid password",
            },
          })}
        />
        <p className="text-red-500">{error}</p>
        <Button type="submit">Login</Button>
      </form>
    </div>
    </div>
  );
};

export default Login;
