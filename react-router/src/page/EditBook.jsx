import { 
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    useToast,
    Skeleton
 } from "@chakra-ui/react";
import Navbar from "../component/Navbar";
import { getBookById,editBook } from "../modules/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditBook = () => {
    const {id} = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const [book,setBook] = useState();
    const navigate = useNavigate();
    const toast = useToast();

    const fetchBookById = async() => {
        const response = await getBookById(id);
        setBook(response.book);
        setIsLoading(false)
    }

    const editHandler = async(ev) => {
        ev.preventDefault();
        try {
            const response = await editBook(
                id,
                ev.target.title.value,
                ev.target.author.value,
                ev.target.publisher.value,
                parseInt(ev.target.year.value),
                parseInt(ev.target.pages.value)
            );
            console.log(response.book);
            toast({
                title: 'Success',
                description: 'Success updating book',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            navigate('/');

        } catch (err) {
            console.log(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });

        }
        
    }

    useEffect(() => {
        fetchBookById();
    },[])

    return (
        <Flex flexDirection={'column'}>
            <Navbar/>

            {isLoading ? (
                <Skeleton height="300px" my="6" />
            ) : (
                <Box w="50%" py={10} px={24} mx="auto" my={'3rem'} bg={'blue.600'} rounded={'5px'}>
                <Heading textAlign={'center'}>Edit Book</Heading>
                <form id='form-book' onSubmit={(ev)=>{
                   editHandler(ev);
                }}>
                    <FormControl py={'0.3rem'} isRequired>
                        <FormLabel fontSize={'large'}>Title</FormLabel>
                        <Input type='text' name='title'  w="100%" h="32px" defaultValue={book.title}/>      
                    </FormControl>
                    <FormControl py={'0.3rem'} isRequired>
                        <FormLabel fontSize={'large'}>Author</FormLabel>
                        <Input type='text' name='author'  w="100%" h="32px" defaultValue={book.author}/>      
                    </FormControl>
                    <FormControl py={'0.3rem'}  isRequired>
                        <FormLabel fontSize={'large'}>Publisher</FormLabel>
                        <Input type='text' name='publisher' w="100%" h="32px" defaultValue={book.publisher}/>      
                    </FormControl>
                    <FormControl py={'0.3rem'} isRequired>
                        <FormLabel fontSize={'large'}>Year</FormLabel>
                        <Input type='number' name='year' w="100%" h="32px" defaultValue={book.year}/>
                    </FormControl>
                    <FormControl pt={'0.3rem'} pb={'2rem'} isRequired>
                        <FormLabel fontSize={'large'}>Pages</FormLabel>
                        <Input type='number' name='pages' w="100%" h="32px" defaultValue={book.pages}/>
                    </FormControl>
                    <Button type='submit' colorScheme='orange'>Edit Book</Button>
                </form>
            </Box>
            )
            }
            
        </Flex>
    )
};

export default EditBook;

