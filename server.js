//TODO set up handlebars and public filepaths
const express = require('express');
const session = require('express-session');
const path = require('path');
const handlebars = require('express-handlebars');



const routes = require('./controllers');

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = handlebars.create({})

const sess = {
    secret: process.env.SECRET,
    cookie:{
        maxAge: 40000,
        httpOnly:true,
        secure:false,
        sameSite: 'strict',
    },
    resave:false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db:sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(()=>{
    app.listen(PORT, ()=> console.log('ready'))
});

// app.listen(PORT, ()=> console.log('ready'))