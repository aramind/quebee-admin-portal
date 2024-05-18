import {
  Autocomplete,
  Box,
  Button,
  Chip,
  ListSubheader,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useTopicReq from "../../hooks/api/useTopicReq";
import useApiGet from "../../hooks/api/useApiGet";
import FormInputLabel from "../../components/form/FormInputLabel";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";

const TopicSelector = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { setValue } = useFormContext();
  const theme = useTheme();
  const { fetchTopics } = useTopicReq();

  const { data: topicsList } = useApiGet(
    ["topics"],
    () => fetchTopics({ params: "/trimmed" }),
    {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: Infinity,
    }
  );

  const handleRemoveTopic = (topicToDelete) => {
    const updatedTopics = selectedTopics.filter(
      (topic) => topic?.title !== topicToDelete?.title
    );

    setSelectedTopics(updatedTopics);
    setValue("topics", updatedTopics);
  };
  return (
    <Controller
      name="topics"
      render={({ field }) => (
        <>
          {/* <Typography>Topic(s)</Typography> */}
          <Stack spacing={0.3} flex={1}>
            <FormInputLabel label="Topic(s)" />
            <Autocomplete
              {...field}
              size="small"
              fullWidth
              multiple
              options={
                topicsList?.sort((a, b) => a.title.localeCompare(b.title)) || []
              }
              getOptionLabel={(topic) => topic?.title}
              filterSelectedOptions
              value={selectedTopics || []}
              onChange={(e, value) => {
                setSelectedTopics(value);
                setValue("topics", value);
              }}
              groupBy={(topic) => topic.title[0].toUpperCase()}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select topic here..." />
              )}
              renderGroup={(params) => (
                <li key={params.key}>
                  <ListSubheader disableSticky>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.primary.dark,
                      }}
                    >
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
                ...localStyle.autocomplete,
                ...localStyle.chipOnBox,
              }}
            />
            <Box height="8px" />
            <Stack
              // spacing={1}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                overflowY: "auto",
              }}
              height="200px"
            >
              {selectedTopics.length > 0 &&
                selectedTopics.map((topic, i) => (
                  <Chip
                    // size="small"
                    key={i}
                    onDelete={() => handleRemoveTopic(topic)}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AutoStoriesTwoToneIcon
                          fontSize="small"
                          color="primary"
                        />
                        <Typography>{topic.title}</Typography>
                      </Stack>
                    }
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      bgcolor: "transparent",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      "&:hover": {
                        bgcolor: teal[50],
                      },
                      "& .MuiChip-label": {
                        alignItems: "center",
                        // outline: "1px solid red",
                      },
                    }}
                  />
                ))}
            </Stack>
            <Box height="8px" />
            {selectedTopics.length > 0 && (
              <Button variant="text" onClick={() => setSelectedTopics([])}>
                Clear All
              </Button>
            )}
          </Stack>
        </>
      )}
    />
  );
};

export default TopicSelector;

// localStyles
const localStyle = {
  box: { display: "flex", flexWrap: "wrap", gap: 0.5 },
  autocomplete: {
    "& .MuiChip-root:hover": {
      bgcolor: red[100],
      color: grey[900],
      borderColor: red[100],
      cursor: "default",
    },
    "& .MuiChip-deleteIconColorDefault.MuiChip-deleteIconFilledColorDefault:hover":
      {
        color: red["A200"],
      },
  },
  chipOnBox: {
    "& .MuiChip-label": {
      // textTransform: textTransform || "",
      fontFamily: (theme) => theme.typography.chip,
      color: "black",
      fontSize: { xs: "0.8rem", md: "0.9rem" },
    },
    "& .MuiChip-root": {
      // bgcolor: blue[200],

      // bgcolor: (theme) => theme.palette.tertiary.lightest,
      display: "none",
    },
    "& .MuiInputBase": {
      height: "725px",
      color: red[500],
    },
  },
};
