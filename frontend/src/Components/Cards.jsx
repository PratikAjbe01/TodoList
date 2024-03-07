import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
function Cards() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/todo')
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
    const handleDoneClick = async (todoId) => {
        try {
           
            await axios.delete(`http://localhost:5000/todo/${todoId}`);

           
            const doneTodo = todos.find(todo => todo._id === todoId);

            
            await axios.post('http://localhost:5000/completed', doneTodo);

           
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
        } catch (error) {
            console.error('Error completing todo:', error);
        }
    };
    const deletetodo =async(todoId)=>{
        try {
          await axios.delete(`http://localhost:5000/todo/${todoId}`);
          // After successful deletion, update the todos state to remove the deleted item
          setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      }
    return (
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
                   
                   <Button color={"blue"} onClick={() => handleDoneClick(todo._id)}>Done</Button>
                   <AiOutlineDelete onClick={()=>{deletetodo(todo._id)}}/>
                    </CardFooter>
                </Card>
            ))}
        </SimpleGrid>
    );
}

export default Cards;
