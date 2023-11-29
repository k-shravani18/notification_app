// page.js
"use client";
import React from "react";
import Notification from "./notification";

const Home = () => {
  return (
    <>
      <div className="app">
        <h1>Hello....</h1>
        <Notification />
      </div>
      {/* The rest of your Home component */}
    </>
  );
};

export default Home;
