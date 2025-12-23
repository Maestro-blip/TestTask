const express = require('express');
require('dotenv').config();

const router = require('./routes/api')

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use('/api',router);

app.use((err,req,res,next) => {

    console.error(err)
    res.status(500).send("Global error")
    next()
})

app.listen(PORT,()=>console.log(`Server listening on http://localhost:${PORT}`))