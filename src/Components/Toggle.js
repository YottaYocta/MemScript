import React from "react";

function Toggle({ value, setValue, firstOption, secondOption }) {
  const toggleValue = () => {
    if (value === firstOption) {
      setValue(secondOption);
    } else {
      setValue(firstOption);
    }
  };

  return (
    <button
      className="btn btn-primary form-control"
      onClick={toggleValue}
      type="button"
    >
      {value}
    </button>
  );
}

export default Toggle;
