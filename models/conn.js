//instantiate pgp to import pg-promise
const pgp = require("pg-promise")({
    //logging all of our queries to the console
    query: e => {
        console.log("QUERY:", e.query);
    }
});

//These are our options
const options = {
    host: "localhost",
    database: "blog",
    user: "jctak"
};

//call pgp function and pass in options and store in db variable
const db = pgp(options);

//export this module to link to ceos.js in model folder
module.exports = db;
