const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const { cloudName, apiKey, apiSecret } = require('./api');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-video', async (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);

  const { manifestJson, videoName } = req.body;

  //------------------- create video -------------------
  const paramsToSign = {
    manifest_json: JSON.stringify(manifestJson),
    public_id: videoName,
    timestamp: timestamp,
  };

  const serializedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join('&');

  const signatureString = `${serializedParams}${apiSecret}`;
  const signature = crypto
    .createHash('sha1')
    .update(signatureString)
    .digest('hex');

  const data = new URLSearchParams();
  data.append('public_id', videoName);
  data.append('resource_type', 'video');
  data.append('manifest_json', JSON.stringify(manifestJson));
  data.append('timestamp', timestamp);
  data.append('api_key', apiKey);
  data.append('signature', signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/create_video`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('----response----', result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //---------------create zip template ------------------------------
  // const manifestPath = path.join(__dirname, 'CltManifest.json');
  // fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2));

  // const zipPath = path.join(__dirname, 'care-template.zip');
  // const output = fs.createWriteStream(zipPath);
  // const archive = archiver('zip');

  // output.on('close', async () => {
  //   console.log(`${archive.pointer()} total bytes`);

  //   // const file = fs.createReadStream(zipPath);

  //   const paramsToSign = {
  //     timestamp: timestamp,
  //     folder: 'templates',
  //   };

  //   const serializedParams = Object.keys(paramsToSign)
  //     .sort()
  //     .map((key) => `${key}=${paramsToSign[key]}`)
  //     .join('&');

  //   const signatureString = `${serializedParams}${apiSecret}`;
  //   const signature = crypto
  //     .createHash('sha1')
  //     .update(signatureString)
  //     .digest('hex');

  //   const formData = new URLSearchParams();
  //   formData.append(
  //     'file',
  //     `data:application/zip;base64,${fs
  //       .readFileSync(zipPath)
  //       .toString('base64')}`
  //   );
  //   formData.append('api_key', apiKey);
  //   formData.append('timestamp', timestamp);
  //   formData.append('signature', signature);
  //   formData.append('resource_type', 'auto');
  //   formData.append('folder', 'templates');

  //   try {
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         body: formData.toString(),
  //       }
  //     );

  //     const result = await response.json();
  //     res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // });

  // archive.on('error', (err) => {
  //   throw err;
  // });

  // archive.pipe(output);
  // archive.file(manifestPath, { name: 'CltManifest.json' });
  // archive.finalize();
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
