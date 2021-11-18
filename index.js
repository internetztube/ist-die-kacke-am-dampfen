const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const service = require('./services/main')
const twitterService = require('./services/twitter')

app.get('/', async (req, res) => {
    const path = await service()
    if (!path) {
        return res.send('dampft-nicht')
    }
    const response = await twitterService.tweetImage({ filePath: path, message: '#EsDampft' })
    return res.send(response)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})