import { 
    Box,
    Button,
    Flex,
    Heading,
    Text,
    Image,
    Skeleton,
    HStack,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    PopoverContent,
    useToast,
 } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookById } from "../modules/fetchData";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";

const DetailBook = () => {
    const {id} = useParams();
    const [book,Setbook] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();
    
    const fetchBookById = async() => {
        const response = await getBookById(id);
        const fetchBook = response.book;
        Setbook(fetchBook);
        setLoading(false);
    };

    const deleteHandler = async() => {
      try {
        const response = await deleteBook(id);
        toast({
          title: 'Success',
          description : `book with id ${response.book.id} is deleted`,
          status:'loading',
          duration: 3000,
          isClosable: true
        })
        navigate('/');
      } catch(err) {
        console.log(err);
        toast({
          title: 'Error',
          description : err.message,
          status:'error',
          duration: 3000,
          isClosable: true
        })
      }  
    }

    useEffect(() => {
        fetchBookById();
    },[id]);
 
    return (
      <Flex flexDirection={'column'}>
        <Navbar/>
        <Box py={'2rem'}>
        {isLoading ? (
          <Skeleton height="300px" my="6" />
        ) : (
          <Flex my="6" justifyContent={'center'}>
            <Box w="300px">
              <Image
                src={`http://localhost:8000/${book.image}`}
                alt={book.title}
              />
            </Box>
            <Box ml="8">
              <Heading as="h1" size="lg">
                {book.title}
              </Heading>
              <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                {book.author}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                {book.publisher}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
                {book.year} | {book.pages} pages
              </Text>
            </Box>
          </Flex>
          )}


        {localStorage.getItem('login-token') && (
          <Flex justifyContent={'center'}>
            <HStack>
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="red">Delete</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton color={'black'} fontWeight={'bold'}/>
                  <PopoverHeader color={'black'} textAlign={'center'}>Confirmation!</PopoverHeader>
                  <PopoverBody color={'black'}>
                    Are you sure you want to delete this book?
                  </PopoverBody>
                  <Button colorScheme="red" onClick={deleteHandler}>
                    Delete
                  </Button>
                </PopoverContent>
                <Button onClick={() => {
                  navigate(`/editbook/${id}`);
                }}>Edit</Button>
              </Popover>
            </HStack>
          </Flex>
        )}


        </Box>
      </Flex>
    )
}

export default DetailBook;