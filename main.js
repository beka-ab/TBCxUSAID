import coursesData from "./data.js";

const burgerMenu = document.querySelector(".menu-icon");
const burgerTopLine = document.querySelector(".hamburger-half");
const burgerMiddleLine = document.querySelector(".hamburger-full");
const burgerBottomLine = document.querySelector(".left");
const burgerMenuList = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const faq = document.querySelectorAll(".faq-question");
const faqArrow = document.querySelectorAll(".faq-arrow");
const faqAnswer = document.querySelectorAll(".faq-answer");
const header = document.querySelector(".main-header");

burgerMenu.addEventListener("click", () => {
  burgerMiddleLine.classList.toggle("rotate");
  burgerTopLine.classList.toggle("rotate-top");
  burgerBottomLine.classList.toggle("rotate-bottom");
  burgerMenu.classList.toggle("transparant");
  burgerMenuList.classList.toggle("active");
  body.classList.toggle("no-scroll");
  overlay.style.opacity = overlay.style.opacity === "0.5" ? "0" : "0.5";
});

window.addEventListener("scroll", () => {
  header.classList.toggle("movingheader", scrollY > 1);
});

let slideImages = document.querySelectorAll(".slidediv");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let dots = document.querySelectorAll(".dot");

const coursesList = document.getElementById("coursesList");

coursesData.forEach((course, index) => {
  const courseElement = document.createElement("div");
  courseElement.classList.add("course");

  courseElement.innerHTML = `
    <img class="course__img" src="${course.imgSrc}" alt=" image of course" />
    <div class="course__text">
      <h5 class="course__headline">${course.title}</h5>
      <p class="registration">რეგისტრაცია დასრულებულია</p>
      <div>
        <img src="./assets/arrow.svg" alt="arrow" />
        <span class="course__details">კურსის დეტალები</span>
      </div>
    </div>
  `;

  coursesList.appendChild(courseElement);
});

let counter = 0;

next.addEventListener("click", slideNext);
function slideNext() {
  slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
  counter = counter >= slideImages.length - 1 ? 0 : counter + 1;
  slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  indicators();
}

prev.addEventListener("click", slidePrev);
function slidePrev() {
  slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
  counter = counter === 0 ? slideImages.length - 1 : counter - 1;
  slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  indicators();
}

let deletInterval;
function autoSliding() {
  deletInterval = setInterval(timer, 6000);
  function timer() {
    slideNext();
    indicators();
  }
}
autoSliding();

const container = document.querySelector(".slide-container");

container.addEventListener("mouseover", () => clearInterval(deletInterval));
container.addEventListener("mouseout", autoSliding);

function indicators() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === counter);
  });
}

function switchImage(currentImage) {
  currentImage.classList.add("active");
  const imageId = currentImage.getAttribute("attr");
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

faq.forEach((faqItem, i) => {
  faqItem.addEventListener("click", () => {
    faqAnswer[i].classList.toggle("closed");
    faqArrow[i].classList.toggle("rotatearrow");
  });
});
