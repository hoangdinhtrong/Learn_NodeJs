const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const route = require('./routes/index.route');
const db = require('./config/db/index');

const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

db.connect();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
