/* Node dependencies */
var request = require('request'); //For calling the url.
var fs = require('file-system'); //For saving images and creating directories.

/* Imgur API client id, plz no steal */
var clientID = "3752a956b4926c9";

//Get the argument count.
var args = process.argv.splice(2, 4); //Get rid of the first two elements as those aren't needed.

//Regular expression for seeing if the url is in a correct format.
var urlCheck = /^https?:\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?$/


//Testing for usage.
if (args.length < 1) {
    failExit("Incorrect usage! See README for usage information.")
}

var urlAlbum = cutUrl(args[0]); //Get the url argument for the album information.
var urlImages = cutUrl(args[0] + "/images"); //Get the url argument for the images themselves.

/* Used as options for parsing album info */
var optionsAlbum = {
    url: urlAlbum,
    headers: {
        'authorization': 'Client-ID ' + clientID
    }
};

var optionsImages = {
    url: urlImages,
    headers: {
        'authorization': 'Client-ID ' + clientID
    }
}

var directoryArg = args[1]; //The directory the user wants the files in if it exists already.

function cutUrl(url) {
    return "https://api.imgur.com/3/album/" + url.split("/")[4];
}

// parseAlbum ... Get information from the album and create the directory.
function parseAlbum(err, response, body) {
    if (err !== null) {
        failExit("Unable to parse album.\n" + err);
    }

    var isTitleCreated = false; //Used for checking for only the first title.
    var dirTitle = "";

    /* Parse the JSON */
    JSON.parse(body, (key, val) => {
        if (key == "title" && !isTitleCreated) {
            dirTitle = val;
            fs.mkdir(dirTitle); //Create directory.
            isTitleCreated = true;
        }
    });

}

function parseImages(err, resp, body) {
    if (err != null) {
        failExit(err);
    }

    var imgTitle = "";
    var imgType = "";
    var imgLink = "";

    JSON.parse(body, (key, val) => {

        if (key == "title") {
            imgTitle = val;
        }

        if (key == "type") {
            imgType = val;
        }

        if (key == "link") {
            imgLink = val;
        }

   });
}


// failExit ... Fail and exit the program after printing out the reason it failed.
function failExit(why) {
    console.log(why);
    process.exit(1);
}

/* Send the requests to Imgur API */
request(optionsAlbum, parseAlbum);
request(optionsImages, parseImages);
