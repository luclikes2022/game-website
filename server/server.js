
import express from 'express';
const app = express();
const port = 3000;
import fs from 'fs';

app.use(express.static('public'));

app.get('/api/views', (req, res)=>{
    fs.readFile('visits.txt', 'utf8', (err, data)=>{
        if (err){
            return res.status(500).json({error:'File cannot be opened'});
        }
        const views = parseInt(data) || 1;
        res.json(({views}));
    });
});

app.post('/api/views', (req, res)=>{
    fs.readFile('visits.txt', 'utf8', (err, data)=>{
        if (err){
            return res.status(500).json({error:'File cannot be opened'});
        }
        let views = parseInt(data) || 0;
        views++;
        fs.writeFile('visits.txt', views.toString(), (err)=>{
            if (err){
                return res.status(500).json({error:'File cannot be changed'});
            }
            res.json(({views}));
        });

    });
});

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});