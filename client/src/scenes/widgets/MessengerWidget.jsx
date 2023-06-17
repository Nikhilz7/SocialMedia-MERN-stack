import { Box, useTheme, useMediaQuery, Grid } from "@mui/material";

import { useState, useEffect } from "react";
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
  const [newMessage, setNewMessage] = useState("");

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const currentconversation = useSelector(
    (state) => state.user.currentconversation
  );
  const conversations = useSelector((state) => state.user.conversations);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const Messagetype = "Received";

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
  }, [currentconversation, messages]);

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
        {conversations !== undefined ? (
          <>
            {/* Render Message component by mapping  */}
            {messages.map((m) => (
              <Message senderId={m.sender} message={m} own={m.sender === _id} />
            ))}
          </>
        ) : (
          <span>
            SELECT ANY CONVERSATION FROM
            {/* <Message picturePath={picturePath} Messagetype="sent" />
            <Message picturePath={picturePath} Messagetype={Messagetype} /> */}
          </span>
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
