const express = require("express");
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const router = express.Router();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')))

app.get("/promotions", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile(__dirname + '/routes' + '/promotions.json', 'utf8', (err, data) => {
        res.end(data);
    });
});

app.get("/leadership", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile(__dirname + '/routes' + '/leadership.json', 'utf8', (err, data) => {
        res.end(data);
    });
});

app.get("/feedback", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile(__dirname + '/routes' + '/feedback.json', 'utf8', (err, data) => {
        res.end(data);
    });
});

app.post("/feedback", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const content = req.body;

    fs.readFile(__dirname + '/routes' + '/feedback.json', (err, data) => {
        if(err) return res.status(400).send(err)
        var json = JSON.parse(data)
        json.push(content)
    
        fs.writeFile(__dirname + '/routes' + '/feedback.json', JSON.stringify(json), (err) => {
            if(err) console.log('error', err);
        })
    })

    return res.status(200).send(content)
});

app.get("/dishes", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile(__dirname + '/routes' + '/dishes.json', 'utf8', (err, data) => {
        res.end(data);
    });
});

app.get("/dishes/:id", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile(__dirname + '/routes' + '/dishes.json', 'utf8', (err, data) => {
        const json = JSON.parse(data)
        const content = json.find(item => item.id === req.params.id)
        return res.end(JSON.stringify(content));
    });
});

app.put("/dishes/:id", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const content = req.body;
    const id = req.params.id

    fs.readFile(__dirname + '/routes' + '/dishes.json', (err, data) => {
        if(err) return res.status(400).send(err)
        const json = JSON.parse(data)
        const object_item = json.find(item => item.id === id)
        const index = json.indexOf(object_item);
        object_item.comments.push(content)
        json[index] = object_item
        const response = JSON.stringify(json)

        fs.writeFile(__dirname + '/routes' + '/dishes.json', response, (err) => {
            if(err) return res.status(400).send(err)
        })
    })

    return res.status(200).send(response)
});

app.listen(8080);

module.exports = router;
