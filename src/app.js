const express = require('express');
require('dotenv').config();
const router = require('./routes/api')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const app = express();

const PORT = process.env.PORT ?? 8000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8',
	legacyHeaders: false
})


app.use(morgan('combined'));

app.use(express.json());

app.use(limiter)
app.use('/api',router);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err,req,res,next) => {
console.error(err);
  res.status(500).json({ message: err.message});
})

app.listen(PORT,()=>console.log(`Server listening on http://localhost:${PORT}`))