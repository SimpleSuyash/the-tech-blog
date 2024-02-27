const express = require("express");
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const routes = require("./controllers");
const path = require("node:path");

const formatDate = require("./utils/dateFormatter");
// Import express-session
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3002;
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/templates"),
  partialsDir: path.join(__dirname, "views/sections"),
  // extname: "webpage",
  helpers: {
    formatDate,
  },
});

// Set up sessions
const sess = {
  secret: "my secret",
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: { 
    // secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 100000
  } 
};
app.use(session(sess));

// app.engine("webpage", hbs.engine);
// app.set("view engine", "webpage");
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
