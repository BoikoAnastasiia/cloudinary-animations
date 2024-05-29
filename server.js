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

  var manifest_json = {
    type: 'video',
    width: 1280,
    height: 720,
    duration: 10,
    fps: 30,
    vars: {
      bgColor: '#8e998a',
      imageUrl:
        'https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg',
      sponsoredText: 'Elder Care & Nursing Home',
      titleText: 'The more we care, the  more beautiful life becomes.',
      ctaText: 'Read more',
    },
    tracks: [
      {
        clips: [
          {
            color: '{{bgColor}}',
            type: 'color',
          },
        ],
      },
      {
        width: 920,
        height: 720,
        x: 0,
        y: 0,
        clipDefaults: {
          clipDuration: 10000,
          clipEffect: {
            name: 'KenBurns',
            easing: 'easeinout',
            zoom: 2,
            center: [0.5, 0.5],
            direction: 'backward',
          },
        },
        clips: [
          {
            media: ['{{imageUrl}}', 'image', 'fetch'],
            type: 'image',
            transformation: 'c_fill',
          },
        ],
      },
      {
        keyframes: {
          0: {
            y: 430,
            opacity: 0,
          },
          2000: {
            y: 430,
            opacity: 0.5,
          },
          3000: {
            y: 470,
            opacity: 1,
          },
        },
        x: 950,
        width: 300,
        height: 30,
        radius: '30%',
        clips: [
          {
            border: 3,
            borderColor: 'white',
            type: 'color',
          },
        ],
      },
      {
        keyframes: {
          0: {
            y: 435,
            opacity: 0,
          },
          2000: {
            y: 435,
            opacity: 0.5,
          },
          3000: {
            y: 475,
            opacity: 1,
          },
        },
        x: 950,
        width: 300,
        clipDefaults: {
          fontSize: 20,
          fontColor: 'white',
          textMaxWidth: 300,
          textAlign: 'center',
        },
        clips: [
          {
            text: '{{ctaText}}',
            type: 'text',
          },
        ],
      },
      {
        x: 950,
        keyframes: {
          0: {
            y: 290,
            opacity: 0,
          },
          1000: {
            y: 290,
            opacity: 0,
          },
          2000: {
            y: 280,
            opacity: 1,
          },
        },
        clipDefaults: {
          fontSize: 14,
          fontColor: 'white',
        },
        clips: [
          {
            text: '{{sponsoredText}}',
            type: 'text',
          },
        ],
      },
      {
        x: 950,
        width: 300,
        height: 300,
        keyframes: {
          0: {
            y: 290,
          },
          1000: {
            y: 300,
          },
        },
        clipDefaults: {
          textAlign: 'left',
          fontSize: 32,
          fontType: 'Merriweather',
          fontColor: 'white',
        },
        clips: [
          {
            text: '{{titleText}}',
            type: 'textArea',
          },
        ],
      },
    ],
  };

  const manifestJson = {
    type: 'video',
    width: 800,
    height: 450,
    duration: 6,
    fps: 30,
    vars: {
      // bgColor: '#8e998a',
      // sponsoredText: 'GOGipper',
      // titleText: 'In Gipper We Trust',
      // ctaText: 'Dont click here',
      // imageUrl: 'cld-sample-4',
      // transformation: 'c_fill',
    },
    tracks: [
      {
        width: 720,
        height: 900,
        x: 0,
        y: 0,
        clips: [
          {
            media: 'main_afgn7t',
            type: 'image',
          },
        ],
      },
      {
        keyframes: {
          0: { opacity: 0 },
          1500: { opacity: 0 },
          3000: { opacity: 1 },
        },
        x: 290,
        y: -40,
        width: 540,
        height: 530,
        clips: [
          {
            type: 'image',
            media: 'template_98_shadow_er1rqu',
          },
        ],
      },
      {
        x: 370,
        y: 31,
        width: 400,
        height: 388,
        clips: [
          {
            type: 'image',
            media: 'main_rectangle_container_fee0dv',
          },
        ],
      },
      {
        keyframes: {
          0: { y: -260 },
          1400: { y: 48 },
        },
        x: 386,
        width: 145,
        height: 177,
        clips: [
          {
            type: 'image',
            media: 'top_left_photo_frame_v6jbis',
          },
        ],
      },
      {
        keyframes: {
          0: { y: 690 },
          1400: { y: 230 },
        },
        x: 615,
        width: 145,
        height: 177,
        clips: [
          {
            type: 'image',
            media: 'bottom_right_photo_frame_ptd2t2',
          },
        ],
      },
      {
        keyframes: {
          0: { y: 545 },
          1400: { y: 399 },
        },
        x: 384,
        width: 11,
        height: 1,
        clips: [
          {
            type: 'image',
            media: 'left_bottom_first_part_cross_element_fggeq5',
          },
        ],
      },
      {
        keyframes: {
          0: { y: 545 },
          1400: { y: 394 },
        },
        x: 389,
        width: 1,
        height: 11,
        clips: [
          {
            type: 'image',
            media: 'left_bottom_second_part_cross_element_at5ic4',
          },
        ],
      },
      {
        x: 393,
        y: 55,
        width: 354,
        height: 341,
        clips: [
          {
            type: 'video',
            media: ['test', 'video'],
            transformation: '{{transformation}}',
          },
        ],
      },
      {
        keyframes: {
          0: { opacity: 0 },
          3000: { opacity: 0 },
          5000: { opacity: 1 },
        },
        x: 148,
        y: 317,
        width: 73,
        height: 1,
        clips: [
          {
            type: 'image',
            media: 'horizontal_stripe_fzyqks',
          },
        ],
      },
      {
        keyframes: {
          0: { opacity: 0 },
          3000: { opacity: 0 },
          5000: { opacity: 1 },
        },
        x: 64,
        y: 105,
        width: 242,
        height: 213,
        clips: [
          {
            type: 'image',
            media: 'title_text_qrzcnj',
          },
        ],
      },
      {
        keyframes: {
          0: { opacity: 0 },
          3000: { opacity: 0 },
          5000: { opacity: 1 },
        },
        x: 69,
        y: 338,
        width: 233,
        height: 71,
        clips: [
          {
            type: 'image',
            media: 'event_info_y8bnjy',
          },
        ],
      },
      {
        keyframes: {
          0: { opacity: 0 },
          3000: { opacity: 0 },
          5000: { opacity: 1 },
        },
        x: 155,
        y: 50,
        width: 62,
        height: 61,
        clips: [
          {
            type: 'image',
            media: 'logo_hkek2l',
          },
        ],
      },
    ],
  };
  //------------------- create video -------------------
  const paramsToSign = {
    manifest_json: JSON.stringify(manifestJson),
    public_id: 'test_video19',
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
  data.append('public_id', 'test_video19');
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
