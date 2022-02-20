import React from "react";
import Webcam from "react-webcam";
import Motion from "react-motion-detect";
import { useState, useEffect, useRef } from "react";

function Differ({ setMovementCount }) {
  const onMotion = () => {
    setMovementCount((prev) => prev + 1);
  };

  return (
    <div>
      <Webcam />
      <Motion onMotion={onMotion} motionThreshold={10000} />
    </div>
  );
}

export default Differ;
