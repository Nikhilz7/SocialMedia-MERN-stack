import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { BASE_URL } from "config";

const Message = ({ senderId, own, message }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;
  const [friendData, setFriendData] = useState([]);

  // console.log(formattedTime);
  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/users/${senderId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFriendData(data);
  };

  useEffect(() => {
    getUser();
  }, [senderId]);

  const picturePath = friendData.picturePath;
  let boxbg = "";
  let alignmessage = "";
  if (!own) {
    boxbg = palette.background.alt;
    alignmessage = "flex-start";
  } else {
    boxbg = palette.neutral.light;
    alignmessage = "flex-end";
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems={`${alignmessage}`}
    >
      <FlexBetween gap="1rem">
        <Box
          height="80%"
          display="flex"
          backgroundColor={`${boxbg}`}
          //   alignItems="right" //sender reciever adjust left right
          gap="1rem"
          borderRadius="20px"
          mt="1rem"
          p="1rem"
        >
          <UserImage image={picturePath} size="55px" />
          <Typography
            color={`${palette.neutral.main}`}
            variant="h5"
            fontWeight="500"
            // sx={{
            //   "&:hover": {
            //     color: palette.primary.dark,
            //     cursor: "pointer",
            //   },
            // }}
          >
            {message.text}
          </Typography>
        </Box>
      </FlexBetween>
      <Typography
        variant="subtitle2"
        // display="flex"
        // justifyContent="flex-end"
        // alignItems="flex-end"
      >
        {format(message.createdAt)}
      </Typography>
    </Grid>
  );
};
export default Message;
