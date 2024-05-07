import React from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";

import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

import {useToast} from "@chakra-ui/react"

const Login = () => {
    const [show, setShow] = useState(false);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading]=useState(false)

    const toast= useToast()
   const history=useHistory()
    //const navigate=useNavigate()
    const handleClick=()=>setShow(!show)
    const submitHandler=async()=>{
      if ( !email || !password ) {
        toast({
          title: "Missing required fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      try{
        console.log("just tryna login bro")
        const {data}= await axios.post("/api/user/login",{email,password}, {
          headers:{
            "Content-type":"application/json"
          }
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        history.push("/chats")
      }
      catch(e){
        console.log("sed :((")
        toast({
          title: "Error Occured!",
          description: e.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    }

  return (
    <VStack spacing="10px">
    <FormControl id="email" isRequired>
      <FormLabel>Email Address</FormLabel>
      <Input
        value={email}
        type="email"
        placeholder="Enter Your Email Id..."
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          placeholder="Enter your password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <Button
      colorScheme="pink"
      width="100%"
      style={{ marginTop: 15 }}
      onClick={submitHandler}
    >
      Login
    </Button>
    
  </VStack>
  )
}

export default Login
