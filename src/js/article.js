const modal = document.querySelector('.article_modal');
const overlay = document.querySelector('.article_overlay');
const btnCloseModal = document.querySelector('.article_close-modal');
const newArticleBtn = document.querySelector('.newArticleBtn');
const articlesContainer = document.querySelector('.articles');

const modalUp = document.querySelector('.article_modal_up');
const overlayUp = document.querySelector('.article_overlay_up');
const btnCloseModalUp = document.querySelector('.article_close-modal_up');

const newPost = document.querySelector('#newPost');
const title = document.querySelector('#title');
const imageUrl = document.querySelector('#imageUrl');
const content = document.querySelector('#contentText');
const category = document.querySelector('#category');



let articleFromLocal;

const perPage = 4;
let currentPage = 1;


let userInformation = JSON.parse(localStorage.getItem('userInformation'));

if(!userInformation){
  window.location.href = '/index.html';
  
}


// open new post 
const openModal = function () {
  modal.classList.remove('article_hidden');
  overlay.classList.remove('article_hidden');
};
// open new post 
const closeModal = function () {
  modal.classList.add('article_hidden');
  overlay.classList.add('article_hidden');
};


// update model
const openModalUp = function () {
  modalUp.classList.remove('article_hidden');
  overlayUp.classList.remove('article_hidden');
};
// open update post 
const closeModalUp = function () {
  modalUp.classList.add('article_hidden');
  overlayUp.classList.add('article_hidden');
};




btnCloseModalUp.addEventListener('click', closeModalUp);
// close touching screen
overlayUp.addEventListener('click', closeModalUp);

// display model 
newArticleBtn.addEventListener('click', openModal);
// close model
btnCloseModal.addEventListener('click', closeModal);
// close touching screen
overlay.addEventListener('click', closeModal);


// close if press escape
document.addEventListener('keydown', function (e) {

  if (e.key === 'Escape' && !modal.classList.contains('article_hidden')) {
    closeModal();
  }
});



const articlesFromLocal =  function(){
    
   return localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : []

}




const displayArticle =  function(){

  const data = articlesFromLocal();
  const startIndex = (currentPage - 1 ) * perPage;
  const endIndex = startIndex + perPage;
  console.log(startIndex,endIndex)
   
      const slides = data.slice(startIndex,endIndex); 
      console.log(slides)
  articlesContainer.innerHTML = '';

  data.filter(fil => fil.userId === userInformation.userId).forEach((dato,ind) => {

    
        const html = `
        <div class="article">

        <img class="article_Img" src="${dato.photoUrl}">
        <h2 class="article_headline">${dato.headline}</h2>
        <p class="article_category">${dato.category}</p>
        <p class="article_content">${dato.content}</p>

        <div class="modify" >
            <span class="material-symbols-outlined" title="${dato.id}" onclick="editArticle(${dato.id})">
                edit
                </span>
                <span class="material-symbols-outlined" title="${ind}" onclick="deleteArticle(${ind})">
                    delete
                    </span>
        </div>

       

    </div>
        
        `;
        articlesContainer.innerHTML += html;
    });

    currentPage++

};

const editArticle = function(id){
  const postUp = document.querySelector('#post_up');
  const titleUp = document.querySelector('#title_up');
  const imageUrlUp = document.querySelector('#imageUrl_up');
  const contentUp = document.querySelector('#contentText_up');
  const categoryUp = document.querySelector('#category_up');
    const getData = articlesFromLocal();

    const edit = getData.find((fin,index) => fin.id === id);
    titleUp.value = edit.headline;
    imageUrlUp.value = edit.photoUrl;
    contentUp.value = edit.content;
    categoryUp.value = edit.category;
    openModalUp();

    postUp.addEventListener('submit', (e)=>{

      e.preventDefault();

      const update = {
          id : edit.id,
          headline : titleUp.value,
          content: contentUp.value,
          category : categoryUp.value,
          photoUrl : imageUrlUp.value,
          userId : userInformation.userId   
      }
      
      const updateLocal = getData.filter(fil => fil.id !== id);
      updateLocal.push(update);
      localStorage.setItem('articles', JSON.stringify(updateLocal));
     displayArticle();
     closeModalUp();

    
    });


}

const deleteArticle = async function(id){

    const myArticles=  articlesFromLocal();
    const myNewArticle = myArticles.filter((fin,ind )=> ind !== id);
     localStorage.setItem('articles', JSON.stringify(myNewArticle));
      
     displayArticle();
 
   
}


const articlePost = function(string){
      const getData  = articlesFromLocal();
      getData.push(string);
      localStorage.setItem('articles', JSON.stringify(getData))
   
}



newPost.addEventListener('submit', (e)=>{
e.preventDefault();
title.value = title.value.toLowerCase();
content.value = content.value.toLowerCase();
imageUrl.value = imageUrl.value.toLowerCase();
category.value = category.value.toLowerCase();


const getData = articlesFromLocal();

const query = {
    id : getData.length + 1,
    headline : title.value,
    content: content.value,
    category : category.value,
    photoUrl : imageUrl.value,
    userId : userInformation.userId
}

    articlePost(query)
    closeModal(); 
    displayArticle();


});



window.addEventListener('scroll', ()=>{
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  if(scrollTop + clientHeight >= scrollHeight){
    console.log('load')
    displayArticle();
  }
});





displayArticle();








