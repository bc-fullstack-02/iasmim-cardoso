import { useState } from "react";
import Feed from "../../components/Feed";
import Menu from "../../components/Menu";

function Home() {
  return (
    <div className="w-screen h-screen flex">
      <Menu />
      <Feed />
    </div >
  );
}

export default Home;
