import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react"

import Landing from "./components/Layout/Landing";
import Auth from "./views/auth"
import Dashboard from "./views/dashboard"
import About from "./views/about"
import AuthContextProvider from "./contexts/AuthContext"
import PostContextProvider from "./contexts/PostContext"

import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
      <AuthContextProvider>
        <PostContextProvider>
          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Auth authRoute='login' />} />
              <Route path="/register" element={<Auth authRoute='register' />} />
              <Route exact path='/' element={<ProtectedRoute />} >
                <Route exact path="about" element={<About />} />
                <Route exact path='dashboard' element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </PostContextProvider>
      </AuthContextProvider>
  );
}

export default App;
