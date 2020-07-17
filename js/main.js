let tweetCount = [0, 0, 0, 0]



function randomNumTweets() {

    for (i = 0; i < tweetCount.length; i++) {
        tweetCount[i] += Math.round(Math.random() * 10)
        document.getElementById(`tweetCount${i+1}`).innerHTML = `${tweetCount[i]}k tweets`
    }
}

setInterval(function() {
    randomNumTweets();
}, 3000);