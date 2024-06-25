import { 
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    useToast
 } from "@chakra-ui/react";
import { addBook } from "../modules/fetchData";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";


const AddBook = () => {
    const toast = useToast();
    const navigate = useNavigate();
    
    async function bookHandler(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData(ev.target);
            const response = await addBook(formData) ;
            const addedBook = response.book;
            ev.target.reset();
            toast({
                title : "Success",
                description : `Book with title ${addedBook.title} is successfully added`,
                status : 'success',
                duration : 3000,
                isClosable : true
            })
            
        } catch(err) {
            console.log(err);
            toast({
                title : "Error",
                description : err.message,
                status : 'error',
                duration : 3000,
                isClosable : true
            })
        }
    }

    return (
        <Flex flexDirection={'column'}>
            <Navbar/>
            <Box w="50%" py={10} px={24} mx="auto" my={'3rem'} bg={'blue.600'} rounded={'5px'}>
                <Heading textAlign={'center'}>ADD BOOK</Heading>
                <form id='form-book' onSubmit={(ev)=>{
                    bookHandler(ev);
                }}>
                    <FormControl py={'0.3rem'} isRequired>
                        <FormLabel fontSize={'large'}>Title</FormLabel>
                        <Input type='text' name='title'  w="100%" h="32px"/>      
                    </FormControl>
                    <FormControl py={'0.3rem'} isRequired>
                        <FormLabel fontSize={'large'}>Author</FormLabel>
                        <Input type='text' name='author'  w="100%" h="32px"/>      
                    </FormControl>
                    <FormControl py={'0.3rem'}  isRequired>
                        <FormLabel fontSize={'large'}>Publisher</FormLabel>
                        <Input type='text' name='publisher' w="100%" h="32px"/>      
                    </FormControl>
                    <FormControl py={'0.3rem'} isRequired>
                        <FormLabel fontSize={'large'}>Year</FormLabel>
                        <Input type='number' name='year' w="100%" h="32px"/>
                    </FormControl>
                    <FormControl py={'0.3rem'} isRequired>
                        <FormLabel fontSize={'large'}>Pages</FormLabel>
                        <Input type='number' name='pages' w="100%" h="32px"/>
                    </FormControl>
                    <FormControl py={'0.3rem'} mb={'20px'} isRequired>
                        <FormLabel fontSize={'large'}>Image</FormLabel>
                        <Input type='file' name='image' accept="image/*" w="100%" h="40px" pt={'5px'}/>
                    </FormControl>
                    <Button type='submit' colorScheme='green'>Add Book</Button>
                </form>
            </Box>
        </Flex>
    )
};

export default AddBook;