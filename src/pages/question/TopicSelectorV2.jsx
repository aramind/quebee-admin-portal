import {
  Autocomplete,
  ListSubheader,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import React from "react";
import { Controller } from "react-hook-form";
import useTopicReq from "../../hooks/api/useTopicReq";
import useApiGet from "../../hooks/api/useApiGet";
import FormInputLabel from "../../components/form/FormInputLabel";

const TopicSelectorV2 = ({ control }) => {
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

  return (
    <Controller
      name="topics"
      control={control}
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
              value={field.value}
              onChange={(e, newValue) => {
                field.onChange(newValue);
              }}
              groupBy={(topic) => topic.title[0].toUpperCase()}
              renderInput={(params) => <TextField {...params} />}
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
          </Stack>
        </>
      )}
    />
  );
};

export default TopicSelectorV2;

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
      bgcolor: (theme) => theme.palette.tertiary.lightest,
    },
    "& .MuiInputBase": {
      height: "725px",
      color: red[500],
    },
  },
};
