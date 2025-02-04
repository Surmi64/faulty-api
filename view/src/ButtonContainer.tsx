import React from 'react';

type ButtonContainerParamsType = {
    onClickFunc: () => void,
    description: string
}

export const ButtonContainer = ({onClickFunc, description}: ButtonContainerParamsType) => {
    return (
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button onClick={onClickFunc}>FETCH</button>
        <p>{description}</p>
      </div>
    )
}