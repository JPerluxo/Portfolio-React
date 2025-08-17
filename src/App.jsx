import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
