const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path'); // add path importin widow
const app = express();
const port = 3000;
const connection = require('./configs/connectDB')

const route = require('./routes')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json());
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})