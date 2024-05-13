import {
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
const ControlledAutocompleteV2 = ({
  control,
  name = "",
  label = "",
  subjects,
}) => {
  const [topics, setTopics] = useState([]);
  //   const [selectedSubject, setSelectedSubject] = useState("");
  console.log("SUBJECTS", subjects);

  //   console.log(selectedSubject);
  console.log("TOPICS", topics);
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Autocomplete
            fullWidth
            {...field}
            value={field.value}
            // onChange={(e, selected) => field.onChange(selected)}
            onChange={(e, selected) => {
              // Find the selected subject from the subjects array
              const selectedSubject = subjects.find(
                (s) => s.title === selected
              );
              if (selectedSubject) {
                // Update topics state with the topics of the selected subject
                setTopics(selectedSubject.topics || []);
              } else {
                setTopics([]);
              }
              field.onChange(selected); // Propagate selected value to the form
            }}
            options={subjects.map((s) => s.title)}
            //   getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label={label}
                variant="standard"
              />
            )}
          />
        )}
      />
      <Typography sx={{ m: 0 }}>Topics</Typography>
      {/* <ul>{topics && topics.map((t) => <p key={t}>{t.title}</p>)}</ul> */}

      <List sx={{ padding: 0 }}>
        {topics &&
          topics.map((topic) => {
            return (
              <ListItem sx={{ padding: 0 }}>
                <ListItemIcon>
                  <AutoStoriesOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={topic.title} />
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

export default ControlledAutocompleteV2;
