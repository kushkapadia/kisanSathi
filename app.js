const router = require("./router");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const path = require('path')

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
app.use(flash())
app.use(fileUpload({
  createParentPath: true
}))
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static("public"));

app.set("views", "views");
//a. by default, b.folder name
app.set("view engine", "ejs");
//ejs- embeded js templating



app.use(function(req, res, next) {
  // make our markdown function available from within ejs templates
  // res.locals.filterUserHTML = function(content) {
  //   return sanitizeHTML(markdown.parse(content), {allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'strong', 'bold', 'i', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], allowedAttributes: {}})
  // }
  
  // make all error and success flash messages available from all templates
  res.locals.errors = req.flash("errors")
  res.locals.success = req.flash("success")

  // make current user id available on the req object
  // if (req.session.user) {req.visitorId = req.session.user._id} else {req.visitorId = 0}
  
  // make user session data available from within view templates
  res.locals.user = req.session.user
  next()
})



app.use("/", router);

module.exports = app;
