let picture = ["./asset/slide-1.jpg",
    "./asset/slide-2.jpg",
    "./asset/slide-3.jpg",
    "./asset/slide-4.jpg",
    "./asset/slide-5.jpg"];

let slider = document.getElementById("slider");
for (let i = 0; i < picture.length; i++) {
    let div = document.createElement("div");
    div.className = "slide";
    slider.append(div)
    let img = document.createElement("img")
    let numPicture = document.createElement("span");
    numPicture.innerHTML = String(i);
    numPicture.style.visibility = "hidden";
    img.src = picture[i];
    div.append(img);
    div.append(numPicture);
}


let slides = document.getElementsByClassName("slide");
let activeNode = 0;
slides[0].lastElementChild.id = "activeSlide"

showSlides(0);
function nextSlide() {
    if (activeNode === slides.length - 1) {
        activeNode = 0;
        slides[activeNode].lastElementChild.id = "activeSlide";
        slides[slides.length - 1].lastElementChild.id = "";
    }
    else {
        activeNode += 1;
        slides[activeNode - 1].lastElementChild.id = "";
        slides[activeNode].lastElementChild.id = "activeSlide";
    }
    console.log("kekex" + activeNode)
    showSlides(activeNode);
}
function backSlide() {
    if (activeNode === 0) {
        console.log("loh")
        activeNode = slides.length - 1;

        slides[activeNode].lastElementChild.id = "activeSlide";
        slides[0].lastElementChild.id = "";
    }
    else {
        console.log("pidor " + activeNode)
        activeNode -= 1;
        console.log("pidor " + activeNode)
        slides[activeNode + 1].lastElementChild.id = "";
        slides[activeNode].lastElementChild.id = "activeSlide";
    }
    console.log("kekex" + activeNode)
    showSlides(activeNode);
}
function showSlides(activity) {
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[activity].style.display = "block";
    console.log("act " + activity)
}

let nextButton = document.getElementById("next");
nextButton.addEventListener("click", nextSlide);
let backButton = document.getElementById("back");
backButton.addEventListener("click", backSlide);

document.addEventListener("keydown", checkKey)
/* eslint-disable no-param-reassign */
function checkKey(key) {

    key = key || window.event;
    if (key.keyCode === '37') {
        backSlide();
    }
    else if (key.keyCode === '39') {
        nextSlide();
    }

}