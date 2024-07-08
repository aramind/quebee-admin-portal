import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DashBoardCard = ({ title, value }) => {
  return (
    <Card sx={{ width: 200, maxWidth: 300 }}>
      <CardActions style={{ justifyContent: "center" }}>{title}</CardActions>
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <Typography color="#333" textAlign="center" fontSize="4rem">
          {value}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "center" }}>
        <Link to={"/questions"} state={{ selectedStatus: title.toLowerCase() }}>
          <Button variant="text" size="small">
            View
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default DashBoardCard;
