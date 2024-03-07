import React, { useState } from 'react';
import { Input, FormControl,useToast, FormLabel, FormHelperText, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);

  const isTitleError = title === '';
  const isContentError = content === '';
  const isTimeError = time === '';
  function CreateTodoData(title, content, time) {
    const data = {
      title: title,
      content: content,
      time: time
    };
  
    axios.post('http://localhost:5000/create', data)
      .then(response => {
        console.log('Todo data created successfully:', response.data);
title='',
content='',
time=''
     
        // Handle any success actions here
      })
      .catch(error => {
        console.error('Error creating todo data:', error);
        // Handle any error actions here
      });
  }
  const toast = useToast()
  return (
    <Box padding={'20px'} gap={'20px'} display={'flex'}>
      <Button><Link to={'/'}>Back</Link></Button>
      <Box padding='20px' width='300px' borderWidth='1px' borderRadius='md'>
        <FormControl >
          <FormLabel>Title</FormLabel>
          <Input type='text' value={title} onChange={handleTitleChange} />
          {!isTitleError ? (
            <FormHelperText>Enter the title</FormHelperText>
          ) : (
            <FormErrorMessage>Title is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isContentError}>
          <FormLabel>Content</FormLabel>
          <Input type='text' value={content} onChange={handleContentChange} />
          {!isContentError ? (
            <FormHelperText>Enter the content</FormHelperText>
          ) : (
            <FormErrorMessage>Content is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isTimeError}>
          <FormLabel>Time</FormLabel>
          <Input type='text' value={time} onChange={handleTimeChange} />
          {!isTimeError ? (
            <FormHelperText>Enter the time</FormHelperText>
          ) : (
            <FormErrorMessage>Time is required.</FormErrorMessage>
          )}
        </FormControl>

        <Button onClick={() => {
  CreateTodoData(title, content, time);
  toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
}}>Add Todo</Button>


      </Box>
    </Box>
  );
}

export default Create;
