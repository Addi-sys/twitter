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