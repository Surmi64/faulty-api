import React from "react";
import { Welcome } from "./Welcome.tsx";
import { GetData } from "./GetData.tsx";
import { Header } from "./Header.tsx";

export const App = () => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Header />
      <Welcome />
      <GetData />
    </div>
  );
};
