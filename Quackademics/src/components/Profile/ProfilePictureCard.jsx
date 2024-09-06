import React, { useState } from "react";
import { Card, ImageList, ImageListItem } from "@mui/material";
import { profilePics } from "../../util/Account.util";

const ProfilePictureCard = ({ setProfilePicture }) => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageSelect = (src) => {
    setSelectedImage(src);
    setProfilePicture(src);
  };

  return (
    <Card sx={{ padding: 2 }}>
      <div>Select a profile picture!</div>
      <ImageList
        sx={{ height: "fit-content", width: "fit-content" }}
        cols={3}
        rowHeight={164}
      >
        {profilePics.map((pfp) => (
          <ImageListItem
            key={pfp.pfpNum}
            sx={{
              width: "150px",
              height: "100px",
              cursor: "pointer",
              border: selectedImage === pfp.src ? "3px solid blue" : "none",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            onClick={() => handleImageSelect(pfp.src)}
          >
            <img
              src={pfp.src}
              alt={`Profile ${pfp.pfpNum}`}
              style={{
                width: "auto",
                height: "auto",
                display: "block",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
};

export default ProfilePictureCard;

