import { Stack } from "@mui/material";
import React from "react";
import SimpleLabelValue from "../SimpleLabelValue";

const DeleteDialogContent = ({ data }) => {
  return (
    <>
      {data && (
        <Stack spacing={1}>
          {Object.entries(data).map(([key, value]) => {
            if (key.trim().length > 1) {
              return (
                <SimpleLabelValue label={key?.toUpperCase()} values={value} />
              );
            } else return <br />;
          })}
        </Stack>
      )}
    </>
  );
};

export default DeleteDialogContent;
