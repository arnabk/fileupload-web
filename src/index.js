const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');

const port = 3000;

app.use(express.static('public'));

// default options
app.use(fileUpload());

// Create uploaded-files folder, if it does not exist
if(!fs.existsSync('./uploaded-files')) {
  fs.mkdirSync('./uploaded-files');
}

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = req.files.file;
  console.log('file :', file);

  // Use the mv() method to place the file somewhere on your server
  file.mv(`./uploaded-files/${Date.now()}_${file.name}`, function(err) {
    if (err)
      return res.status(500).send(err);

    res.redirect('/uploaded.html');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
