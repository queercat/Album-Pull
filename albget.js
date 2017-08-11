/* Node dependencies */
var request = require('request');

//Get the argument count.
var args = process.argv;

if (args.length > 4 || args.length <= 2) {
    console.log("Incorrect usage, see README for usage information");
    process.exit(1);
}
