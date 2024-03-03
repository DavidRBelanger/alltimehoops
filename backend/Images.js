const fs = require('fs');
const path = require('path');
const readline = require('readline');
const admin = require('firebase-admin');
const serviceAccount = require('C:/Users/drbx3/Documents/VSProjects/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-8fbf803424.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://basketballstats-f03ae.appspot.com"
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function uploadImage(year, file, caption) {
  const filePath = path.join(__dirname, 'C:\Users\drbx3\Documents\Fall 2023-2024\alltimehoops\Images', year.toString(), file);
  const destination = `images/${year}/${file}`;

  await bucket.upload(filePath, {
    destination: destination,
    public: true,
    metadata: {
      contentType: 'image/jpeg',
      cacheControl: 'public, max-age=31536000',
    },
  });

  const url = `https://storage.googleapis.com/${bucket.name}/${destination}`;

  await db.collection('images').add({
    year: year,
    file: file,
    caption: caption,
    url: url
  });
}

function uploadImagesForYear(year) {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, 'const fs = require('fs');
    const path = require('path');
    const readline = require('readline');
    const admin = require('firebase-admin');
    const serviceAccount = require('C:/Users/drbx3/Documents/VSProjects/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-8fbf803424.json');
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "gs://basketballstats-f03ae.appspot.com"
    });
    
    const bucket = admin.storage().bucket();
    const db = admin.firestore();
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    async function uploadImage(year, file, caption) {
      const filePath = path.join(__dirname, 'C:\Users\drbx3\Documents\Fall 2023-2024\alltimehoops\Images', year.toString(), file);
      const destination = `images/${year}/${file}`;
    
      await bucket.upload(filePath, {
        destination: destination,
        public: true,
        metadata: {
          contentType: 'image/jpeg',
          cacheControl: 'public, max-age=31536000',
        },
      });
    
      const url = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    
      await db.collection('images').add({
        year: year,
        file: file,
        caption: caption,
        url: url
      });
    }
    
    function uploadImagesForYear(year) {
      return new Promise((resolve, reject) => {
        const dir = path.join(__dirname, 'path/to/images', year.toString());
    
        fs.readdir(dir, (error, files) => {
          if (error) {
            console.error(`Error reading directory for year ${year}:`, error);
            reject(error);
            return;
          }
    
          let count = 0;
    
          files.forEach(file => {
            rl.question(`Enter a caption for ${file}: `, async (caption) => {
              try {
                await uploadImage(year, file, caption);
                console.log(`Uploaded ${file} with caption: ${caption}`);
              } catch (error) {
                console.error(`Error uploading ${file}:`, error);
              }
    
              count++;
    
              if (count === files.length) {
                resolve();
              }
            });
          });
        });
      });
    }
    
    async function uploadImagesForAllYears() {
      for (let i = 1951; i <= 2022; i++) {
        await uploadImagesForYear(i);
      }
    
      rl.close();
    }
    
    uploadImagesForAllYears();', year.toString());

    fs.readdir(dir, (error, files) => {
      if (error) {
        console.error(`Error reading directory for year ${year}:`, error);
        reject(error);
        return;
      }

      let count = 0;

      files.forEach(file => {
        rl.question(`Enter a caption for ${file}: `, async (caption) => {
          try {
            await uploadImage(year, file, caption);
            console.log(`Uploaded ${file} with caption: ${caption}`);
          } catch (error) {
            console.error(`Error uploading ${file}:`, error);
          }

          count++;

          if (count === files.length) {
            resolve();
          }
        });
      });
    });
  });
}

async function uploadImagesForAllYears() {
  for (let i = 1951; i <= 2022; i++) {
    await uploadImagesForYear(i);
  }

  rl.close();
}

uploadImagesForAllYears();