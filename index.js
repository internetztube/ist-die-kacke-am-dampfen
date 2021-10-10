const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const service = require('./service')


app.get('/', async (req, res) => {
    const path = await service()
    console.log(path)
    if (!path) { return res.status(404).send('Die Kacke ist derzeit nicht am Dampfen.') }
    res.contentType('image/jpg')
    res.set('Content-Disposition', 'inline')
    res.download(path)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})