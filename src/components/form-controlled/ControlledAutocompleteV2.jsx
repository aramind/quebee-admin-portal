import {
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
const ControlledAutocompleteV2 = ({
  control,
  name = "",
  label = "",
  subjects,
}) => {
  const [selectedTitle, setSelectedTitle] = useState("  ");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const selectedSubject = subjects.find((s) => s.title === selectedTitle);
    setTopics(selectedSubject?.topics || []);
  }, [selectedTitle, subjects]);

  return (
    <>
      <Controller
        // control={control}
        name={name}
        render={({ field }) => (
          <Autocomplete
            fullWidth
            {...field}
            inputValue={selectedTitle}
            onInputChange={(e, newTitle) => {
              setSelectedTitle(newTitle);
            }}
            value={
              subjects.find((subject) => subject.title === field.value) || null
            }
            onChange={(e, selected) => {
              // const selectedSubject = subjects.find(
              //   (s) => s.title === selected?.title
              // );
              // if (selectedSubject) {
              //   setTopics(selectedSubject.topics || []);
              // } else {
              //   setTopics([]);
              // }
              field.onChange(selected?.title || "");
            }}
            options={subjects}
            getOptionLabel={(option) => option.title || ""}
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
          topics.map((topic, i) => {
            return (
              <ListItem key={i} sx={{ padding: 0 }}>
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
