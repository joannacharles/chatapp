import React from 'react'
import {useState} from 'react' 
import {useHistory} from 'react-router-dom' 

import axios from "axios";
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserItem/UserListItem'
import {ChatState} from '../../context/ChatProvider'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Input } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";

import { Tooltip } from "@chakra-ui/tooltip";
import { Box, Text } from "@chakra-ui/layout";
import { BellIcon,ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import {getSender} from '../../config/ChatLogics'
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user,setSelectedChat,chats,setChats, notification, setNotification}=ChatState()
  const history=useHistory()
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler=()=>{
    localStorage.removeItem("userInfo")
   history.push("/")
  }
  const handleSearch=async ()=>{
    if (!search) {
      toast({
        title: "Enter search item",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;

  }

  try{
    setLoading(true)
    //console.log("jojo",user.email,search)
    const config = {
      headers: {
        Authorization: `Bearer ${user.email}`,
      },
    }
    const { data } = await axios.get(`/api/user?search=${search}`,config);
    console.log(data)
    setLoading(false)
    setSearchResult(data)
  }
  catch(e){
    toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
    })
  }
}

const accessChat=async (userId)=>{
  try{
    setLoadingChat(true)
    const {data}=await axios.post('/api/chat',{userId},{headers: {"Content-type":"application/json", Authorization: `Bearer ${user.email}`,},})
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }



  return (
    <>
    <Box
        display='flex'
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost" onClick={onOpen}>
        <i className="fas fa-search"></i>
          <Text display={{base:"none",md:"flex"}} px={4}>
            Search
          </Text>
        </Button>
      </Tooltip>
      <Text fontSize="2xl">
        ChatApp
      </Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <div>{notification.length}</div>
            <BellIcon fontSize="2x1" />
          </MenuButton>
          <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
              
              {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon/>}>
            <Avatar size='sm' cursor='pointer' name={user.name} bg='pink.500'/>
          </MenuButton>
          <MenuList>
            <MenuItem>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

          <DrawerBody>
          <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email jojo"
                mr={2}
                value={search}
                onChange={(e) =>
                  { 
                    console.log("search has been set jj")
                    setSearch(e.target.value)
                    console.log(search)
                  }
                    
                  }
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (

              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}

          </DrawerBody>
        </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideDrawer
