const feedsContener = document.querySelector('.feeds-feeds')
let userInformation = JSON.parse(localStorage.getItem('userInformation'));

let articles = JSON.parse(localStorage.getItem('articles'));


console.log(articles)
const renderArticles = function(data){
    feedsContener.innerHTML = '';
   
    data.filter(fil => fil.userId === userInformation.userId).forEach( article => {
        
        let html = `
        <div class="feed-feed">
                   
        <div class="feed-feed-part1">
          <img src="${article.photoUrl}" alt="${article.headline}">
        </div>
        <div class="feed-feed-part2">
          <h1>${article.headline}</h1>
          <p>${article.category}</p>
        </div>


      </div>
        
        `;

        feedsContener.insertAdjacentHTML('afterbegin', html)

    });
}

renderArticles(articles)


// console.log(userInformation)
// if(!userInformation){
//     window.location.href = '/index.html';
//     return
//   }

