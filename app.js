//SET DEBUG=kolonial:* & npm start

const express = require("express");
const engine = require("ejs-locals");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const reload = require("reload");
const session = require("express-session");

const authentication = require("./components/config/authentication");
//var config = require('./config');

const index = require("./routes/index");
const users = require("./routes/users");
const search = require("./routes/search");
const recipes = require("./routes/recipes");
//const authenticate = require("./routes/authenticate");
const login = require("./routes/login");
const logout = require("./routes/logout");
const test = require("./routes/test");
const weekPlannerCurrent = require("./routes/week-planner-current");

/*
const basicProducts = require('./routes/basic-products');
const introduction = require('./routes/introduction');
const shoppingCart = require('./routes/shopping-cart');
*/

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use(session({secret: 'kolonial', saveUninitialized: true, resave: false}))

app.use(authentication);

app.engine("engine", engine);
// app.use("view engine", "ejs");

app.use("/", index);
app.use("/search", search);
app.use("/users", users);
app.use("/recipes", recipes);
app.use("/test", test);
app.use("/login", login);
app.use("/logout", logout);
/*
app.use('/basic-products', basicProducts);
app.use('/introduction', introduction);
app.use('/shopping-cart', shoppingCart);
*/
app.use("/week-planner-current", weekPlannerCurrent);

reload(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
