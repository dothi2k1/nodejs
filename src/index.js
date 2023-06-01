const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const route = require('./routes')

// Sử dụng bodyParser để đọc dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json());

// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources/views'));

//Init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})