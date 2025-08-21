import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authslice";
import { IoLogOut } from "react-icons/io5";


const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-orange-500 px-4 py-2 rounded-lg font-semibold shadow">
    <IoLogOut className="text-gray-100 text-xl" />
    <p className="">Logout</p>
  </button>;
};

export default LogoutBtn;
