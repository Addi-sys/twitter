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

setInterval(function () {
    randomNumTweets();
}, 3000);



// Autocomplete function

// function myAmazingFunction(data) {
//     document.getElementById('output').innerHTML = data;
// }

// /* this variable will hold the script tag with your desired data */
// var myScript = '';

// /* this section handles what happens after a key is pressed inside your input text box */
// document.getElementById('searchbox').onkeyup = function() {
//     if (myScript !== '') {
//         document.body.removeChild(myScript);
//     }
//     /* this variable stores whatever is in the input text box */
//     var stuff_in_text_box = document.getElementById('searchbox').value;

//     /* this is the script that will hold the data we're trying to get */
//     myScript = document.createElement('script');

//     /* this sets the src of the script equal to the url of the data */
//     myScript.src = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=myAmazingFunction&search=' + stuff_in_text_box;

//     /* this attaches the script to the body of the page */
//     document.body.appendChild(myScript);
// };
let tweetCards = []
let tweetId = 0

let MAX_CHAR = 140

let tweetContents = document.getElementById("tweetArea")

const countLetter = () => {
    let numOfText = tweetContents.value.length
    let remain = MAX_CHAR - numOfText
    if (remain < 0) {
        document.getElementById("remainNumber").style.color = 'red'
    } else {
        document.getElementById("remainNumber").style.color = 'white'
    }
    $('#indicatorContainer').data('radialIndicator').animate(100 - remain * 100 / 140)

    document.getElementById("remainNumber").innerHTML = remain
}

const tweetButton = () => {
    doReverse()
    tweetId++
    console.log("childId:",tweetId)
    let tweet = document.getElementById("tweetArea").value
    console.log("content", tweet)
    if (tweet == '') {
        alert("Please enter your tweet contents!");
        return
    }
    let itemTweet = { name: 'Marc Coxon', logo: 'img/profile.jpeg', contents: tweet, isLike: false, isRetweet: false, childId: tweetId, isComment: false, commentContents: '', parentId: null, createTime: Date.now() }
    tweetCards.push(itemTweet)
    doReverse()
    document.getElementById('tweetArea').value = ``
    document.getElementById("remainNumber").innerHTML = `140`
    render(tweetCards)
    remain = 140;
    countLetter();
}

const retweetButton = (id) => {
    doReverse()
    tweetId++
    console.log(tweetId)
    let retweet = document.getElementById("childContent" + id).value
    console.log("content", retweet)
    let itemReTweet = { name: 'Marc Coxon', logo: 'img/profile.jpeg', contents: retweet, isLike: false, isRetweet: true, childId: tweetId, isComment: false, commentContents: '', parentId: id, createTime: Date.now() }
    tweetCards.push(itemReTweet)
    console.log("here", tweetCards)
    doReverse()
    render(tweetCards)
}

const render = (array) => {
    let tweetHTML = array
        .map((item, index) => {

            if (item.parentId == null) {
                let html = "";
                html += `
        <div>
            <div class="card" style="width: auto; margin:10px; border-radius: 20px;">
                <div class="card-body card-styles">
                    <div>
                    <div class="image-timecounter">
                    
                    <img src="${item.logo}" alt="profile image" height="55px" width="50px"
                                style="border-radius: 50%; margin-right: 10px;">
                    <span>${item.name}</span>
                    <i class="far fa-badge-check"></i> 
                    <span>${moment(item.createTime).fromNow()}</span>
                    </div>
                        
                        <div class="content-tweet">
                                <p class="card-title">${item.contents}</p>
                        </div>
                     </div>
                     <div class="card-functions row">
                     <div class="card-link" onclick="popupFunction(${item.childId})"><i class="fal fa-retweet"></i></div>
                        <div id="likedTweet${item.childId}" onclick="toggleLike(${item.childId})"><i class="far fa-heart" href="#" class="card-link" > 7</i></div>
                        <div class="card-link" onclick="toggleComment(${item.childId})"><i class="far fa-comment"></i></div>
                        <div onclick="removeTweet(${item.childId})" style="cursor: pointer;"><i class="fal fa-trash-alt"></i></div>
                     </div>
                     <div id="commentedTweet${item.childId}"></div>   
                </div>
            </div>
            <div id="myModal${item.childId}" class="modal card-styles">
                <div class="modal-content">
                    <div class="close" id="close${item.childId}">&times;</div>
                    <div class="row">
                        <div class="col-sm-2">
                            <img src="${item.logo}" alt="profile image" height="55px" width="50px" style="border-radius: 50%;">
                        </div>
                        <div class="col=sm-10 popupChildContents">            
                            <input class="input-retweet" placeholder="Add comment..."type="text" id="childContent${item.childId}">
                        </div>
                    </div>
                    <div class="content-retweet">
                        <img src="${item.logo}" alt="profile image" height="55px" width="50px"
                        style="border-radius: 50%;">
                        <span>${item.name}</span> <i class="far fa-badge-check"></i>
                        <span>${moment(item.createTime).fromNow()}
                        <p class="retweet-child-content">${item.contents}</p>
                    </div>
                
                    
                <a href="#" class="card-link" onclick="retweetButton(${item.childId})">Retweet</a>
                </div>
            </div>    
        </div>
        </div>`;
                return html;
            } else if (item.parentId != null) {
                return renderRetweet(item.childId, item.parentId)
            }
        }).join("")
    document.getElementById("feedArea").innerHTML = tweetHTML

}



const renderRetweet = (childId, parentId) => {
    let child = tweetCards.filter((xyz) => {

        return xyz.childId == childId
    })
    console.log("retweet child", child)
    let parent = tweetCards.filter((xyz) => {
        return xyz.childId == parentId
    })
    console.log("parent here:", parent)
    console.log("child contents:", child[0].contents)
    let html1 = ''
    if (parent.length != 0) {
        html1 += `<div>
                <div class="card" style="width: auto; margin:10px; border-radius: 20px;">
                    <div class="card-body card-styles">
                        <div>
                        <div class="image-timecounter">
                            <img src="${child[0].logo}" alt="profile image" height="55px" width="50px"
                            style="border-radius: 50%;margin-right: 10px;"> <span>${child[0].name}</span> <i class="far fa-badge-check"></i> <span>${moment(child[0].createTime).fromNow()}</span>
                            <p class="retweet-child-content">${child[0].contents}</p>
                            </div>
                            <div class="content-retweet">
                                <img src="${parent[0].logo}" alt="profile image" height="55px" width="50px"
                            style="border-radius: 50%;">
                            <span>${parent[0].name}</span> <i class="far fa-badge-check"></i>
                            <span>${moment(parent[0].createTime).fromNow()}
                                <p class="retweet-child-content">${parent[0].contents}</p>
                            </div>
                        </div>
                        <div class="card-functions row">
                            <div class="card-link" onclick="popupFunction(${child[0].childId})"><i class="fal fa-retweet"></i></div>
                            <div id="likedTweet${child[0].childId}" onclick="toggleLike(${child[0].childId})"><i class="far fa-heart" href="#" class="card-link" > 7</i></div>
                            <div class="card-link" onclick="toggleComment(${child[0].childId})"><i class="far fa-comment"></i></div>
                            <div onclick="removeTweet(${child[0].childId})" style="cursor: pointer;"><i class="fal fa-trash-alt"></i></div>
                     </div>
                        <div id="commentedTweet${child[0].childId}"></div>
                    </div>
                </div>
                <div id="myModal${child[0].childId}" class="modal card-styles">
                <div class="modal-content">
                    <div class="close" id="close${child[0].childId}">&times;</div>
                    <div class="row">
                        <div class="col-sm-2">
                            <img src="${child[0].logo}" alt="profile image" height="55px" width="50px" style="border-radius: 50%;">
                        </div>
                        <div class="col=sm-10 popupChildContents">            
                            <input class="input-retweet" placeholder="Add comment..."type="text" id="childContent${child[0].childId}">
                        </div>
                    </div>
                    <div class="content-retweet">
                        <img src="${parent[0].logo}" alt="profile image" height="55px" width="50px"
                        style="border-radius: 50%;">
                        <span>${parent[0].name}</span> <i class="far fa-badge-check"></i>
                        <span>${moment(parent[0].createTime).fromNow()}
                        <p class="retweet-child-content">${parent[0].contents}</p>
                    </div>    
                    <a href="#" class="card-link" onclick="retweetButton(${child[0].childId})">Retweet</a>
                </div>
            </div>  
                </div>    
            </div>`

        return html1
    } else {
        html1 += `<div>
                    <div class="card" style="width: auto; margin:10px; border-radius: 20px;">
                        <div class="card-body card-styles">
                            <div class="image-timecounter">
                                <img src="${child[0].logo}" alt="profile image" height="55px" width="50px"
                    style="border-radius: 50%;margin-right: 10px;"> <span>${child[0].name}</span> <i class="far fa-badge-check"></i> <span>${moment(child[0].createTime).fromNow()}</span>
                                <p class="retweet-child-content">${child[0].contents}</p>
                            </div>
                        <div class="content-retweet">
                            <p class="card-title" style="color: black;"><i>This original tweet has been removed by the owner.<i/></p>
                        </div>
                        
                        <div class="card-functions row">
                            <div class="card-link" onclick="popupFunction(${child[0].childId})"><i class="fal fa-retweet"></i></div>
                            <div id="likedTweet${child[0].childId}" onclick="toggleLike(${child[0].childId})"><i class="far fa-heart" href="#" class="card-link" > 7</i></div>
                            <div class="card-link" onclick="toggleComment(${child[0].childId})"><i class="far fa-comment"></i></div>
                            <div onclick="removeTweet(${child[0].childId})" style="cursor: pointer;"><i class="fal fa-trash-alt"></i></div>
                        </div>
                        <div id="commentedTweet${child[0].childId}"></div>   
                    </div>
                </div>`
        return html1
    }
}




const toggleLike = (childId) => {
    let childLike = tweetCards.filter((child) => child.childId == childId)
    console.log("childLike", childLike)
    console.log("tweetCards:", tweetCards)
    childLike[0].isLike = !childLike[0].isLike
    if (childLike[0].isLike == true) {
        return document.getElementById("likedTweet" + childId).innerHTML =
            ` <i class="fas fa-heart"> 8</i>`
    } else if (childLike[0].isLike == false) {
        return document.getElementById("likedTweet" + childId).innerHTML =
            ` <i class="far fa-heart"> 7</i>`
    }
}

const toggleComment = (childId) => {
    let childComment = tweetCards.filter((child) => child.childId == childId)
    console.log("childLike", childComment[0])
    childComment[0].isComment = !childComment[0].isComment

    if (childComment[0].isComment == true) {
        return document.getElementById("commentedTweet" + childId).innerHTML =
            `<div id="commentBox${childComment[0].childId}" style="border: 1px solid gray; border-radius:20px; width: 100%; height: 100%; margin-top:5px;">
            <div class="row comment-box-info" style="width: 100%; margin: 5px;">
                <div class="col-sm-1" style="item-align: center;justify-content: center;padding:0;">
                    <img src="img/profile.jpeg" alt="profile image" height="45px" width="45px" style="border-radius: 50%;">
                </div>
                <div class="col-sm-11" style="item-align: center;justify-content: center;padding:0;">
                    <input id="commentArea${childComment[0].childId}" placeholder="Add comment ..." style="width:100%;height: 45px; max-width:500px; border: none; outline:none; border-radius: 15px; background-color: transparent; color: rgba(255, 255, 255, 0.7);">
                </div>
            </div>
            
        </div>`
    } else if (childComment[0].isComment == false) {
        return document.getElementById("commentedTweet" + childId).innerHTML =
            ``
    }
}

const comment = (childId) => {
    let x = tweetCards.filter((child) => child.childId == childId)
    console.log("commentBox:", x[0])
    x[0].commentContents = document.getElementById("commentArea" + childId).value
}

const removeTweet = (deletedTweetId) => {
    console.log("deleting " + deletedTweetId)
    let idx = -1;
    tweetCards.map((tweet, index) => {
        if (tweet.childId == deletedTweetId) {
            idx = index
            return
        }
    })
    if (idx != -1) {
        console.log("deleting idx " + idx)
        tweetCards.splice(idx, 1)
    }
    console.log("after delete", tweetCards)
    render(tweetCards)
}

const doReverse = () => {
    tweetCards.reverse()
}
const popupFunction = (childId) => {
    // Get the modal
    let modal = document.getElementById("myModal" + childId);

    // Get the <span> element that closes the modal
    let span = document.getElementById("close" + childId);

    // When the user clicks the button, open the modal 
    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


tweetContents.addEventListener("input", countLetter)

$('#indicatorContainer').radialIndicator({
    barColor: '#87CEEB',
    percentage: true,
    displayNumber: false
});