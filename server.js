const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/database');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
require('dotenv').config();
require('./config/auth');

const app = express();

connectDB();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
