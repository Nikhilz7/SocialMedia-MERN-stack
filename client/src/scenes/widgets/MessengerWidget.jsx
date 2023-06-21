import { Box, useTheme, Typography, useMediaQuery, Grid } from "@mui/material";
import ScrollToBottom, {
  useScrollToBottom,
  useSticky,
} from "react-scroll-to-bottom";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import Message from "components/Message";
import MessageSenderWidget from "./MessageSenderWidget";

const MessengerWidget = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [currentChat, setCurrentChat] = useState("set");
  const [messages, setMessages] = useState([]);

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const currentconversation = useSelector(
    (state) => state.user.currentconversation
  );
  const conversations = useSelector((state) => state.user.conversations);

  const messages_new = useSelector((state) => state.user.messages);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();

  // const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const getMessagesindividually = async () => {
    const response = await fetch(
      `http://localhost:3001/messages/${currentconversation}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log(data);
    setMessages(data);
  };

  useEffect(() => {
    getMessagesindividually();
    // ScrollToBottom.useScrollToEnd();
  }, [currentconversation, messages_new]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {/* if No convo selected */}
      {/* MESSAGES */}

      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: 600,
          //   overflow: "hidden",
          //   overflowY: "scroll",

          overflow: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#555",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#24248f",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#3333cc",
          },
          //   justifyContent: "flex-end",
          //   # DO NOT USE THIS WITH 'scroll'
        }}
      >
        {messages.length > 0 ? (
          <>
            {/* Render Message component by mapping  */}
            {messages.map((m) => (
              <ScrollToBottom>
                <Message
                  senderId={m.sender}
                  message={m}
                  own={m.sender === _id}
                />
                {!sticky && (
                  <button onClick={scrollToBottom}>
                    Click me to scroll to bottom
                  </button>
                )}
              </ScrollToBottom>
            ))}
          </>
        ) : (
          <Typography
            color={`${palette.primary.main}`}
            variant="h2"
            fontWeight="500"
            sx={{
              textAlign: "center",
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            Select a coversation from the list!
          </Typography>
        )}
      </Box>
      {/* MESSAGE SENDER  */}

      <Grid
        container
        direction="column-reverse"
        justifyContent="flex-end"
        alignItems="stretch"
        mt="1rem"
      >
        {/* sender component */}
        <MessageSenderWidget />
      </Grid>
    </Box>
  );
};

export default MessengerWidget;
