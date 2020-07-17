let tweetCards = []


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
    let tweet = document.getElementById("tweetArea").value
    let itemTweet = { contents: tweet, createTime: Date.now() }
    tweetCards.push(itemTweet)
    document.getElementById('tweetArea').value = ``
    document.getElementById("remainNumber").innerHTML = `140`
    doReverse()
    render(tweetCards)
    remain=140;
    countLetter();
}

const doReverse = ()=>{
    tweetCards.reverse()
}

const render = (array) => {
    let tweetHTML = array
        .map((item, index) => {
            let html = "";
            html += `<div>
        <div class="tweetcard">
        <div class="card" style="width: 45rem;">
        <div class="card-body">

        <div>
        
        <div class="name">MQ Pham ✓ </div>
        <div class="tweettime"> @phammsta • ${moment(item.createTime).fromNow()}</div>
        </div>

        <div style="float: right;">
          <a onclick="remove(${index})" href="#" class="card-link">Delete</a>
          <a href="#" class="card-link">Like</a>
          </div>
         
          <h5 class="tweettext">${item.contents}</h5>
          
        </div>
      </div>
      </div>
      </div>`

            return html
        }).join("")

    document.getElementById("feedArea").innerHTML = tweetHTML

}


const remove = (index) => {
    tweetCards.splice(index, 1)

    render(tweetCards)
}



tweetContents.addEventListener("input", countLetter)

$('#indicatorContainer').radialIndicator({
    barColor: '#87CEEB',
    percentage: true,
    displayNumber: false
});
