import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('', async(req,res) =>{
    let sql= `SELECT r.kod, r.nev, r.varos, r.orszag, COUNT(j_indulo.id) AS indulo, COUNT(j_erkezo.id) AS erkezo
                FROM repuloterek AS r
                LEFT JOIN jaratok j_indulo ON r.id = j_indulo.honnan_id
                LEFT JOIN jaratok j_erkezo ON r.id = j_erkezo.hova_id
                GROUP BY r.id, r.kod, r.nev, r.varos, r.orszag;`;
    let [eredmeny]= await pool.query(sql);
    res.json(eredmeny);
})

router.get('/:varos/indulasok', async(req,res)=>{
    let varos= req.params.varos;
    let sql= `SELECT jaratok.indulas, jaratok.jaratszam, legitarsasagok.nev, r_hova.varos, ADDTIME(jaratok.indulas, SEC_TO_TIME(jaratok.idotartam*60)) AS erkezes FROM jaratok
                INNER JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id
                INNER JOIN repuloterek r_honnan ON jaratok.honnan_id = r_honnan.id
                INNER JOIN repuloterek r_hova ON jaratok.hova_id = r_hova.id
                WHERE r_honnan.kod= ?`;
    let [eredmeny]= await pool.query(sql, [varos]);
    res.json(eredmeny);    
})

export default router