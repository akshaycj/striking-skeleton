import React from "react";
import { Spin } from "antd";

export const PrimaryLoadingIndicator = ({ text, isFullPage }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      minHeight: `${isFullPage ? "100vh" : ""}`,
    }}
  >
    <Spin tip={text} />
  </div>
);
