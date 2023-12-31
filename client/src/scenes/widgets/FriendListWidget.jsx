import {
  Box,
  Typography,
  InputBase,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { Search } from "@mui/icons-material";
import { BASE_URL } from "config";

const FriendListWidget = ({ userId }) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const conversations = useSelector((state) => state.user.conversations);

  const [searchField, setSearchField] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friends);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getFriends = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  //check if it is message page
  let isMessagePage = false;
  const currentURI = window.location.pathname;
  if (currentURI.includes("messenger")) {
    isMessagePage = true;
  }
  let filteredData = [];
  if (isMessagePage && conversations != undefined) {
    //filter friend list by conversation list
    const ConversationfriendId = conversations.map((obj) =>
      obj.members.filter((member) => member !== userId)
    );

    filteredData = friends.filter((item) => {
      return !ConversationfriendId.some((arr) => arr.includes(item._id));
    });
  }

  // Searchfield

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newFilteredFriends = friends.filter((friend) => {
      const namefind = friend.firstName + " " + friend.lastName;
      return namefind.toLocaleLowerCase().includes(searchField);
    });
    setFilteredFriends(newFilteredFriends);
  }, [searchField, friends]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {!isMessagePage && isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." onChange={onSearchChange} />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
        {isMessagePage
          ? filteredData.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            ))
          : filteredFriends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
