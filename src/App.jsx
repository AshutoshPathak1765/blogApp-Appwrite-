import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import "./App.css"

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
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div class="min-h-screen flex border-red-500 flex-wrap content-between bg-gray-400">
    <div class="w-full block">
      <Header />
      <main>
        TODO: <Outlet />
      </main>
      <Footer />
    </div>
  </div>  
  ) : null;
}

export default App;
