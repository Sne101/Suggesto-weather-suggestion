flag = 0;
coords = document.querySelector("#btn--pos");
city = document.querySelector('.centered [type="text"]');
// var iconsCont = document.querySelector('.icons--container');
//////////// About Modal
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("nav--ralign");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function () {
    console.log("clicked");
    modal.style.display = "block";
}
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
//////////////////// Responsive window size on any computer
view = document.querySelector('.view');
view.style.height = window.innerHeight;
view.style.width = window.innerWidth;

//////////////////Getting the name of the city
city.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        sendCity = this.value;
        this.value = "";
        cityAppend(sendCity);
        console.log(sendCity);

    }
});
////////////////////////Getting coordinates when gps btn is pressed

coords.onclick = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(appendCoords);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
///////////////////// appends lat and long to the api url 
function appendCoords(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat, long);
    //////////// var url :API url for forecast, future weather
    var url = new URL("https://api.openweathermap.org/data/2.5/forecast?lat=20&lon=80&APPID=e715e93eaca8a20cfea59bdabc1143e0");
    //////////////var cUrl : API url for current weather
    var cUrl = new URL("https://api.openweathermap.org/data/2.5/weather?lat=20&lon=80&APPID=e715e93eaca8a20cfea59bdabc1143e0");
    url.searchParams.append('lat', lat);
    url.searchParams.set('lat', lat);
    url.searchParams.append('lon', long);
    url.searchParams.set('lon', long);
    cUrl.searchParams.append('lat', lat);
    cUrl.searchParams.set('lat', lat);
    cUrl.searchParams.append('lon', long);
    cUrl.searchParams.set('lon', long);
    console.log("Done with location");
    getSuggestion(url, cUrl);
}
///////////////////// appends the city from input to thr API url
function cityAppend(e) {
    place = e;
    console.log(place);
    console.log(e);
    //////////////////var url :API url for forecast, future weather
    var url = new URL("https://api.openweathermap.org/data/2.5/forecast?q=ALABAMA&mode=json&APPID=e715e93eaca8a20cfea59bdabc1143e0");
    //////////////var cUrl : API url for current weather
    var cUrl = new URL("https://api.openweathermap.org/data/2.5/weather?q=ALABAMA&mode=json&APPID=e715e93eaca8a20cfea59bdabc1143e0");
    url.searchParams.append('q', place);
    url.searchParams.set('q', place);
    cUrl.searchParams.append('q', place);
    cUrl.searchParams.set('q', place);
    console.log(url);
    getSuggestion(url, cUrl);
}
//////////////////forecasts and gives suggestipn
function getSuggestion(forecastUrl, currentUrl) {
    predictedTemp = 0;
    currentTemp = 0;
    fetch(currentUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            currentTemp = Math.round((data.main.temp) - 273.15);

            console.log("current temp " + currentTemp);
        })
        .then(
            fetch(forecastUrl)
                .then((resp) => resp.json())
                .then(function (data) {
                    /// if inavalid city name
                    if (data.cod == "404") {
                        var modal = document.getElementById('myModal1');
                        // Get the button that opens the modal
                        // var btn = document.getElementById("nav--ralign");
                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close1")[0];
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
                    } else {
                        if (flag == 0) { // checking if it's users first query
                            var elem = document.getElementById("icons");
                            elem.parentNode.removeChild(elem);
                        flag = 1;
                        }
                        console.log(data.list[1].dt_txt);
                        console.log(data.list[1].weather[0].description);
                        n = data.list[1].weather[0].id;
                        console.log(n);
                        console.log("passed n");
                        main1 = data.list[1].weather[0].main;
                        desc = data.list[1].weather[0].description;
                        temp = data.list[1].main.temp;
                        console.log("temp" + temp);
                        cityName = data.city.name;
                        console.log("dsfcity" + cityName);
                        var predictedTemp = Math.round(temp - 273.15);
                        console.log("hey" + predictedTemp);
                        var digits = ("" + n).split("");
                        //digits=["2","0","0"];
                        console.log(digits);
                        console.log(main1);
                        console.log(desc);
                        console.log("inside");
                        if (digits[0] == "2") {
                            weaSuggestion = "Seems like there is gonna be thunderstorm!!" + "<br>" + " Go to your house NOW!!";
                            imageSrc = "png/008-lightning.png";
                        } else if (digits[0] == "3") {
                            weaSuggestion = "It's gonna drizzle a bit. " + "<br>" + "Carry your umberella!!";
                            imageSrc = "png/006-rain-1.png";
                        } else if (digits[0] == "5") {
                            weaSuggestion = "It's gonna rain." + "<br>" + " Carry your Umberella or a raincoat!!";
                            imageSrc = "png/005-rain.png";
                        } else if (digits[0] == "6") {
                            weaSuggestion = "It's gonna Snow!! " + "<br>" + "Why don't you wear your jacket and carry an umberella?";
                            imageSrc = "png/009-snowflakes.png";
                        } else if (digits[0] == "7") {
                            weaSuggestion = "Try carrying some eye protector like glares or a clot like scarf." + "<br>" + " There is gonna be some disturbance in the enivronment";
                            imageSrc = "png/002-heat.png";
                        } else if (digits[0] == "8" && digits[1] == "0" && digits[2] == "0") {
                            if (temp > 299) {

                                weaSuggestion = "The Sun is gonna be  excruciating. Carry an umberella!!";
                                imageSrc = "png/010-thermometer.png";
                            } else {
                                var d = new Date();
                                if (d.getHours() > 4 && d.getHours() < 17) {
                                    weaSuggestion = "The sky is gonna be Clear!" + "<br>" + "Have a pleasant day.";
                                    imageSrc = "png/004-sun.png";
                                } else {
                                    weaSuggestion = "The sky is gonna be Clear!" + "<br>" + "Have a good night.";
                                    imageSrc = "png/003-night.png";

                                }
                            }

                        } else {
                            console.log("Clouds");
                            weaSuggestion = "It's Cloudy." + "<br>" + " Carry an umberella!!";
                            imageSrc = "png/007-cloud.png";
                        }
                        //console.log("Im above");

                        // iconsCont.appendChild(para);
                        // city.appendChild(para);
                        document.getElementById("stext").innerHTML = weaSuggestion;
                        document.getElementById("curtemp").innerHTML = "Current temp " + currentTemp + "&#8451;";
                        document.getElementById("predtemp").innerHTML = "Predicted temp " + predictedTemp + "&#x2103;";
                        document.getElementById("cityPlace").innerHTML = cityName;
                        document.getElementById("line").style.display = "block";
                        document.querySelector(".temp--card").style.display = "block";
                        document.getElementById("wea--image").src = imageSrc;
                        var resStyle = document.querySelector('.suggestion--style');
                        resStyle.style.marginTop = "80px";
                    }
                })
        );

}

///////////////////////////////////////////////////

