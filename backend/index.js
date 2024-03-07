import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Todo } from './models/CreateTodo.js'; 
import { CompleteTodo } from './models/Completed.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const url = process.env.MONGO_URL;
mongoose.connect(url);



app.use(express.json());
app.post('/completed', async (req, res) => {
    try {
        const { title, content, time } = req.body;

        // Create a new todo instance in the completed endpoint
        const completedTodo = new CompleteTodo({
            title,
            content,
            time
        });

        // Save the new todo instance in the completed endpoint
        const newCompletedTodo = await completedTodo.save();

        // Remove the todo from the todo endpoint
        await Todo.findOneAndDelete({ title, content, time });

        res.status(201).send({ message: 'Todo moved to completed successfully', todo: newCompletedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/create', async (req, res) => {
    try {
        const { title, content, time } = req.body;
        const newTodo = new Todo({
          title,
          content,
          time
        });
    
        const newTodoInstance = await newTodo.save(); 
        res.status(201).send({ message: 'Todo created successfully', todo: newTodoInstance })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/todo',async(req,res)=>{
try {
    const todos=await Todo.find({});
    return res.status(200).json({
        count:todos.length,
        data:todos
    });
} catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Internal server error' });
}
})
app.get('/donetodos',async(req,res)=>{
    try {
        const todos=await CompleteTodo.find({});
        return res.status(200).json({
            count:todos.length,
            data:todos
        });
    } catch (error) {
        console.error(error);
            res.status(500).json({ error: 'Internal server error' });
    }
    })
app.get('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params; // Correctly accessing id parameter from req.params

        const todo = await Todo.findById(id); // Finding todo by its ID

        if (!todo) {
            // If no todo is found with the given ID, return a 404 Not Found response
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.status(200).json({
            data: todo
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, time } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            $set: {
                title,
                content,
                time
            }
        }, { new: true });

        if (!updatedTodo) {
           
            return res.status(404).json({ error: 'Todo not found' });
        }

      
        res.status(200).json({ message: 'Todo updated successfully', updatedTodo });
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.delete('/donetodos/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        const deletedTodo = await CompleteTodo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
