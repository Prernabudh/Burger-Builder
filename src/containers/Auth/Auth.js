import React from "react";

const Auth = (props) => {
  const [controls, setControls] = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  };
  return (
    <div>
      <form></form>
    </div>
  );
};

export default Auth;
