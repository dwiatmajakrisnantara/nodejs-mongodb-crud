const express = require('express');
const app = express()

app.get('/', (req, res)=>{
    res.send('This app is running');
});

const PORT = process.env.PORT || 8000;


app.listen(PORT, ()=>{
    console.log('This app is rrunning on:', PORT);
})