import React, { useState, useRef, useEffect, Profiler } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
// pages
import {
  About,
  Apply,
  Asset,
  Browse_Collections,
  Single_collection,
  // CreateIndividualCollection,
  InstituteCollection,
  // CreateInstituteCollection,
  Home,
  Search,
  Register,
  Login,
  SignUp,
  Subscribe,
  Upload,
  AssetForm,
  Landing,
  Profile,
  User
} from "./pages";
import { ContextProvider, useMyContext } from "./context/FLContext";
import SearchBar from "./components/searchBar/SearchBar";
import FL_Logo from "./components/FL_Logo/FL_Logo";
import HamburgerMenu from "./components/hamburgerMenu/HamburgerMenu";

function App() {
  return (
    <BrowserRouter>
      <div className="FL--App--Cont">
        <ContextProvider>
          <HamburgerMenu />
          {/* <div className='FL--Search--Cont'>
          
        </div> */}
          <div className="gradient-cont header--height">
            <div className="FL--Logo--Cont header--height ">
              <FL_Logo />
            </div>

            <div className="FL--Search--Cont header--height">
              <SearchBar />
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/about" element={<About />}></Route>

            <Route path="/search/:param1?" element={<Search />}></Route>
            
            <Route path="/apply" element={<Apply />}></Route>
            
            <Route path="/asset/:id/:parentId?" element={<Asset />}></Route>
            <Route path="/browseCollections" element={<Browse_Collections />}></Route>
            <Route path="/collection/:param1" element={<Single_collection />}></Route>

            <Route path="/user/:id" element={<User />}></Route>
            <Route path="/profile" element={<Profile />}></Route>

            <Route path="/apply" element={<Apply />}></Route>

            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/subscribe" element={<Subscribe />}></Route>

            <Route path="/upload" element={<Upload />}></Route>
          
            <Route path="/upload/asset" element={<AssetForm />}></Route>
          </Routes>
          <div className="bottom--gradient-cont">
            <h4>© Future Legacy 2023</h4>
          </div>
        </ContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
