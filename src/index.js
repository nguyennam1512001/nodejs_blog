const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override')
const { engine } = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect()

const app = express();
const port = 3000;

// use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

app.use(morgan('combined'));

// custom middlewares
app.use(SortMiddleware);

// template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort)=>{
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: "fa-solid fa-sort",
                    desc: "fa-solid fa-arrow-down-wide-short",
                    asc: "fa-solid fa-arrow-down-short-wide"
                }
                const types ={
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
            }
        }
    }),
);   
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
