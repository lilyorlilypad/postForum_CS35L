var xhr = new XMLHttpRequest();

//send a "get" request to destination "/query"
xhr.open("GET", "http://localhost:3000/query", true);

//this function is called everytime a request to the server is made
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.log("Erro:" + xhr.responseText);
        }
    }

    else {
        console.log("NOT DONE");
    }

}


//get the keyword searched by user
var searchString = window.location.search;
var keyword = searchString.substring(searchString.indexOf("search-keyword=")+15);
console.log(keyword);


xhr.send();

