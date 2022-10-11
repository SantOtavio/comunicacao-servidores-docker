const express = require("express");
const App = express();
const route = express.Router();
const routes = require("./api/routes");
const port = process.env.PORT || 3001;

App.use(express.json());
App.use(route);

route.get("/", (req, res) => {
    res.send("Learning Docker Server 2")
});

route.use("/api", routes);

App.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);