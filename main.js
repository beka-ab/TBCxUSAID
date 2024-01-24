const burgerMenu = document.querySelector(".hamburger");
const burgerTopLine = document.querySelector(".hamburger-half");
const burgerMiddleLine = document.querySelector(".hamburger-full");
const burgerBottomLine = document.querySelector(".left");
const burgerMenuList = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const faq = document.querySelectorAll(".faq-quest");
const faqArrow = document.querySelectorAll(".faq-arrow");
const faqAnswer = document.querySelectorAll(".faq-answer");

burgerMenu.addEventListener("click", () => {
  burgerMiddleLine.classList.toggle("rotate");
  burgerTopLine.classList.toggle("rotate-top");
  burgerBottomLine.classList.toggle("rotate-bottom");
  console.log("hey");
  burgerMenu.classList.toggle("transparant");
  burgerMenuList.classList.toggle("active");
  body.classList.toggle("no-scroll");
  overlay.style.opacity = overlay.style.opacity === "0.5" ? "0" : "0.5";
});
// slider
let slideImages = document.querySelectorAll(".slidediv");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let dots = document.querySelectorAll(".dot");

var counter = 0;
next.addEventListener("click", slideNext);
function slideNext() {
  slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  indicators();
}
prev.addEventListener("click", slidePrev);
function slidePrev() {
  slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  indicators();
}

function autoSliding() {
  deletInterval = setInterval(timer, 6000);
  function timer() {
    slideNext();
    indicators();
  }
}
autoSliding();

const container = document.querySelector(".slide-container");
container.addEventListener("mouseover", function () {
  clearInterval(deletInterval);
});

container.addEventListener("mouseout", autoSliding);

function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

function switchImage(currentImage) {
  currentImage.classList.add("active");
  var imageId = currentImage.getAttribute("attr");
  if (imageId > counter) {
    slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  } else if (imageId == counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  }
  indicators();
}
for (let i = 0; i < faq.length; i++) {
  faq[i].addEventListener("click", () => {
    for (let j = 0; j < faqAnswer.length; j++) {
      if (j == i) {
        faqAnswer[j].classList.toggle("closed");
        faqArrow[j].classList.toggle("rotatearrow");
      }
    }
  });
}
