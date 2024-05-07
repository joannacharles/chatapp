import React from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import {useToast} from "@chakra-ui/react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {useState} from 'react'
import axios from "axios";
import {useHistory} from 'react-router-dom'

const Signup = () => {
    const [show, setShow] = useState(false);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading]=useState(false)

    const toast= useToast()
    const history=useHistory()

    const handleClick=()=>setShow(!show)
    const submit=async()=>{
      if (!name || !email || !password ) {
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
        
        const {data}= await axios.post("/api/user",{name,email,password}, {
          headers:{
            "Content-type":"application/json"
          }
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        // joanna sheeba
        history.push("/chats")
      }
      catch(e){
        toast({
          title: "Error Occured!",
          description: e.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  return (
    <VStack spacing='6px'>
      <FormControl id='name' isRequired>
        <FormLabel> Name</FormLabel>
        <Input
        onChange={(e)=>setName(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id='email' isRequired>
        <FormLabel> Email</FormLabel>
        <Input
        onChange={(e)=>setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup size="md">
            <Input
            value={password}
            type={show ? "text" : "password"}
            onChange={(e)=>setPassword(e.target.value)}
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
        onClick={submit}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup
