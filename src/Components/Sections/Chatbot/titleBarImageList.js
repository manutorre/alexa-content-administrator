import * as React from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const TitlebarImageList = ({ item }) => {
  const onButtonClicked = (e) => {
    alert(e.currentTarget.value);
  };

  console.log({ item });

  return (
    <ImageList rowHeight={"auto"}>
      <ImageListItem>
        <img
          src={item.img}
          // srcSet={item.img}
          alt={item.title}
          style={{ width: 300, height: 400 }}
          //   loading="lazy"
        />
        <ImageListItemBar
          title={item.title}
          subtitle={item.subtitle}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${item.title}`}
              onClick={onButtonClicked}
              value={item.title}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </ImageList>
  );
};

export default TitlebarImageList;
