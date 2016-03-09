#### Pinterest Image Slider

Pinterest users can select a public board and this app displays all images in that board one after each other by using a short cross-fade between 2 consecutive images.

#### Installation

 - `npm install` install all dependencies
 - `npm run watch` starts watchify
 - `npm run build` builds and minifies the code and generates a source map

Note that the [Pinterest API](https://developers.pinterest.com/docs/getting-started/introduction/) requires a https connection, so you have to start a local webserver like so:

`ws --key server.key --cert server.crt`

For generating a key and a certificate read the information on [npm](https://www.npmjs.com/package/local-web-server).

Linux users might value this information on [Stackoverflow](http://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate) about getting Chrome to accept self-signed certificates.


#### Setting up your own app

Please replace the app key in the [code](https://github.com/abudaan/pinterest-slider/blob/master/js/util/pdk_wrapper.js#L2) by your own app key: read the [developer documentation](https://developers.pinterest.com/docs/api/overview/) on the Pinterest site.