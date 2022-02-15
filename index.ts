import * as express from "express";
import {static as eStatic, urlencoded} from "express";
import 'express-async-errors';
import * as methodOverride from "method-override";
import {engine} from "express-handlebars";
import {homeRouter} from './routers/home';
import {warriorRouter} from "./routers/warrior";
import {arenaRouter} from "./routers/arena";
import {hallOfFameRouter} from "./routers/hall-of-fame";
import './utlis/db';

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));
app.use(eStatic('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    //helpers: ??? jeszcze nie ma
}));
app.set('view engine', '.hbs');

// app.get('/', (req, res) => {
//     res.send('Hello!');
// });

//app.use(handleError);

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);


app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});