import { Tooltip, Zoom } from "@mui/material";
import React from "react";

const TooltipWrapper = ({ children, title }) => {
  return (
    <Tooltip
      placement="left-start"
      TransitionComponent={Zoom}
      title={title}
      enterDelay={100}
      leaveDelay={100}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -25],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipWrapper;
