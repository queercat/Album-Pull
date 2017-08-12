/* Node dependencies */
var request = require('request'); //For calling the url.
var fs = require('file-system'); //For saving images and creating directories.

/* Imgur API client id, plz no steal */
var clientID = "3752a956b4926c9";

//Get the argument count.
var args = process.argv.splice(2, 4); //Get rid of the first two elements as those aren't needed.

var customPath = args.length > 1;
var pathArg

if (customPath) {
    pathArg = args[1];
}

//Testing for usage.
if (args.length < 1 || args.length > 2) {
    failExit("Incorrect usage! See README for usage information.")
}

var urlImages = cutUrl(args[0] + "/images"); //Get the url argument for the images themselves.

var optionsImages = {
    url: urlImages,
    headers: {
        'authorization': 'Client-ID ' + clientID
    }
}

function cutUrl(url) {
    return "https://api.imgur.com/3/album/" + url.split("/")[4];
}

function parseImages(err, resp, body) {
    if (err != null) {
        failExit(err);
    }

    var imgTitles = [];
    var imgLinks = [];

    JSON.parse(body, (key, val) => {
        if (key == "title") {
            imgTitles.push(val); //Push titles to array.
        }

        if (key == "link") {
            imgLinks.push(val); //Push links to array.
        }

    });

    if (!customPath) {
        //The title to the album will always be the first element.
        var dirTitle = imgTitles[0];
        fs.mkdir(dirTitle); //Create the directory for the folders.
    } else {
        var dirTitle = pathArg; //Just set that to the directory.
    }


    imgTitles = imgTitles.slice(1, imgTitles.length); //Get rid of the album elements.
    imgLinks = imgLinks.slice(1, imgLinks.length); //Get rid of the album elements.

    //Loop through all
    for (image = 0; image < imgLinks.length; image++) {
        var filename = imgLinks[image].split("/")[3];
        download(imgLinks[image], filename, dirTitle); //Send a request to download them.
    }
}

function download(link, filename, dir) {
    request(link).pipe(fs.createWriteStream(dir + "/" + filename));
}

// failExit ... Fail and exit the program after printing out the reason it failed.
function failExit(why) {
    console.log(why);
    process.exit(1);
}

/* Send the requests to Imgur API */
request(optionsImages, parseImages);
