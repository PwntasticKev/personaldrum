const AWS = require("aws-sdk")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRETKEY,
  region: process.env.AWS_REGION
})

const S3 = new AWS.S3()

function uploadPhoto(req, res) {
  console.log("this", req)

  // console.log('photo in back', req.body.filename, process.env.AWS_ACCESSKEY) // remove this before upload.. dont console log your access key
  let photo = req.body,
    buf = new Buffer(
      photo.file.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    ),
    params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Body: buf,
      Key: photo.filename,
      ContentType: photo.filetype,
      ACL: "public-read"
    }

  console.log(buf)

  S3.upload(params, (err, data) => {
    console.log("s3", req)

    const { songName, albumName, description, sheeturl, artist } = req.body
    console.log("thhhhhiiis one", typeof sheeturl, sheeturl)

    console.log(err, data)
    // console.log('this', req.users.id) // with turnary
    // let response, code
    // err ? (response = err, code = 500) : (response = data, code = 200)
    if (err) {
      res.status(500).send(err)
    } else {
      const db = req.app.get("db")
      db.imglinks([req.user.id, data.Location]).then(url => {
        console.log(description, sheeturl, "up!")

        db.create_tab([
          req.user.id,
          songName,
          url[0].imgurl,
          albumName,
          description,
          sheeturl,
          artist
        ])
        res.status(200).send("newtab!")
      })
    }
  })
}

module.exports = function(app) {
  app.post("/api/uploadPhoto", uploadPhoto)
}
