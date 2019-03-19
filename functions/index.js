const functions = require('firebase-functions')
// const admin = require('firebase-admin')
// const serviceAccount = require('./beermo.json')


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://beermo-1552602774929.firebaseio.com/'
// });

const cors = require('cors')({origin: true})
const fs = require('fs')
const uuidNode = require('uuid-v4')

const gcconfig = {
    projectId: "beermo-1552602774929",
    keyFilename: "beermo.json"
}

const gcs = require('@google-cloud/storage')(gcconfig)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
            console.log(err);
            return response.status(500).json({
                error: err
            });
        });
        const bucket = gcs.bucket("beermo-1552602774929.appspot.com");

        return bucket.upload(
            "/tmp/uploaded-image.jpg", {
                uploadType: "media",
                destination: "/places/" + (Math.random() * 99999) + ".jpg",
                metadata: {
                    metadata: {
                        contentType: "image/jpeg",
                        firebaseStorageDownloadTokens: Math.random() * 99999
                    }
                }
            },
            {resumable: false},
            (err, file) => {
                if (!err) {
                    return response.status(201).json({
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                            bucket.name +
                            "/o/" +
                            encodeURIComponent(file.name) +
                            "?alt=media&token=" +
                            (Math.random() * 99999)
                    });
                } else {
                    console.log(err);
                    return response.status(500).json({
                        error: err
                    });
                }
            }
        );
    });
});
