import express from 'express';
import pool from '../db.js';

const router= express.Router();

router.get('', async (req, res) =>{
    if(Object.keys(req.query).length=== 0){
        let sql= "SELECT jaratszam, legitarsasagok.nev, r_honnan.kod AS honnan,r_honnan.varos AS honnanvaros, r_hova.kod AS hova, r_hova.varos AS hovavaros, indulas, ADDTIME(indulas, SEC_TO_TIME(idotartam*60)) AS erkezes, idotartam, ar FROM `jaratok` INNER JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id INNER JOIN repuloterek r_honnan ON jaratok.honnan_id = r_honnan.id INNER JOIN repuloterek r_hova ON jaratok.hova_id = r_hova.id";
        let [eredmeny]=await pool.query(sql);
        return res.json(eredmeny);
    }

    const honnan= req.query.honnan;
    const hova= req.query.hova;
    const legitarsasag= req.query.legitarsasag;
    const jaratszam= req.query.jaratszam;
    
    if(jaratszam!= undefined){
        let sql = "SELECT jaratszam, legitarsasagok.nev, r_honnan.kod AS honnan,r_honnan.varos AS honnanvaros, r_hova.kod AS hova, r_hova.varos AS hovavaros, indulas, ADDTIME(indulas, SEC_TO_TIME(idotartam*60)) AS erkezes, idotartam, ar FROM `jaratok` INNER JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id INNER JOIN repuloterek r_honnan ON jaratok.honnan_id = r_honnan.id INNER JOIN repuloterek r_hova ON jaratok.hova_id = r_hova.id WHERE jaratszam = ?";
        let [eredmeny]= await pool.query(sql,[jaratszam]);
        return res.json(eredmeny);
    }
    if(legitarsasag!= undefined)
    {
        let sql = "SELECT jaratszam, legitarsasagok.nev, r_honnan.kod AS honnan,r_honnan.varos AS honnanvaros, r_hova.kod AS hova, r_hova.varos AS hovavaros, indulas, ADDTIME(indulas, SEC_TO_TIME(idotartam*60)) AS erkezes, idotartam, ar, COUNT(jaratszam) AS jaratokk FROM `jaratok` INNER JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id INNER JOIN repuloterek r_honnan ON jaratok.honnan_id = r_honnan.id INNER JOIN repuloterek r_hova ON jaratok.hova_id = r_hova.id WHERE legitarsasagok.kod = ?";
        let [eredmeny]= await pool.query(sql,[legitarsasag]);
        return res.json(eredmeny);
    }
    if(honnan!= undefined && hova!= undefined){
        let sql= "SELECT jaratszam, legitarsasagok.nev, r_honnan.kod AS honnan,r_honnan.varos AS honnanvaros, r_hova.kod AS hova, r_hova.varos AS hovavaros, indulas, ADDTIME(indulas, SEC_TO_TIME(idotartam*60)) AS erkezes, idotartam, ar FROM `jaratok` INNER JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id INNER JOIN repuloterek r_honnan ON jaratok.honnan_id = r_honnan.id INNER JOIN repuloterek r_hova ON jaratok.hova_id = r_hova.id WHERE r_honnan.kod=? AND r_hova.kod= ?";
        let [eredmeny] = await pool.query(sql, [honnan, hova]);
        return res.json(eredmeny);
    }
    res.send("valami nem jo")
})

export default router
