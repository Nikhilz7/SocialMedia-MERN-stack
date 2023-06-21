import {
  PersonAddOutlined,
  Message,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConversations, setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  //filter friend list by conversation list
  const conversations = useSelector((state) => state.user.conversations);

  // const ConversationfriendId = conversations.map((obj) =>
  //   obj.members.filter((member) => member !== _id)
  // );

  // console.log(friends);

  // const filterForMessage = friends.map((friend) =>
  //   friend.id.includes(ConversationFriendId);
  // );
  //check if it is message page
  let isMessagePage = false;
  const currentURI = window.location.pathname;
  if (currentURI.includes("messenger")) {
    isMessagePage = true;
  }

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const addConversation = async () => {
    try {
      const conversationformat = {
        senderId: _id,
        receiverId: friendId,
      };
      const response = await fetch(`http://localhost:3001/conversations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conversationformat),
      });
      const allconvo = await response.json();
      dispatch(setConversations({ conversations: allconvo }));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />

        <Box
          onClick={() => {
            if (!isMessagePage) {
              navigate(`/profile/${friendId}`);
              navigate(0);
            } else {
            }
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isMessagePage ? (
        <Message
          sx={{ fontSize: "25px" }}
          onClick={addConversation}
          // onClick={() => {
          //   // navigate(`/messenger/${user_id}`);
          // }}
        />
      ) : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
