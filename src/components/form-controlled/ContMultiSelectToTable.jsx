import {
  Autocomplete,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormInputLabel from "../form/FormInputLabel";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import sortObjectsByProp from "../../utils/sortObjectsByProp";
import { grey, red, teal } from "@mui/material/colors";
import DangerBtn from "../buttons/DangerBtn";

// NOTE: options should be an object with property named title
// so that getOptions title will work
const ContMultiSelectToTable = ({
  objOptionsWithTitles,
  nameForController,
  label,
}) => {
  const [selected, setSelected] = useState([]);
  const { setValue } = useFormContext();

  const handleRemove = (itemToRemove) => {
    const updatedSelected = selected?.filter(
      (selected) => selected?.title !== itemToRemove?.title
    );
    setSelected(updatedSelected);
    setValue(nameForController, updatedSelected);
  };

  const handleClear = () => {
    setSelected([]);
  };

  // console.log(objOptionsWithTitles);
  return (
    <Controller
      name={nameForController}
      render={({ field }) => (
        <>
          <Stack flex={1}>
            <FormInputLabel label={label} />
            <Autocomplete
              {...field}
              size="small"
              fullWidth
              multiple
              options={sortObjectsByProp(objOptionsWithTitles, "title")}
              getOptionLabel={(topic) => topic?.title}
              filterSelectedOptions
              value={selected || []}
              onChange={(e, value) => {
                setSelected(value);
                setValue(nameForController, value);
              }}
              groupBy={(option) => option?.title?.[0].toUpperCase()}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select topic here..." />
              )}
              renderGroup={(params) => (
                <li key={params.key}>
                  <ListSubheader disableSticky>
                    <Typography variant="h6" color="primary">
                      {params.group}
                    </Typography>
                  </ListSubheader>
                  <ul
                    style={{
                      paddingLeft: "12px",
                    }}
                  >
                    {params.children}
                  </ul>
                </li>
              )}
              sx={{
                ...localStyles.chipOnBox,
                ...localStyles.autoComplete,
              }}
            />
          </Stack>
          <Stack
            sx={localStyles.tableContainer}
            my={1.5}
            // className="outlined"
            boxSizing="border-box"
          >
            {selected?.length > 0 &&
              selected.map((item, i) => (
                <Chip
                  key={i}
                  onDelete={() => handleRemove(item)}
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AutoStoriesTwoToneIcon
                        fontSize="small"
                        color="primary"
                      />
                      <Typography>{item?.title}</Typography>
                    </Stack>
                  }
                  sx={localStyles.listItemOnTable}
                />
              ))}
          </Stack>

          {selected.length > 1 && (
            <Stack direction="row" justifyContent="end" pr={1}>
              <DangerBtn label="Clear All" onClick={handleClear} />
            </Stack>
          )}
        </>
      )}
    />
  );
};

export default ContMultiSelectToTable;

const localConst = {
  hoverBg: teal[50],
};

const localStyles = {
  listItemOnTable: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    bgcolor: "transparent",
    fontSize: "1rem",
    borderRadius: "5px",
    "&:hover": {
      bgcolor: localConst.hoverBg,
    },
  },
  tableContainer: {
    display: "flex",
    alignItems: "flex-start",
    overFlowY: "auto",
    height: "240px",
  },
  optionsGroupHead: {
    color: (theme) => theme.palette.primary.dark,
  },
  indentedList: {
    pl: "12px",
    "&:hover": {
      bgcolor: localConst?.hoverBg,
    },
  },
  chipOnBox: {
    "& .MuiChip-label": {
      fontFamily: (theme) => theme.typography.chip,
      color: "black",
      fontSize: { xs: "0.8rem", md: "0.9rem" },
    },
    "& .MuiChip-root": {
      display: "none",
    },
    "& .MuiInputBase": {
      height: "725px",
      color: red[500],
    },
  },
  autoComplete: {
    "& .MuiAutocomplete-clearIndicator": {
      display: "none",
    },
  },
};
