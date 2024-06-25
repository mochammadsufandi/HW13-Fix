import { Flex, Heading } from "@chakra-ui/react";

const token = window.localStorage.getItem('login-token');
const PageNotFound = () => {
    return (
        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} my={'20%'} color={'red'}>
            {token ? (
                 <Heading>404, Page is Not Found</Heading>
            ) : (
                <>
                 <Heading>401, User is Unauthorized</Heading>
                 <Heading>Please Login First!!!</Heading>
                </>
            )
            }
        </Flex>
    )
}

export default PageNotFound;