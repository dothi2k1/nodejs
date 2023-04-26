const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path'); // add path importin widow
const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'public')))

app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/login', (req, res) => {
    res.render('login');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})