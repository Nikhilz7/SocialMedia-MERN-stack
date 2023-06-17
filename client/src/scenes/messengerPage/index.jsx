import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import ConversationListWidget from "scenes/widgets/ConversationListWidget";
import MessengerWidget from "scenes/widgets/MessengerWidget";

const MessengerPage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="left"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" /> */}

          <ConversationListWidget userId={userId} />
        </Box>
        <Box width="100%">
          <MessengerWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default MessengerPage;
