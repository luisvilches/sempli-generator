module.exports = `const app = require("semplice");
const Routes = require("./routes/routes");

app.main();
app.routes("/",Routes);
                            `