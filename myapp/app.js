const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/public/gradetable.html'));
});

app.listen(3000);