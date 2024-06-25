import { 
    Box, 
    Button,
    FormControl,
    FormLabel,
    Text,
    Input,
    Flex,
    Heading,
    useToast
 } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../modules/fetchData";
import Navbar from "../component/Navbar";


const Register = () => {
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const toast = useToast();
    const navigate = useNavigate();

   async function registerHandler (ev) {
        ev.preventDefault();
        try {
            if(password !== confirmPassword) return;
            const response = await registerUser(
                ev.target.name.value,
                ev.target.email.value,
                ev.target.password.value
            );
            toast({
                title: "Success",
                description: 'Register Success',
                status: "loading",
                duration : 3000,
                isClosable : true
              });
            navigate('/');
        } catch(err) {
            console.log(err);
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });

        }
    };

    return(
        <Flex flexDirection={'column'}>
            <Navbar/>
            <Box w="50%" py={10} px={24} mx="auto" my={'3rem'} bg={'teal'} rounded={'5px'}>
                <Heading textAlign={'center'}>REGISTER</Heading>
                <form id='form-register' onSubmit={(ev)=>{
                    registerHandler(ev);
                }}>
                    <FormControl py={5} isRequired>
                        <FormLabel fontSize={'large'}>Name</FormLabel>
                        <Input type='text' name='name'  w="100%" h="32px"/>      
                    </FormControl>
                    <FormControl py={5} isRequired>
                        <FormLabel fontSize={'large'}>Email address</FormLabel>
                        <Input type='email' name='email'  w="100%" h="32px"/>      
                    </FormControl>
                    <FormControl py={5}  isRequired>
                        <FormLabel fontSize={'large'}>Password</FormLabel>
                        <Input type='password' name='password' w="100%" h="32px" onChange={(ev) => {
                            setPassword(ev.target.value);
                        }}/>      
                    </FormControl>
                    <FormControl py={5} mb={'20px'} isRequired>
                        <FormLabel fontSize={'large'}>Confirm Password</FormLabel>
                        <Input type='password' name='confirmPassword' w="100%" h="32px" onChange={(ev) => {
                            setConfirmPassword(ev.target.value);
                        }}/>
                        {password !== confirmPassword && (
                        <Text fontSize="smaller" color="black">
                            The password does not match
                        </Text>
                        )}
                    </FormControl>
                    <Button type='submit' colorScheme='blue'>Register</Button>
                </form>
            </Box>
        </Flex>
    )
}

export default Register;