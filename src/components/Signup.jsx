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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (data) => {
    setIsLoading(true);
    setError("");
    
    try {
      console.log("Signup attempt with:", data);
      const {name, email, password} = data;
      // Fix parameter order to match the auth service implementation
      const user = await authService.createAccount(email, password, name);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Signup failed");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[60vh] my-8 md:my-16 flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-500/40 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border-stone-500 shadow flex items-center justify-center flex-col gap-4 rounded-lg border px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center w-full">
          <NavLink to="/" className="flex items-center gap-2 mb-6">
            <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-2">
              <FaBolt className="text-gray-100 text-lg" />
            </p>
            <p className="text-xl md:text-2xl font-bold">Muhammad Ahmed Raza</p>
          </NavLink>
          <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
          {error && (
            <div className="w-full p-3 mb-4 bg-red-500 bg-opacity-20 border border-red-500 text-red-100 rounded-md">
              {error}
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="w-full flex flex-col gap-3 justify-center"
        >
          <Input
            type="text"
            label="Name *"
            placeholder="Enter Your Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message || "Password is required and must meet all requirements"}</p>}
          <div>
            <p className="text-gray-300">Password Must Contain:</p>
            <ul className="list-disc list-inside text-sm text-gray-300">
              <li>At least 8 characters</li>
              <li>At least 1 uppercase letter</li>
              <li>At least 1 lowercase letter</li>
              <li>At least 1 number</li>
              <li>At least 1 special character</li>
            </ul>
          </div>
          <p className="text-center my-2">
            Already have an account?{" "}
            <NavLink to="/login" className="text-orange-500 hover:text-orange-400 font-medium">
              Login
            </NavLink>
          </p>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                <p>Creating account...</p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaFingerprint />
                <p>Create Account</p>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
