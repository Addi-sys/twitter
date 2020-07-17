let tweetCards = []

let MAX_CHAR = 140

let tweetContents = document.getElementById("tweetArea")

const tweetButton = () => {
   
    let tweet = document.getElementById("tweetArea").value
    let itemTweet = {contents:tweet}
    tweetCards.push(itemTweet)
    tweetCards.reverse()    
    document.getElementById('tweetArea').value = ``
    document.getElementById("remainNumber").innerHTML = `140`

    render(tweetCards)
}


const render = (array) => {
    let tweetHTML = array
    .map((item,index) => {
        let html = "";
        html += `<div><div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.contents}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">sample text</p>
          <a onclick="remove(${index})" href="#" class="card-link">Delete</a>
          <a href="#" class="card-link"></a>
        </div>
      </div></div>`
        return html
    }).join("")
    
    document.getElementById("feedArea").innerHTML = tweetHTML
}

const remove = (index) => {
    tweetCards.splice(index, 1)
    
    render(tweetCards)
  }


const countLetter = () => {
    let numOfText = tweetContents.value.length
    let remain = MAX_CHAR - numOfText
    if(remain<0){
        document.getElementById("remainNumber").style.color = 'red'
    }else{
        document.getElementById("remainNumber").style.color = 'black'
    }

    document.getElementById("remainNumber").innerHTML = remain
}

tweetContents.addEventListener("input",countLetter)