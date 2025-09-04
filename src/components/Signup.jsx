import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login } from "../store/authslice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./index";
import { NavLink } from "react-router-dom";
import { FaBolt, FaEye, FaEyeSlash, FaFingerprint } from "react-icons/fa";

const Signup = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (data) => {
    try {
      console.log("Signup attempt with:", data);
      const {name, email, password} = data;
      const user = await authService.createAccount(name, email, password);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };

  return (
    <div className="w-screen min-h-[60vh] my-16 flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-500/40 w-1/4  border-stone-500 shadow flex items-center justify-center flex-col gap-4 rounded-lg border px-8 py-16">
        <div className="flex flex-col items-center justify-center">
          <NavLink to="/" className="flex items-center gap-2">
            <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-3">
              <FaBolt className="text-gray-100 text-xl" />
            </p>
            <p className="text-2xl font-bold">Muhammad Ahmed Raza</p>
          </NavLink>
          <h1 className="text-2xl font-bold">Signup</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="w-full flex flex-col gap-2 justify-center"
        >
          <Input
            type="text"
            label="Name"
            placeholder="Enter Your Name"
            {...register("name", {
              required: true,
            })}
          />
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
          <div className="relative w-full h-fit">
            <Input
              type={showPassword ? "text" : "password"}
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
            <button
              type="button"
              onClick={handleShowPassword}
              className="cursor-pointer absolute right-3 bottom-3"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div>
            <p className="text-gray-300">Password Must Contain:</p>
            <ul className="list-disc list-inside text-sm text-gray-300">
              <li>At least 8 characters</li>
              <li>At least 1 letter</li>
              <li>At least 1 number</li>
            </ul>
          </div>
          <p>
            Already have an account?{" "}
            <NavLink to="/login" className="text-orange-500">
              Login
            </NavLink>
          </p>
          <p className="text-red-500">{error}</p>
          <Button type="submit">
            <FaFingerprint />
            <p>Signup</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
