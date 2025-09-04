import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login } from "../store/authslice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./index";
import { NavLink } from "react-router-dom";
import { FaBolt, FaFingerprint, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    setError("");
    try {
      console.log("Login attempt with:", data);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials.");
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen min-h-[60vh] my-16 flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-500/40 w-1/4 border-stone-500 shadow flex items-center justify-center flex-col gap-4 rounded-lg border px-8 py-16">
        <div className="flex flex-col items-center justify-center">
          <NavLink to="/" className="flex items-center gap-2">
            <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-3">
              <FaBolt className="text-gray-100 text-xl" />
            </p>
            <p className="text-2xl font-bold">Muhammad Ahmed Raza</p>
          </NavLink>
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full flex flex-col gap-4 justify-center"
        >
          <Input
            type="email"
            label="Email *"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <div className="relative w-full h-fit">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password *"
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ||
                    "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
                },
              })}
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="cursor-pointer absolute right-3 bottom-3"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          
          <p>
            Create an Account{" "}
            <NavLink to="/signup" className="text-orange-500">
              Signup
            </NavLink>
          </p>
          <p className="text-red-500">{error}</p>
          <Button type="submit">
            <FaFingerprint />
            <p>Login</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
