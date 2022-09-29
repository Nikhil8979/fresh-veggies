const {app} = require("../app");
const PORT = 4000;
import requireDir from "require-dir";
requireDir("../models");
requireDir("../routes");
requireDir("../controllers", {recurse: true});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next){
    res.send({
        type: "error",
        message: err.message
    });
});

app.listen(PORT, (): void => {
    console.log(`app is listening on port ${PORT}`);
});
