/* Node dependencies */
var request = require('request'); //For calling the url.
var fs = require('file-system'); //For saving images and creating directories.

/* Imgur API client id, plz no steal */
var clientID = "3752a956b4926c9";

/* For checking directory name */
var unallowChar = "><:\"\\/|?*\0"; //List of unnallowed characters.

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

var urlImages = "https://api.imgur.com/3/album/" + getAlbumHash(args[0]); //Get the url argument for the images themselves.

var optionsImages = {
    url: urlImages,
    headers: {
        'authorization': 'Client-ID ' + clientID
    }
}

function getAlbumHash(url) {
    return url.split("/")[url.split("/").length - 1]
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
        var dirTitle = removeSpecialCharacters(imgTitles[0]); //Remove unsuable directory characters.
        fs.mkdir(dirTitle); //Create the directory for the folders.
    } else {
        var dirTitle = pathArg; //Just set that to the directory.
    }

    imgLinks = imgLinks.slice(1, imgLinks.length); //Get rid of the album elements.

    //Loop through all
    for (image = 0; image < imgLinks.length; image++) {
        var filename = imgLinks[image].split("/")[3];
        download(imgLinks[image], filename, dirTitle); //Send a request to download them.
    }

    console.log("Album has finished downloading! In DIR: " + dirTitle);
}

function removeSpecialCharacters(dir) {
    var newDir = ""; //The newDir with removed invalid characters.

    for (letter = 0; letter < dir.length; letter++) {
        if (unallowChar.indexOf(dir.charAt(letter)) === -1) { //If the char is valid.
            newDir += dir.charAt(letter); //If the character is valid add it to the newDir.
        }
    }

    console.log(newDir);

    return newDir;
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
