import React, { useState,useEffect } from 'react'
import { SimpleGrid,CardHeader,CardBody,CardFooter,Text,Heading ,Card, Button,Box} from '@chakra-ui/react';
import {AiOutlineDelete} from 'react-icons/ai';
import axios  from 'axios';
import { Link } from 'react-router-dom';
function Completed() {
  const [todos,setTodos]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/donetodos')
        .then(response => {
            console.log(response.data);
            if (Array.isArray(response.data.data)) { // Accessing the 'data' property
                setTodos(response.data.data); // Setting the todos array
            } else {
                console.error('Response data is not an array:', response.data);
            }
        })
        .catch(error => {
            console.error('Error during fetching data:', error);
        });
}, []);
const deletetodo =async(todoId)=>{
  try {
    await axios.delete(`http://localhost:5000/donetodos/${todoId}`);
    // After successful deletion, update the todos state to remove the deleted item
    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}
  return (
    <Box padding={'20px'} gap={'20px'} display={'flex'}>
      <Button><Link to={'/'}>Back</Link></Button>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
    {todos.map(todo => (
        <Card key={todo._id}>
            <CardHeader>
                <Heading size='md'>{todo.title}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{todo.content}</Text>
                <Text>{todo.time}</Text>
            </CardBody>
            <CardFooter display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
           
           <AiOutlineDelete onClick={()=>{deletetodo(todo._id)}}/>
            </CardFooter>
        </Card>
    ))}
</SimpleGrid>
</Box>
  )
}

export default Completed
