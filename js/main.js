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




function myAmazingFunction(data){
	document.getElementById('output').innerHTML = data;
}

/* this variable will hold the script tag with your desired data */
var myScript = '';

/* this section handles what happens after a key is pressed inside your input text box */
document.getElementById('searchbox').onkeyup = function(){
    if(myScript!==''){
        document.body.removeChild(myScript);
    }
	/* this variable stores whatever is in the input text box */
	var stuff_in_text_box = document.getElementById('searchbox').value;

	/* this is the script that will hold the data we're trying to get */
	myScript = document.createElement('script');
	
	/* this sets the src of the script equal to the url of the data */
	myScript.src = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=myAmazingFunction&search='+stuff_in_text_box;

	/* this attaches the script to the body of the page */
	document.body.appendChild(myScript);
};