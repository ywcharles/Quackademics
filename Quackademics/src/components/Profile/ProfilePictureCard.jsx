import { Card, ImageList, ImageListItem } from "@mui/material";
import { profilePics } from "../../util/Account.util";

const ProfilePictureCard = () => {
  return (
    <Card>
      Select a profile picture!
      <ImageList
        sx={{ width: "fit-content", height: "fit-content" }}
        cols={6}
        rowHeight={164}
      >
        {profilePics.map((pfp) => (
          <ImageListItem sx={{ width: "90px" }} key={pfp.pfpNum}>
            <img src={pfp.src} />
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
};

export default ProfilePictureCard;
