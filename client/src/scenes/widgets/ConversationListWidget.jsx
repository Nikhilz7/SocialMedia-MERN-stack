import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Conversation from "components/Conversation";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setConversations } from "state";

const ConversationListWidget = ({ userId }) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const conversations = useSelector((state) => state.user.conversations);

  // const [searchField, setSearchField] = useState("");

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // Sets conversations of the UserLoggedIn
  const getCoversations = async () => {
    try {
      const convos = await fetch(
        `http://localhost:3001/conversations/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const convodata = await convos.json();
      dispatch(setConversations({ conversations: convodata }));
      // console.log(convodata);
    } catch (error) {
      console.log("Error Occured");
    }
  };
  //useEffect to get friends who had convo with
  // if (conversations) {

  // useEffect(() => {
  //   const friendId = conversations.members.find((m) => m !== userId);

  //   const getUser = async () => {
  //     try {
  //       const res = await axios("/users?userId=" + friendId);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

  //   const getFriends = async () => {
  //     const response = await fetch(
  //       `http://localhost:3001/users/${userId}/friends`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const data = await response.json();
  //     dispatch(setFriends({ friends: data }));
  //   };

  // Searchfield

  // const onSearchChange = (event) => {
  //   const searchFieldString = event.target.value.toLocaleLowerCase();
  //   // console.log(searchFieldString);
  //   setSearchField(searchFieldString);
  // };

  useEffect(() => {
    getCoversations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   const newFilteredFriends = friendsId.filter((friend) => {
  //     const namefind = friend.firstName + " " + friend.lastName;
  //     return namefind.toLocaleLowerCase().includes(searchField);
  //   });
  //   setFilteredFriends(newFilteredFriends);
  // }, [searchField, conversations]); // eslint-disable-line react-hooks/exhaustive-deps

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
        {/* Search convo */}
        {/* {isNonMobileScreens && (
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
        )} */}
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
