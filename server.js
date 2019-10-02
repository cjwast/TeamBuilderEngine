//Config
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();


//Conection
mongoose.connect(`mmongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@zeus-c1sj4.mongodb.net/Ares`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Apolo ha ingresado al Olimpo'))
    .catch(err => console.error(err))
/*MIDDLEWARE*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*ROUTES*/
app.use('/auth', require('./routes/Auth'));
//app.use('/', require('./routes/Main'));


/**LISTEN */
app.listen(process.env.PORT, () => console.info(`el servidor está escuchando en el puerto ${process.env.PORT}`));