import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import url from 'url';
import Tasker from './schemes/todo.mjs';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5500;
const mongoUrl = process.env.MONGO_URL;



const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

///MONGODB connection

mongoose.connect(mongoUrl);
mongoose.connection.on('open', () => {console.log('MongoDB connected successfully')});
mongoose.connection.on('error', (e) => {console.log('MongoDB connection failed:', e)});

//MiddleWare

app.use(cors()); // We allow cross-domain requests
app.use(express.json()); //JSON auto parse

// ======================ENDPOINTS========================


app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Tasker(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const toGet = await Tasker.find();
    res.status(200).json(toGet);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.get('/tasks/:id', async (req, res) => {
  try {
    const toGet = await Tasker.findById(req.params.id);
    if (!toGet) {
      res.status(404).json({error: '404 not found'});
    }
    if (toGet) {
      res.status(200).json(toGet);
    }
  } catch (error) {
    res.status(500).json({Error: error.message});
  }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const toRemove = await Tasker.findByIdAndDelete(req.params.id);
    res.json({message: 'Task removed successfully:', task: toRemove});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
})

app.patch('/tasks/:id', async (req, res) => {
  try {
    const update = req.body;
    const options = {new: true, runValidators: true}
    const toChange = await Tasker.findByIdAndUpdate(req.params.id, update, options)
    res.status(200).json({message: "Patched succesfully", task: toChange})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT)
})
