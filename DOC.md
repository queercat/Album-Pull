# getAlbumHash(url)

Get the hash from an album by splitting the url.

| Param | Type | Description |
| --- | --- | ---
| url | string | the url to get the album has from.|

| Return Type | Description |
| --- | --- |
| string | the album hash. |
# parseImages(err, resp, body)

Parse the images for important information to get the title and links from them.

| Param | Type | Description |
| --- | --- | ---
| err | error | passing an error if the images are invalid.|
| resp | string | the response from the HTTP get req.|
| body | string | the original body from the req.|
# removeSpecialCharacters(dir)

Remove special characters from the directory name to prevent invalid naming.

| Param | Type | Description |
| --- | --- | ---
| dir | string | the directory name.|

| Return Type | Description |
| --- | --- |
| string | the directory name without invalid characters. |
# download(link, filename, dir)

Sends an HTTP get request and pipes it to a write stream.

| Param | Type | Description |
| --- | --- | ---
| link | string | the link we're sending the req to.|
| filename | string | the filename we're writing to.|
| dir | string | the drectory name we're writing to.|
# failExit(why)

Fail the program and display why.

| Param | Type | Description |
| --- | --- | ---
| why | err/string | the reason the program failed if a reason is given.|
