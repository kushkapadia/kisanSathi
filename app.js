const router = require("./router");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

let sessionOptions = session({
  secret: "Maheshmati is Ruled by BhalalDev Instead of Baahubali",
  store: MongoStore.create({
    client: require("./db"),
    mongoUrl:
    process.env.CONNECTIONSTRING,
    collectionName: "sessions",
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 48, httpOnly: true },
});

app.use(sessionOptions);

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static("public"));

app.set("views", "views");

app.set("view engine", "ejs");

app.use("/", router);

module.exports = app;
