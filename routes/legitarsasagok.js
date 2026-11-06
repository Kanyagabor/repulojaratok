import express from'express';
import pool from '../db.js';

const router = express.Router();


router.get('', async(req,res) =>{
    let sql= `SELECT legitarsasagok.kod, legitarsasagok.nev, COUNT(jaratok.id) AS jaratDb, COUNT(DISTINCT jaratok.hova_id) AS celallomasDb, MIN(jaratok.ar) AS legolcsobb, ROUND(AVG(jaratok.ar)) AS atlagAr 
                FROM legitarsasagok 
                LEFT JOIN jaratok ON legitarsasagok.id = jaratok.legitarsasag_id
                GROUP BY legitarsasagok.id, legitarsasagok.kod, legitarsasagok.nev
                ORDER BY jaratDb DESC, legitarsasagok.nev ASC;`;
    let [eredmeny]= await pool.query(sql);
})

export default router