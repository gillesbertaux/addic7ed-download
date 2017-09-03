const addic7edApi = require('addic7ed-api')
const notifier    = require('node-notifier');

const arr     = process.argv
const show    = process.argv[2]
const ep      = parseInt(process.argv[3])
const season  = parseInt(process.argv[4])
const dpath   = 'PATH HERE'

if (arr.length = 5) {
  console.log('Params ok...');

  addic7edApi.search(show, season, ep, ['fre']).then(
    (subtitlesList) => {
      console.log('Searching...')

      const subInfo = subtitlesList[0]

      if (subInfo) {
        console.log('Found subs...')
        console.log(`Response size: ${subtitlesList.length}...`)

        addic7edApi.download(subInfo, `${dpath}${show}S${season}E${ep}.srt`).then(() => {
          console.log(`Subtitles file saved on ${dpath}`)

          notifier.notify({
            'title': `${show} subtitles ready`,
            'message': `Subtitles file saved on ${dpath}`
          });
      })
    }
  })
} else {

  console.log('Missing arguments!')
  notifier.notify({
    'title': `${show} subtitles failed`,
    'message': 'Missing arguments'
  });
}