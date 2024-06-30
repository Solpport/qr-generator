/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    /* Pass your questions in here */

    {
        type: 'input',       // This specifies that the input type is text
        name: 'url',         // This is the key in the answers object
        message: 'Enter the URL you want to turn into a QR code:', // This is the prompt message
      },

  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.url;
    var qr_image = qr.image(url);
    qr_image.pipe(fs.createWriteStream("qr_img.png"));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
  });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment.");
      alert("Prompt couldn't be rendered in the current environment.");
    } else {
      // Something else went wrong
      console.log("Something else went wrong.");
      alert("Something went wrong.");
    }
  });
  