import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

const DashBoardCard = ({ title, value }) => {
  return (
    <Card sx={{ width: 200, maxWidth: 300 }}>
      <CardActions style={{ justifyContent: "center" }}>{title}</CardActions>
      <Divider />
      <CardContent>
        <Typography variant="h1" color="#333">
          {value}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "center" }}>
        <Button variant="text" size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default DashBoardCard;
