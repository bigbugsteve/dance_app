import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload';



const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api', uploadRouter);
app.get('/', (req, res) => {
  res.send('Express API működik');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API szerver fut: http://localhost:${PORT}`);
});
