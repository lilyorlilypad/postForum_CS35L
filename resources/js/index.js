//Search keyword feature
//Get search box
let keyword = document.querySelector('.search-keyword');
let searchHelper = document.querySelector('.search-helper');
//Remember to change
//Define an array to search the content->should search from the database
let searchArr = ['CS35L notes', 'CS31 notes', 'CS32 notes', 'CS33 notes', 'CS35L textbook', 'CS33 textbook'];

keyword.oninput = function(){
    searchHelper.innerHTML = '';
    for(let i = 0; i < searchArr.length; i++){
        if(searchArr[i].indexOf(keyword.value) != -1){
            searchHelper.innerHTML += '<p>'+searchArr[i]+'</p>';
            searchHelper.style.display = 'block';
        }
    }
}

keyword.onblur = function(){
    searchHelper.style.display = 'none';
}

//Carousel Transition feature
let img = document.querySelector('.img');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.banner-slide');
let li = document.querySelectorAll('.banner-point li')

let imgArr = ['images1.jpeg', 'images2.jpeg', 'images3.jpeg'];
let count = 0;

//Define a function to implement img transition
function transitImg(){
    img.src = './images/' + imgArr[count];
    for(let i = 0; i<li.length; i++){
        li[i].className = '';
    }

    li[count].className = 'active';
}
//automatic transition
let timer = setInterval(function(){
    count++;
    if(count >= imgArr.length){
        count = 0;
    }
    transitImg();
}, 3000)
//Click prev for transition
prev.onclick = function(){
    count--;
    if(count < 0){
        count = imgArr.length -1;
    }
    transitImg();
}
//Click next for transition
next.onclick = function(){
    count++;
    if(count >= imgArr.length){
        count = 0;
    }
    transitImg();
}

//Disable timer when the user moves the mouse over the slide
slide.onmouseover = function(){
    clearInterval(timer);
}
//Use time when the user moves the mouse out of the slide
slide.onmouseout = function(){
    timer = setInterval(function(){
        count++;
        if(count >= imgArr.length){
            count = 0;
        }
        transitImg();
    }, 3000);
}

//Click event for li
for(let i = 0; i < li.length; i++){
    li[i].onclick = () =>{
        count = i;
        transitImg();
    };
}