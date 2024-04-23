import { Chip, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";

const LabelledText = ({ label, values, inChip }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography>{label.toUpperCase()}:</Typography>
      {values && Array.isArray(values) ? (
        values.map((value, index) => (
          <Fragment key={value}>
            {inChip ? (
              <Chip label={value} size="small" sx={{ minWidth: "50px" }} />
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

export default LabelledText;
