import {
  Autocomplete,
  Chip,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormInputLabel from "../form/FormInputLabel";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import sortObjectsByProp from "../../utils/sortObjectsByProp";
import { red, teal } from "@mui/material/colors";
import DangerBtn from "../buttons/DangerBtn";

// NOTE: options should be an object with property named title
// so that getOptions title will work
const ContMultiSelectToTable = ({
  objOptionsWithTitles,
  nameForController,
  label,
  height = "280px",
}) => {
  const { setValue, control } = useFormContext();

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (control?._options?.defaultValues) {
      setSelected(control?._options?.defaultValues?.[nameForController] || []);
    }
  }, [
    control?._options?.defaultValues,
    nameForController,
    setSelected,
    setValue,
  ]);

  const handleRemove = (itemToRemove) => {
    const updatedSelected = selected?.filter(
      (selected) => selected?.title !== itemToRemove?.title
    );
    setSelected(updatedSelected);
    setValue(nameForController, updatedSelected, {
      shouldDirty: true,
    });
  };

  const handleClear = () => {
    setSelected([]);
  };

  // console.log(objOptionsWithTitles);
  return (
    <Controller
      control={control}
      name={nameForController}
      render={({ field }) => (
        <Stack height={height} width="100%">
          <Stack spacing={0.3}>
            <FormInputLabel label={label} />
            <Autocomplete
              {...field}
              size="small"
              fullWidth
              multiple
              options={sortObjectsByProp(objOptionsWithTitles, "title")}
              getOptionLabel={(option) => option?.title}
              filterSelectedOptions
              value={selected || []}
              onChange={(e, value) => {
                setSelected(value);
                setValue(nameForController, value, {
                  shouldDirty: true,
                });
              }}
              groupBy={(option) => option?.title?.[0].toUpperCase()}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select here..." />
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
          <Stack sx={localStyles.tableContainer}>
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
          <Stack direction="row" justifyContent="end">
            {selected.length > 1 && (
              <DangerBtn label="Clear All" onClick={handleClear} />
            )}
          </Stack>
        </Stack>
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
    overflowY: "auto",
    height: "200px",
    my: "1rem",
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
