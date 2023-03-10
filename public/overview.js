var searchString = window.location.search;
var keyword = searchString.substring(searchString.indexOf("search-keyword=")+15);
console.log(keyword);

var xhr = new XMLHttpRequest();

//send a "get" request to destination "/query"
xhr.open("GET", "http://localhost:3000/query", true);

//this function is called everytime a request to the server is made
let response;
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            //this is executed when db request is complete
            response = JSON.parse(xhr.responseText);
            console.log(response);
            container = document.getElementById("card-container");
            size = Object.keys(response).length;

            for (i=0; i<size; i++){
                title = response[i].name;
                sum = response[i].summary;
                id = response[i].id;
                if (response[i].desc) desc = response[i].desc;
                else desc = "No further descriptions";
                container.innerHTML += `
                <div class="card">
                    <div class="card__header">
                        <div class="card__picture">
                        <div class="card__picture-overlay">&nbsp;</div>
                        <img
                            src="img/pin.png"
                            alt="Tour 1"
                            class="card__picture-img"
                        />
                        </div>

                        <h3 class="heading-tertirary" id="title-1">
                        <span>${title}</span>
                        </h3>
                    </div>

                    <div class="card__details">
                        <h4 class="card__sub-heading" id="sum-1">${sum}</h4>
                        <p class="card__text" id="des-1">
                        ${desc}
                        </p>
                        <div class="card__data">
                        <svg class="card__icon" id="icon-1">
                            <use xlink:href="img/icons.svg#icon-map-pin"></use>
                        </svg>
                        <span id="info-1">Banff, Canada</span>
                        </div>
                        <div class="card__data">
                        <svg class="card__icon">
                            <use xlink:href="img/icons.svg#icon-calendar"></use>
                        </svg>
                        <span>April 2021</span>
                        </div>
                        <div class="card__data">
                        <svg class="card__icon">
                            <use xlink:href="img/icons.svg#icon-flag"></use>
                        </svg>
                        <span>3 stops</span>
                        </div>
                        <div class="card__data">
                        <svg class="card__icon">
                            <use xlink:href="img/icons.svg#icon-user"></use>
                        </svg>
                        <span>25 people</span>
                        </div>
                    </div>

                    <div class="card__footer">
                        <p>
                        <span class="card__footer-value">$297</span>
                        <span class="card__footer-text">per person</span>
                        </p>
                        <p class="card__ratings">
                        <span class="card__footer-value">4.9</span>
                        <span class="card__footer-text">rating (21)</span>
                        </p>
                        <a href="#" class="btn btn--green btn--small">Details</a>
                    </div>
                    </div>
                `;
            }
            document.body.innerHTML += `
            <div class="footer">
                <div class="footer__logo">
                <img src="img/logo-green.png" alt="Natours logo" />
            </div>
            <ul class="footer__nav">
                <li><a href="#">About us</a></li>
                <li><a href="#">Download apps</a></li>
                <li><a href="#">Become a guide</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <p class="footer__copyright">
                &copy; by Jonas Schmedtmann. All rights reserved.
            </p>
            </div>
            `
        } else {
            console.log("Error:" + xhr.responseText);
        }
    }
}


xhr.send(keyword);

//get the keyword searched by user


