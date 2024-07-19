import React from "react";

export default function ArrowTop({ size }) {
  return (
    <svg
      width={size ? "20" : "24"}
      height={size ? "20" : "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.92969 9.57031L11.9997 3.50031L18.0697 9.57031"
        stroke="#FF6432"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20.5L12 3.67"
        stroke="#FF6432"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
