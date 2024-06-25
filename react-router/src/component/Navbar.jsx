import {
    Button,
    Box,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
    VStack,
    Spacer,
    Heading
  } from '@chakra-ui/react';

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

 
const Navbar = () => {
    const [isLogin,setIsLogin] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem('login-token');
        if(token) {
            setIsLogin(true);
        };
    },[window.localStorage.getItem('login-token')]);

    const logoutHandler = () => {
        window.localStorage.removeItem('login-token');
        setIsLogin(false);
    }

    return (
        <Flex justifyContent={'space-between'} px={'2.5rem'} py={'1rem'} alignItems={'center'} bg={'teal'}>
            <Link to={'/'}>
                <Heading p='4' fontSize={'x-large'} >Book's Library</Heading>
            </Link>
            {isLogin ? (
                <>
                <Link to={'/addBook'}>
                    <Button p='4' mx={'2'} colorScheme="purple">Add Book</Button>
                </Link>
                <Link>
                    <Button p='4' mx={'2'} colorScheme="red" onClick={logoutHandler}>Logout</Button>
                </Link>
                </>
            ) : (
                <div>
                    <Link to={'/login'}>
                        <Button p='4' mx={'2'} colorScheme="orange">Sign In</Button>
                    </Link>
                    <Link to={'/register'}>
                        <Button p='4' colorScheme='messenger'>Sign Up</Button>
                    </Link>
                 </div>
            )}

        </Flex>
    )
}

export default Navbar;


