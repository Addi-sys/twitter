let tweetCount = [{ header: 'Trending', hash: '#WorldNews', retweets: 2 },
    { header: 'Trending', hash: '#BLACKPINK', retweets: 3 },
    { header: 'Trending', hash: '#BlackOutTuesday', retweets: 1 },
    { header: 'Trending', hash: '#BunBoHue', retweets: 0 }
]


function randomNumTweets() {

    for (i = 0; i < tweetCount.length; i++) {
        tweetCount[i].retweets += Math.round((Math.random() * 10))

        sortCount = tweetCount.sort((a, b) => parseFloat(b.retweets) - parseFloat(a.retweets))

        console.log(sortCount)

        document.getElementById(`trendCard${i}`).innerHTML = `<p>1. ${sortCount[i].header}</p><h6>${sortCount[i].hash}</h6><p id="tweetCount1">${sortCount[i].retweets}k Tweets</p>`
    }
}

setInterval(function() {
    randomNumTweets();
}, 3000);