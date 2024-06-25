import {Box,
    Button,
    ButtonGroup,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Text,
    useToast,
    Flex,
} from '@chakra-ui/react';
import { loginUser } from '../modules/fetchData';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();

    async function loginHandler (ev) {
        ev.preventDefault();
        try {
            const token = await loginUser(
                ev.target.email.value,
                ev.target.password.value
            );
            window.localStorage.setItem('login-token',token.token);
            toast({
                title: "Success",
                description: 'Login Success',
                status: "success",
                duration: 3000,
                isClosable: true,
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
    }
    return(
        <Flex flexDirection={'column'}>
            <Navbar/>
            <Box w="50%" p={'10'} mx="auto" my={'5rem'} bg={'teal'} rounded={'5px'}>
                <Heading  textAlign={'center'} >LOGIN</Heading>
                <form id='form-login' onSubmit={(ev)=>{
                    loginHandler(ev);
                }}>
                    <FormControl py={5} isRequired>
                        <FormLabel fontSize={'large'}>Email address</FormLabel>
                        <Input type='email' name='email'  w="100%" h="32px"/>      
                    </FormControl>
                    <FormControl py={5} mb={'20px'} isRequired>
                        <FormLabel fontSize={'large'}>Password</FormLabel>
                        <Input type='password' name='password' w="100%" h="32px"/>      
                    </FormControl>
                    <Button type='submit' colorScheme='blue' mx={'1rem'}>Login</Button>
                    <Link to="/register">
                        <Button variant="ghost">
                        Doesn't Have Account? Click here
                        </Button>
                    </Link>
                </form>
            </Box>
        </Flex>
    )
}

export default Login;