import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Conversation from "components/Conversation";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setConversations } from "state";
import { BASE_URL } from "config";

const ConversationListWidget = ({ userId }) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const conversations = useSelector((state) => state.user.conversations);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Sets conversations of the UserLoggedIn
  const getCoversations = async () => {
    try {
      const convos = await fetch(`${BASE_URL}/conversations/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const convodata = await convos.json();
      dispatch(setConversations({ conversations: convodata }));
      // console.log(convodata);
    } catch (error) {
      console.log("Error Occured");
    }
  };

  useEffect(() => {
    getCoversations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Conversation List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {conversations !== undefined ? (
          conversations.map((convo) => (
            <Conversation
              key={convo._id}
              convo={convo}
              friendId={convo.members.filter((member) => member !== userId)}
            />
          ))
        ) : (
          <></>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default ConversationListWidget;
