// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SetCurrentConversation } from "state";
// import { useNavigate } from "react-router-dom";
// import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Conversation = ({ convo, friendId }) => {
  //   const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  //   const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  // const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const currentconversation = useSelector(
    (state) => state.user.currentconversation
  );
  const { palette } = useTheme();
  const main = palette.neutral.main;
  // console.log(convo);
  // console.log(friendId);

  //   const primaryLight = palette.primary.light;
  //   const primaryDark = palette.primary.dark;
  //   const medium = palette.neutral.medium;

  // console.log(currentconversation);
  const friend = friends.find((obj) => obj._id === friendId[0]);

  //   if (!friend) return;
  // console.log(friend);
  // const name = "";
  const name = friend.firstName + " " + friend.lastName;
  // const picturePath = "";
  const picturePath = friend.picturePath;
  const setCoversationId = async () => {
    await dispatch(SetCurrentConversation({ currentconversation: convo._id }));
  };

  const handleClick = () => {
    setCoversationId();
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />

        <Box onClick={handleClick}>
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
          {/* <Typography color={medium} fontSize="0.75rem">
            subtitle
          </Typography> */}
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Conversation;
