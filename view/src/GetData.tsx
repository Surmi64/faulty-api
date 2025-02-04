import React, { useState } from "react";
import { ButtonContainer } from "./ButtonContainer.tsx";

type ResponseData = {
  id: number;
  name: string;
  [key: string]: any;
};

export const GetData = () => {
  const [responseStatus, setResponseStatus] = useState<number>(null);
  const [errorStatusText, setErrorStatusText] = useState<string>("");
  const [responseObjectArray, setResponseObjectArray] = useState<
    ResponseData[]
  >([]);

  const [isResponseBack, setIsResponseBack] = useState<boolean>(false);

  const getData = async (): Promise<void> => {
    setIsResponseBack(false);

    try {
      const response = await fetch("http://localhost:5000/get-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "dYpdXfKaYeWS5XfvV5qWn7k456FQZr0BpH3rsN2g9ta3ZAfjE4",
        },
        body: JSON.stringify({ kind: "subscription" }),
      });

      setResponseStatus(response.status);
      const result = await response.json();
      if (response.status === 200) {
        setResponseObjectArray(result);
        setErrorStatusText("");
      } else {
        setResponseObjectArray([]);
        setErrorStatusText(result.error);
      }
    } catch (error) {
      setResponseObjectArray([]);
      setErrorStatusText(error.message);
    }
    setIsResponseBack(true);
  };

  return (
    <>
      <ButtonContainer
        onClickFunc={getData}
        description={"You should see a table with data."}
      />
      {isResponseBack && (
        <div
          style={{
            backgroundColor: responseStatus === 200 ? "#caeec2" : "#ff8ba0",
            maxWidth: "auto",
            height: "auto",
            padding: "16px",
            borderRadius: "5px",
          }}
        >
          {responseObjectArray.length > 0 ? (
            <table
              cellPadding="8"
              border="1"
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  {Object.keys(responseObjectArray[0]).map((key: string) => (
                    <th key={key} style={{ textAlign: "left" }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responseObjectArray.map((obj: ResponseData, idx: number) => (
                  <tr key={idx}>
                    {Object.values(obj).map(
                      (value: string | number, i: number) => (
                        <td key={i} style={{ textAlign: "left" }}>
                          {String(value)}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            errorStatusText
          )}
        </div>
      )}
    </>
  );
};
