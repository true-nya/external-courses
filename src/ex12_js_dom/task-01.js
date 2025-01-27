let pictures = ["./asset/slide-1.jpg", "./asset/slide-2.jpg", "./asset/slide-3.jpg", "./asset/slide-4.jpg", "./asset/slide-5.jpg"];

let content = document.getElementById("slider");
for (let i = 0; i < pictures.length; i++) {
    let div = document.createElement("div");
    div.className = "slide";
    content.append(div)
    let imageItem = document.createElement("img")
    let numPicture = document.createElement("span");
    numPicture.innerHTML = String(i);
    numPicture.style.visibility = "hidden";
    imageItem.src = pictures[i];
    div.append(imageItem);
    div.append(numPicture);
}

let slides = document.getElementsByClassName("slide");
let activeNode = 0;
slides[0].lastElementChild.id = "activeSlide"

function goNext(currentNode) {
    let activeNode = currentNode;
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
    return activeNode;
}
function goBack(currentNode) {
    let activeNode = currentNode;
    if (activeNode === 0) {
        activeNode = slides.length - 1;
        slides[activeNode].lastElementChild.id = "activeSlide";
        slides[0].lastElementChild.id = "";
    }
    else {
        activeNode -= 1;
        slides[activeNode + 1].lastElementChild.id = "";
        slides[activeNode].lastElementChild.id = "activeSlide";
    }
    return activeNode;
}
function showSlides(activeSlide) {
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[activeSlide].style.display = "block";
}

function hundleNext() {
    activeNode = goNext(activeNode);
    showSlides(activeNode);
}
function hundleBack() {
    activeNode = goBack(activeNode);
    showSlides(activeNode);
}

showSlides(0);
let nextButton = document.getElementById("next");
nextButton.addEventListener("click", hundleNext);
let backButton = document.getElementById("back");
backButton.addEventListener("click", hundleBack);