import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authslice";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components/index";

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
    <div className="w-screen h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <h1 className="text-2xl">Welcome to Mark's Blog</h1>
       {/* TODO: <Outlet /> */}
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
