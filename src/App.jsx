import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authslice";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div
      className="w-screen h-screen bg-gray-900 text-white overflow-x-hidden 
  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-zinc-500 [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      <Header />
      <main className="min-h-[46vh] w-screen flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="bg-gray-900 text-white w-screen h-screen flex items-center justify-center">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  );
}

export default App;
