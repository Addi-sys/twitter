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
    tweetId ++
    console.log(tweetId)
    let tweet = document.getElementById("tweetArea").value
    console.log("content", tweet)
    let itemTweet = {contents:tweet, isLike: false, isRetweet: false, childId: tweetId, isComment: false, commentContents: '', parentId: null, createTime:Date.now()}
    tweetCards.push(itemTweet)
    doReverse()    
    document.getElementById('tweetArea').value = ``
    document.getElementById("remainNumber").innerHTML = `140`
    render(tweetCards)
    remain=140;
    countLetter();
}

const retweetButton = (id) =>{
    
    doReverse()
    tweetId ++
    console.log(tweetId)
    let retweet = document.getElementById("childContent"+id).value
    console.log("content", retweet)
    let itemReTweet = {contents: retweet, isLike: false, isRetweet: true, childId: tweetId, isComment: false, commentContents: '', parentId: id, createTime:Date.now()}
    tweetCards.push(itemReTweet)
    console.log("here", tweetCards)
    doReverse()    
    render(tweetCards)
}

const render = (array) => {
    let tweetHTML = array
    .map((item,index) => {
    
        if(item.parentId == null){
        let html = "";
        html += `
        <div>
            <div class="card" style="width: 24rem;">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">${item.contents}</h5><span>${moment(item.createTime).fromNow()}
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">sample text</p>
                     </div>
                     <div>
                        <a onclick="removeTweet(${item.childId})" href="#" class="card-link">Delete</a>
                        <a href="#" class="card-link" id="likedTweet${item.childId}" onclick="toggleLike(${item.childId})">Like</a>
                        <a href="#" class="card-link" onclick="toggleComment(${item.childId})">Comment</a>
                        <a href="#" class="card-link" onclick="popupFunction(${item.childId})">Retweet-Sign</a>
                     </div>
                     <div id="commentedTweet${item.childId}"></div>   
                </div>
            </div>
            <div id="myModal${item.childId}" class="modal">
                <div class="modal-content">
                <span class="close" id="close${item.childId}">&times;</span>
                <!-- add children info-->
                    <div>
                        <input type="text" id="childContent${item.childId}">
                        <div class="parentTweet">
                            <h5 class="card-title">${item.contents}</h5><span>${moment(item.createTime).fromNow()}
                            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">sample text</p>
                        </div>  
                    </div>
                <a href="#" class="card-link" onclick="retweetButton(${item.childId})">Retweet</a>
                </div>
            </div>    
        </div>
        </div>`;
        return html;
        } else if (item.parentId != null ) {
            return renderRetweet(item.childId, item.parentId)
        }}
        ).join("")
    document.getElementById("feedArea").innerHTML = tweetHTML

}



const renderRetweet = (childId, parentId) =>{
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
    if(parent.length != 0){
    html1 += `<div>
                <div class="card" style="width: 24rem;">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title">${child[0].contents}</h5><span>${moment(child[0].createTime).fromNow()}
                            <div style="border: 1px solid red; border-radius: 25px;">
                                <h5 class="card-title">${parent[0].contents}</h5><span>${moment(parent[0].createTime).fromNow()}
                                <h6 class="card-subtitle mb-2 text-muted"></h6>
                                <p class="card-text">sample text</p>
                            </div>
                        </div>
                        <div>
                            <a onclick="removeTweet(${child[0].childId})" href="#" class="card-link">Delete</a>
                            <a href="#" class="card-link" id="likedTweet${child[0].childId}" onclick="toggleLike(${child[0].childId})">Like</a>
                            <a href="#" class="card-link" onclick="toggleComment(${child[0].childId})">Comment</a>
                            <a href="#" class="card-link" onclick="popupFunction(${child[0].childId})">Retweet-Sign</a>
                        </div>
                        <div id="commentedTweet${child[0].childId}"></div>
                    </div>
                </div>
                <div id="myModal${child[0].childId}" class="modal">
                    <div class="modal-content">
                    <span class="close" id="close${child[0].childId}">&times;</span>
                    <!-- add children info-->
                        <div id="retweetBox${child[0].childId}">
                            <input id="childContent${child[0].childId}" type="text">
                            <div class="parentTweet">
                                <h5 class="card-title">${parent[0].contents}</h5><span>${moment(parent[0].createTime).fromNow()}
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">sample text</p>
                            </div>  
                        </div>
                    <a href="#" class="card-link" onclick="retweetButton(${child[0].childId})">Retweet</a>
                    </div>
                </div>    
            </div>`
        
        return html1
        }else {
            html1 +=`<div>
                <div class="card" style="width: 24rem;">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title">${child[0].contents}</h5><span>${moment(child[0].createTime).fromNow()}
                            <div style="border: 1px solid red; border-radius: 25px;">
                                This original tweet has been removed by the owner.
                            </div>
                        </div>
                        <div>
                            <a onclick="removeTweet(${child[0].childId})" href="#" class="card-link">Delete</a>
                            <a href="#" class="card-link" id="likedTweet${child[0].childId}" onclick="toggleLike(${child[0].childId})">Like</a>
                            <a href="#" class="card-link" id="commentedTweet${child[0].childId}" onclick="toggleComment(${child[0].childId})">Comment</a>
                            <a href="#" class="card-link" onclick="popupFunction(${child[0].childId})">Retweet-Sign</a>
                        </div>
                        <div id="commentedTweet${child[0].childId}"></div>   
                    </div>
                </div>`
        return html1
        }
}

    
                       

const toggleLike = (childId) =>{
    let childLike = tweetCards.filter((child) => child.childId = childId)
    console.log("childLike", childLike[0])
    childLike[0].isLike = !childLike[0].isLike
    if(childLike[0].isLike == true){
        return document.getElementById("likedTweet"+childId).innerHTML = 
        `Like+1`
    } else if (childLike[0].isLike == false) {
        return document.getElementById("likedTweet"+childId).innerHTML = 
        `Like`
    }
}

const toggleComment = (childId) =>{
    let childComment = tweetCards.filter((child) => child.childId = childId)
    console.log("childLike", childComment[0])
    childComment[0].isComment = !childComment[0].isComment
    
    if(childComment[0].isComment == true){
        return document.getElementById("commentedTweet"+childId).innerHTML = 
        `<div id="commentBox${childComment[0].childId} style="border: 1px solid gray; border-radius:25px; width: 20rem; height: 100%;">
            //icon//
            <textarea id="commentArea${childComment[0].childId}"></textarea>
            <a href="#" id="comfirmComment${childComment[0].childId}" onclick="comment(${childComment[0].childId})">Enter</a>
        </div>`
    } else if (childComment[0].isComment == false) {
        return document.getElementById("commentedTweet"+childId).innerHTML = 
        ``
    }
}

const comment = (childId) =>{
    let x = tweetCards.filter((child) => child.childId = childId)
    console.log("commentBox:",x[0])
    x[0].commentContents = document.getElementById("commentArea"+childId).value
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

const doReverse=()=>{
    tweetCards.reverse()
}
const popupFunction = (childId) => {
    // Get the modal
    let modal = document.getElementById("myModal"+childId);

    // Get the <span> element that closes the modal
    let span = document.getElementById("close"+childId);

    // When the user clicks the button, open the modal 
    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
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
