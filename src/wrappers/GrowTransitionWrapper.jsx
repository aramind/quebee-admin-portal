import { Grow } from "@mui/material";
import React from "react";

const GrowTransitionWrapper = ({
  children,
  transformOrigin = "50% 0 0",
  timeout = 1000,
}) => {
  const growProps = {
    in: true,
    style: { transformOrigin },
    timeout,
  };

  return <Grow {...growProps}>{children}</Grow>;
};

export default GrowTransitionWrapper;
