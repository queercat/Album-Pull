# Album Pull
Download an entire imgur album simply. [![Build Status](https://travis-ci.org/nicolsek/Album-Pull.svg?branch=master)](https://travis-ci.org/nicolsek/Album-Pull)

## Introduction

> I had a significant amount of annoyance when I was unable to download imgur albums the way I wanted to. So I decided to create a utility that allows me to download imgur albums easily. 

## Code Samples

> The way that I download the photos is a little interesting. I pipe the response from the request module into the fs module and write that to the directory.
```javascript
function download(link, filename, dir) {
      request(link).pipe(fs.createWriteStream(dir + "/" + filename));
}
```

## Installation

First grab the repository or npm package.
> `git clone https://github.com/nicolsek/Album-Pull`

Then install the requirement for node.
> `npm install`

Album Pull is now ready to use!

![Alt Text](https://media.giphy.com/media/4tHeTWcjmRRII/giphy.gif)

## Usage

The structure to download an album looks like this.
> `node ./ <imgur_link> <optional_custom_path>`
