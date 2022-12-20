import React, { useRef, useEffect } from "react";
import MaleHat from "./maleHat.png";
import LadyHat from "./ladyHat.png";
import MaleHatPurp from "./maleHatPurp.png";
import LadyHatPurp from "./ladyHatPurp.png";
import MaleHatRed from "./maleHatRed.png";
import LadyHatRed from "./ladyHatRed.png";

function Canvas({ punkDetails }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const punk = new Image();
    punk.src = punkDetails.img;
    punk.alt = "currentPunk";
    punk.onload = async function () {
      await context.drawImage(punk, 0, 0, 500, 500);

      if (punkDetails.gender === "Female") {
        const ladyHat = new Image();
        if (punkDetails.bgColor === "blue") {
          ladyHat.src = LadyHat;
        }
        if (punkDetails.bgColor === "purple") {
          ladyHat.src = LadyHatPurp;
        }
        if (punkDetails.bgColor === "red") {
          ladyHat.src = LadyHatRed;
        }
        ladyHat.alt = "ladyHat";

        ladyHat.onload = async function () {
          await context.drawImage(ladyHat, 0, 0, 500, 234); //Lady Hat Dimensions 500x234
        };
      } else {
        const maleHat = new Image();
        if (punkDetails.bgColor === "blue") {
          maleHat.src = MaleHat;
        }
        if (punkDetails.bgColor === "purple") {
          maleHat.src = MaleHatPurp;
        }
        if (punkDetails.bgColor === "red") {
          maleHat.src = MaleHatRed;
        }
        maleHat.alt = "maleHat";

        maleHat.onload = async function () {
          await context.drawImage(maleHat, 0, 0, 500, 209); //Male Hat Dimensions 500x209
        };
      }
    };
  }, [punkDetails]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ borderRadius: "10px" }}
    />
  );
}

export default Canvas;
