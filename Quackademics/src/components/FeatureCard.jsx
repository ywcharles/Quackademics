import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const FeatureCard = (props) => {
  return (
    <div>
      <Card sx={{ width:"50vh", height:"50vh" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.children}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={props.route}>{props.title}</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default FeatureCard;
