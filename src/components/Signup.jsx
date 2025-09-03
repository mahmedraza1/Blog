import React, { useState } from "react";
import authService from "../appwrite/auth";
import login from "../store/authslice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./index";

const Signup = () => {
  const [ error, setError ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const handleSignup = async (data) => {
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <NavLink to="/" className="flex items-center gap-2">
          <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-3">
            <FaBolt className="text-gray-100 text-xl" />
          </p>
          <p className="text-2xl font-bold">Muhammad Ahmed Raza</p>
        </NavLink>
        <h1 className="text-3xl font-bold">Signup</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignup)}>
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
        <div>
          <p>Password Must Contain:</p>
          <ul>
            <li>At least 8 characters</li>
            <li>At least 1 letter</li>
            <li>At least 1 number</li>
          </ul>
        </div>
        <p className="text-red-500">{error}</p>
        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
};

export default Signup;
