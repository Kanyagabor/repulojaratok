import express from 'express';
import jaratok from './routes/jaratok.js'

const app= express();
const PORT =3000;

app.use("/jaratok", jaratok)



app.listen(PORT, ()=> console.log(`fut a szero http://localhost:${PORT}`));