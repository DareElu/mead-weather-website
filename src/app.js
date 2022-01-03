const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const forecast = require("./utils/forecast");
const { response } = require("express");

// Specify port to enable Heroku to run app
const port = process.env.PORT || 3000;
// console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location >> specific to handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
//how you configure partials >> which allows you reuse something like a footer in multiple places
hbs.registerPartials(partialsPath);

//way to customise server >> set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Setubal",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "Seaside",
        name: "Cascais",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Cape Verde",
    });
});
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "address must be provided",
        });
    }

    forecast(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error,
            });
        } else {
            const { currentWeatherData, ...locationDetails } = response;
            res.send({
                address: locationDetails,
                forecast: `${currentWeatherData.weather_descriptions[0]}: it is currently ${currentWeatherData.temperature} degrees out. It feels like ${currentWeatherData.feelslike} degrees out`,
            });
        }
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        404: "Help article",
        name: "Not Found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        404: "Page",
        name: "Not Found",
    });
});

app.listen(port, () => {
    console.log("server is listening on 3000.");
});
