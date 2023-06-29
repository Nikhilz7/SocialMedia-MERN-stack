import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetMessages } from "state";
import { BASE_URL } from "config";

const MessageSenderWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const [newMessage, setNewMessage] = useState("");

  const currentconversation = useSelector(
    (state) => state.user.currentconversation
  );

  const handlePost = async () => {
    const messageformat = {
      conversationId: currentconversation,
      sender: _id,
      text: newMessage,
    };
    const response = await fetch(`${BASE_URL}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageformat),
    });
    const sentmessage = await response.json();
    // console.log(sentmessage);
    dispatch(SetMessages({ messages: sentmessage }));
    // setImage(null);
    setNewMessage("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        {/* <UserImage image={picturePath} /> */}
        <InputBase
          placeholder="What's on your mind?..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem">
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={newMessage.trim() === ""}
          onClick={handlePost}
          sx={{
            width: "10rem",
            backgroundColor: palette.primary.light,
            borderRadius: "3rem",
          }}
        >
          <Typography color={palette.primary.dark}>Send</Typography>
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MessageSenderWidget;
