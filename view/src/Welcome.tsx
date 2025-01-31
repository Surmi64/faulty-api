import React, { useState } from "react";
import { ButtonContainer } from "./ButtonContainer.tsx";

export const Welcome = () => {
  const [responseStatus, setResponseStatus] = useState<number>(null);
  const [responseStatusText, setResponseStatusText] = useState<string>("");

  const fetchWelcome = async (): Promise<void> => {
    const response = await fetch("http://localhost:5000/", {
      method: "GET",
    });

    if (!response.ok) {
      setResponseStatus(response.status);
      setResponseStatusText(response.statusText);
      return;
    }
    setResponseStatus(response.status);
    const statusText: string = await response.text();
    setResponseStatusText(statusText);
  };

  return (
    <>
      <ButtonContainer
        onClickFunc={fetchWelcome}
        description={"You should see the word 'Welcome!'."}
      />

      {responseStatusText && (
        <div
          style={{
            backgroundColor: responseStatus === 200 ? "#caeec2" : "#ff8ba0",
            maxWidth: "auto",
            height: "auto",
            padding: "16px",
            borderRadius: "5px",
          }}
        >
          {responseStatus === 405
            ? `Error: ${responseStatusText} ${responseStatus}`
            : responseStatusText}
        </div>
      )}
    </>
  );
};
