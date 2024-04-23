import { Chip, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";

const Value = ({ values, inChip }) => {
  return (
    <Stack direction="row" spacing={1}>
      {values && Array.isArray(values) ? (
        values.map((value, index) => (
          <Fragment key={value}>
            {inChip ? (
              <Chip
                label={value}
                size="small"
                sx={{
                  minWidth: "50px",
                  bgcolor: "tertiary.lightest",
                  fontFamily: "Inter",
                  color: "black",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                }}
              />
            ) : (
              <Typography>
                {value}
                {index !== values.length - 1 && ","}
              </Typography>
            )}
          </Fragment>
        ))
      ) : (
        <Typography>{values}</Typography>
      )}
    </Stack>
  );
};

export default Value;
