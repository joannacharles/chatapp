import React from 'react'
import { Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,} from '@chakra-ui/react'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import {useHistory} from 'react-router'
import {useEffect} from 'react'



function Home() {

  const history=useHistory()

  useEffect(()=>{
      const userInfo=JSON.parse(localStorage.getItem("userInfo"))
      //setUser(userInfo)
      if(userInfo){
         history.push("/chats")
      }
  //},[history])
},[history])
  return (
    <Container maxW='xl' centerContent>
      <Box
       display="flex"
       justifyContent="center"
       p={3}
       bg="white"
       w="100%"
       m="40px 0 15px 0"
       borderRadius="lg"
       borderWidth="1px"
      >
        <Text fontSize="4xl" >Chat-App</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs isFitted variant="soft-rounded" colorScheme='pink'>
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign-Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
