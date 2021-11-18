require('dotenv').config()
const TwitterApi = require('twitter-api-v2').default
const dayjs = require('dayjs')

const getLastTweetWithHashtag = async ({ client, username, hashtag, maxId = '' }) => {
    const options = { count: 200 }
    if (maxId) { options.max_id = maxId }
    const response = await client.v1.userTimeline(username, options)
    const tweets = response.tweets
    const tweet = tweets.find(o => o.full_text.toLowerCase().includes(hashtag.toLowerCase()))
    if (tweet) { return tweet }
    return await getLastTweetWithHashtag({ client, username, hashtag, maxId: tweets.reverse()[0].id })
}

const tweetImage = async ({ filePath, message }) => {
    const client = new TwitterApi({
        appKey: process.env.TWITTER_CONSUMER_KEY,
        appSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_KEY,
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    })

    const tweet = await getLastTweetWithHashtag({
        client,
        username: 'internetztube',
        hashtag: '#EsDampft'
    })

    const tweetDate = dayjs(tweet.created_at).format('YYYY/MM/DD')
    const nowDate = dayjs().format('YYYY/MM/DD')

    // Die Kacke war heute schon am dampfen. Genug ist genug.
    if (tweetDate === nowDate) {
        return 'Die Kacke war heute schon am dampfen. Genug ist genug.'
    }
    const mediaId = await client.v1.uploadMedia(filePath)
    return await client.v1.tweet(message, {
        media_ids: mediaId,
        in_reply_to_status_id: tweet.id_str
    })
}

module.exports = { tweetImage }
