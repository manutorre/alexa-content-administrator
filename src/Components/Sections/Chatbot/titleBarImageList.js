import * as React from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const TitlebarImageList = ({ carousel }) => {
  const onButtonClicked = (e) => {
    alert(e.currentTarget.value);
  };
  return (
    <ImageList rowHeight={"auto"} cols={3} sx={{}}>
      {carousel?.length > 0 &&
        carousel.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
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
        ))}
    </ImageList>
  );
};

export default TitlebarImageList;
