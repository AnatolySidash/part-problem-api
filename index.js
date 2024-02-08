import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "9cae03d3#VB",
    database: "part_problem"
});

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001'],
    credentials: true,
    maxAge: 30,
  }));

app.get("/", (req, res) => {
    res.json('Backend is running on 3000 port!')
});

app.get("/problems", (req, res) => {
    const query = "SELECT * FROM problems";
    db.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/problems", (req, res) => {
    const query = "INSERT INTO problems (`problem_code`, `problem`, `defect_qty`, `supplier`, `temp_cm`, `temp_cm_date`, `perm_cm`, `perm_cm_date`, `status`, `responsible`, `system`, `comment`) VALUES (?)";
    const values = [
        req.body.problem_code, 
        req.body.problem, 
        req.body.defect_qty, 
        req.body.supplier, 
        req.body.temp_cm, 
        req.body.temp_cm_date, 
        req.body.perm_cm, 
        req.body.perm_cm_date, 
        req.body.status, 
        req.body.responsible, 
        req.body.system, 
        req.body.comment, 
    ];

    db.query(query, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.listen(3000, () => {
    console.log('Backend is running on 3000 port!');
});

