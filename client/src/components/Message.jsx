// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";

const Message = ({ picturePath, Messagetype }) => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  let boxbg = "";
  let alignmessage = "";
  console.log(Messagetype);
  if (Messagetype == "Received") {
    boxbg = palette.primary.light;
    alignmessage = "flex-start";
  } else {
    boxbg = palette.primary.main;
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
            // color={`${palette.primary.main}`}
            variant="h4"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            Lorem, ipsum dolor sit amet consectetur
          </Typography>
        </Box>
      </FlexBetween>
    </Grid>
  );
};
export default Message;
