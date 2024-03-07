import React from 'react';
import { Box, Divider, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Cards from './Cards';

function Home() {
  return (
    <Box padding={'20px'}>
      <Heading>Todoss</Heading>
      <Divider />
      <Box padding={'20px'} gap={'20px'} display={'flex'}>
        <Button colorScheme='teal' size='lg' fontSize={'40px'}>
          <Link to={'/create'}>+</Link> {/* Place the Link component around the '+' button */}
        </Button>
        <Button colorScheme='teal' size='lg'>
          <Link to={'/'}>Pending</Link> {/* Place the Link component around the 'Pending' button */}
        </Button>
        <Button colorScheme='teal' size='lg'>
          <Link to={'/completed'}>Completed</Link> {/* Place the Link component around the 'Completed' button */}
        </Button>
      </Box>
      <Cards />
    </Box>
  );
}

export default Home;
