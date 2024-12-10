"use client";

import { useState } from "react";
import Button from "./Button";

type alertBoxProps =
  | {
      text: string;
      type: "success" | "error" | "warning";
      onClick: () => void;
    }
  | {
      text: string;
      type: "inputBox";
      onClick: () => void;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };


export default function AlertBox(props: alertBoxProps) {
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

  const closeAlert = () => {
    setIsAlert(false);
    props.onClick();
  };

  return isAlert ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Optional Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Alert Content */}
      <div className={`relative w-96 p-6 rounded-lg shadow-lg ${colors[props.type]}`}>
        <div className="flex justify-between">
          <span className={`text-lg font-mono ${textColors[props.type]}`}>
            {props.type !== "inputBox" ? (
              props.text
            ) : (
              <div className="flex-col flex justify-evenly">
                <div className="">
                  {props.text}
                </div>
                <input
                  type="password"
                  className="w-full p-2 my-3 border-b-2 border-zinc-300 focus:outline-none rounded-lg"
                  onChange={props.onChange} // Will only exist when type is "inputBox"
                />
                <Button
                  text="Make Payment"
                  onClick={props.onClick}
                  width="fit"
                  bgFill={textColors[props.type]}
                />
              </div>
            )}
          </span>
          <button
            className={`text-3xl font-bold font-mono hover:text-black ${textColors[props.type]} focus:outline-none flex flex-col`}
            onClick={closeAlert}
          >
            ×
          </button>
        </div>
        {props.type !== "inputBox" && (
          <div className="mt-4 flex justify-end">
            <Button
              text="Okay"
              onClick={closeAlert}
              width="fit"
              bgFill={textColors[props.type]}
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
}
