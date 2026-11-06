import express from 'express';
import jaratok from './routes/jaratok.js';
import repuloterek from './routes/repuloterek.js';
import legitarsasagok from './routes/legitarsasagok.js';
import utvonalak from './routes/utvonalak.js';

const app= express();
const PORT =3000;

app.use("/jaratok", jaratok);
app.use("/repuloterek", repuloterek);
app.use("/legitarsasagok", legitarsasagok);
app.use("/utvonal", utvonalak);



app.listen(PORT, ()=> console.log(`fut a szero http://localhost:${PORT}`));