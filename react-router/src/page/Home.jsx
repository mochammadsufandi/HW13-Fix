import { 
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    TableCaption,
    TableContainer,
    Tfoot
 } from "@chakra-ui/react";

 import { getAllBooks } from "../modules/fetchData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const Home = () => {
    const [books,setBooks] = useState([]);
    const fetchData = async () => {
        const response = await getAllBooks();
        const fetchBooks = response.books;
        setBooks(fetchBooks);
    };

    useEffect(() => {
        fetchData()
    },[]);

    const navigate = useNavigate();

    return(
        <>  
            <Navbar/>
            <TableContainer py={'2rem'} px={'1rem'}>
                <Table variant='simple' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Title</Th>
                        <Th textAlign={'center'}>Author</Th>
                        <Th isNumeric textAlign={'center'}>Year</Th>
                        <Th textAlign={'center'}>Action</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {books.map((book)=>{
                        return ( 
                            <Tr key={book.id}>
                            <Td textAlign={'center'}>{book.title}</Td>
                            <Td textAlign={'center'}>{book.author}</Td>
                                <Td isNumeric textAlign={'center'}>{book.year}</Td>
                                <Td textAlign={'center'}>
                                    <Button colorScheme="blue" onClick={()=>{navigate(`/book/${book.id}`)}} >Detail</Button>
                                </Td>
                            </Tr>
                        )
                    })}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Home;