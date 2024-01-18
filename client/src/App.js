import React, { useState, useRef, useEffect, Profiler } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
// pages
import {
  About,
  Apply,
  Asset,
  // Browse_Collections,
  Browse_Clients,
  Single_collection,
  // CreateIndividualCollection,
  InstituteCollection,
  // CreateInstituteCollection,
  Home,
  // Home_alt,
  Search_Results,
  Register,
  Login,
  SignUp,
  Subscribe,
  Upload,
  AssetUpload,
  CollectionUpload,
  CreateFeatured,
  UploadBanner,
  UpdateCollectionAssets,
  Landing,
  Profile,
  User,
} from "./pages";
import { ContextProvider, useMyContext } from "./context/FLContext";
import { SearchContextProvider } from "./context/SearchContext";
import { ErrorContextProvider } from "./context/ErrorContext";
import { ToastContextProvider } from "./context/ToastContext";
import { UploadContextProvider } from "./context/UploadContext";

import SearchBar from "./components/searchBar/SearchBar";
import FL_Logo from "./components/FL_Logo/FL_Logo";
import HamburgerMenu from "./components/hamburgerMenu/HamburgerMenu";
import SidebarMenu from "./components/sidebarMenu/SidebarMenu";

import NavMenu from "./components/sidebarMenu/NavMenu";

import SideBarBtn from "./components/sidebarMenu/SideBarBtn";
import ToastContainer from "./components/toasts/ToastContainer";
import AppPageContainer from "./components/containers/AppPageContainer";
function App() {
  return (
    <BrowserRouter>
      <div className="FL--App--Cont">
        <ErrorContextProvider>
          <ToastContextProvider>
            <ContextProvider>
              <SearchContextProvider>
                <UploadContextProvider>
                  <ToastContainer />
                  {/* <HamburgerMenu /> */}
                  {/* <SidebarMenu /> */}
                  <NavMenu/>
                  {/* <div className='FL--Search--Cont'>
          
        </div> */}
                  <div className="gradient-cont header--height">
                    
                    <SideBarBtn />
                    <div className="FL--Logo--Cont header--height ">
                      <FL_Logo />
                    </div>

                    <div className="FL--Search--Cont header--height">
                      <SearchBar />
                    </div>
                  </div>
                  <AppPageContainer>
                    <Routes className="app--content--cont">
                      <Route path="/" element={<Home />}></Route>
                      {/* <Route path="/alt" element={<Home_alt />}></Route> */}
                      <Route path="/landing" element={<Landing />}></Route>
                      <Route path="/about" element={<About />}></Route>

                      <Route
                        path="/search_results/:param1?"
                        element={<Search_Results />}
                      ></Route>

                      <Route path="/apply" element={<Apply />}></Route>

                      <Route
                        path="/asset/:id/:parentId?"
                        element={<Asset />}
                      ></Route>
                      <Route
                        path="/clients"
                        element={<Browse_Clients />}
                      ></Route>
                      <Route
                        path="/collection/:param1/:featuredId?"
                        element={<Single_collection />}
                      ></Route>

                      <Route path="/user/:id" element={<User />}></Route>
                      <Route path="/profile" element={<Profile />}></Route>

                      <Route path="/apply" element={<Apply />}></Route>

                      <Route path="/register" element={<Register />}></Route>
                      <Route path="/login" element={<Login />}></Route>
                      <Route path="/signUp" element={<SignUp />}></Route>
                      <Route path="/subscribe" element={<Subscribe />}></Route>

                      <Route path="/upload" element={<Upload />}></Route>

                      <Route path="/upload/asset"element={<AssetUpload />}></Route>
                      <Route path="/upload/collection"element={<CollectionUpload />}></Route>
                      <Route path="/upload/featured"element={<CreateFeatured />}></Route>
                      <Route path="/upload/userBanner"element={<UploadBanner />}></Route>
                      <Route path="/upload/updateCollAssets"element={<UpdateCollectionAssets />}></Route>
                    </Routes>
                  </AppPageContainer>

                  <div className="bottom--gradient-cont">
                    <h4>© Future Legacy 2023</h4>
                  </div>
                </UploadContextProvider>
              </SearchContextProvider>
            </ContextProvider>
          </ToastContextProvider>
        </ErrorContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
