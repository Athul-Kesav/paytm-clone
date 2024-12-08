"use client";

import { useState } from "react";
import Button from "./Button";

type alertBoxProps = {
  text: string;
  type: "success" | "error" | "warning" | "inputBox";
  onClick: () => void;
};

export default function AlertBox({ text, type, onClick }: alertBoxProps) {
  const [isAlert, setIsAlert] = useState<boolean>(true);

  const colors = {
    success: "bg-green-100",
    error: "bg-red-100",
    warning: "bg-yellow-100",
    inputBox: "bg-blue-100",
  };

  const textColors = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    inputBox: "text-blue-500",
  };

  function closeAlert() {
    setIsAlert(false);
    onClick();
  }

  return isAlert ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Optional Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Alert Content */}
      <div className={`relative w-96 p-6 rounded-lg shadow-lg ${colors[type]}`}>
        <div className="flex justify-between items-center">
          <span className={`text-lg font-mono ${textColors[type]}`}>
            {text}
          </span>
          <button
            className={`text-2xl font-bold hover:text-black ${textColors[type]} focus:outline-none`}
            onClick={closeAlert}
          >
            ×
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            text="Okay"
            onClick={closeAlert}
            width="fit"
            bgFill={textColors[type]}
          />
        </div>
      </div>
    </div>
  ) : null;
}
