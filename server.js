const express = require("express");
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const routes = require("./controllers")
const path = require("node:path");
const dayjs=  require("dayjs");


const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/templates"),
  partialsDir: path.join(__dirname, "views/sections"),
  extname: "webpage",
  helpers:{
    formatDate: date=> dayjs(date).format("DD/MM/YYYY")
  }
});

app.engine("webpage", hbs.engine);
app.set("view engine", "webpage");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});