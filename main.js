import { coursesData, faqData } from "./data.js";

const burgerMenu = document.querySelector(".menu-icon");
const burgerTopLine = document.querySelector(".hamburger-half");
const burgerMiddleLine = document.querySelector(".hamburger-full");
const burgerBottomLine = document.querySelector(".left");
const burgerMenuList = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const header = document.querySelector(".main-header");

/////

/////

const faqContainer = document.querySelector(".faq-container");
faqData.forEach((data) => {
  const faqHTML = ` <div class="faq-content">
                      <div class="faq-question">
                          <p>${data.question}</p>
                          <img class="faq-arrow" src="./assets/faqarrow.svg" alt="" />
                      </div>
                      <div class="faq-answer closed">
                          <p>${data.answer}</p>
                      </div>
                    </div>`;
  const container = document.createElement("div");
  container.innerHTML = faqHTML;
  faqContainer.appendChild(container);
});

const faq = document.querySelectorAll(".faq-question");
const faqArrow = document.querySelectorAll(".faq-arrow");
const faqAnswer = document.querySelectorAll(".faq-answer");

/////
burgerMenu.addEventListener("click", () => {
  burgerMiddleLine.classList.toggle("rotate");
  burgerTopLine.classList.toggle("rotate-top");
  burgerBottomLine.classList.toggle("rotate-bottom");
  burgerMenu.classList.toggle("transparant");
  burgerMenuList.classList.toggle("active");
  body.classList.toggle("no-scroll");
  overlay.style.opacity = overlay.style.opacity === "0.5" ? "0" : "0.5";
});
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  header.classList.toggle("movingheader", scrollY > 1);
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  if (currentScrollTop < lastScrollTop) {
    header.classList.add("movingmobileheader");
  } else {
    header.classList.remove("movingmobileheader");
  }
  lastScrollTop = currentScrollTop;
  currentScrollTop == 0 && header.classList.remove("movingmobileheader");
});

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

faq.forEach((faqItem, i) => {
  faqItem.addEventListener("click", () => {
    faqAnswer[i].classList.add("closed");
    faqArrow[i].classList.toggle("rotatearrow");
  });
});
///slider

let slide = 0;
let previousSlide = 0;
let allowSlideChange = true;
let intervalID, isDragging, freezeOnHover, startX, startY, offsetX, offsetY;
const dragInterval = 2200;
const slides = document.querySelectorAll(".slide");
const slidesOverlay = document.querySelector(".slides-overlay");
const dotsContainer = document.querySelector(".slider__dots");
const dots = document.querySelectorAll(".slider__dot");
const prevButton = document.querySelector(".slides__prev-button");
const nextButton = document.querySelector(".slides__next-button");

prevButton.addEventListener("click", handleDecrement);
nextButton.addEventListener("click", handleIncrement);

dots.forEach((dot, index) =>
  dot.addEventListener("click", () => {
    if (!allowSlideChange || slide === index) return;
    previousSlide = slide;
    slide = index;

    previousSlide > slide
      ? animateRight(previousSlide, slide)
      : animateLeft(previousSlide, slide);
    showSlide(slide);
  })
);

// Drag to slide functions for mobile
slides.forEach((slide) => slide.addEventListener("touchstart", startDrag));
document.body.addEventListener("touchmove", drag);
document.body.addEventListener("touchend", stopDrag);
//////////////////////////////// END

// Freeze slider on hover
slidesOverlay.addEventListener("mouseenter", () => (freezeOnHover = true));
slidesOverlay.addEventListener("mouseleave", () => (freezeOnHover = false));
dotsContainer.addEventListener("mouseenter", () => (freezeOnHover = true));
dotsContainer.addEventListener("mouseleave", () => (freezeOnHover = false));
/////////////////////////////// END

interval();

function startDrag(e) {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}
function drag(e) {
  if (!isDragging || !allowSlideChange) return;

  offsetX = e.touches[0].clientX - startX;
  offsetY = e.touches[0].clientY - startY;

  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;

  if (offsetX > 10) {
    handleDecrement();
  }

  if (offsetX < -10) {
    handleIncrement();
  }
}
function stopDrag() {
  isDragging = false;
}

function resetSlideChangeFlag() {
  allowSlideChange = false;
  setTimeout(() => {
    allowSlideChange = true;
  }, dragInterval);
}

function interval() {
  intervalID = setInterval(() => {
    if (freezeOnHover) return;
    handleIncrement();
  }, 4000);
}

function handleIncrement() {
  if (!allowSlideChange) return;

  previousSlide = slide;

  slide >= slides.length - 1 ? (slide = 0) : slide++;

  animateLeft(previousSlide, slide);

  showSlide(slide);
}

function handleDecrement() {
  if (!allowSlideChange) return;

  previousSlide = slide;

  slide <= 0 ? (slide = slides.length - 1) : slide--;

  animateRight(previousSlide, slide);

  showSlide(slide);
}

function showSlide(slide) {
  if (!allowSlideChange) return;

  clearInterval(intervalID);

  setTimeout(
    () => slides[slide].classList.add("slide--fade-in"),
    window.innerWidth > 1600 ? 100 : 600
  );
  dots[slide].classList.add("slider__dot--active");

  interval();
  resetSlideChangeFlag();
}

function animateLeft(previous, current) {
  clearAnimations();

  slides[previous].classList.add("slide--left");
  slides[current].classList.add("slide--right");
}

function animateRight(previous, current) {
  clearAnimations();

  slides[previous].classList.add("slide--right");
  slides[current].classList.add("slide--left");
}

function clearAnimations() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("slide--left");
    slides[i].classList.remove("slide--right");
    slides[i].classList.remove("slide--fade-in");
    dots[i].classList.remove("slider__dot--active");
  }
}

///slider
