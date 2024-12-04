const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;
let isTransitioning = false;
let interval;
let slideWidth;

// Clone first and last slides for seamless effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

// Update slideWidth dynamically
function updateSlideWidth() {
  slideWidth = slides[0].offsetWidth;
  slider.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`; 
}

window.addEventListener("resize", updateSlideWidth);

// Initialize slider position
updateSlideWidth(); 

// Adjust slider position for the first visible slide
slider.style.transform = `translateX(-${slideWidth}px)`;

// Update slider position
function updateSliderPosition() {
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`;
}

// Handle infinite looping
slider.addEventListener("transitionend", () => {
  if (currentIndex === slides.length) {
    slider.style.transition = "none";
    currentIndex = 0;
    slider.style.transform = `translateX(-${slideWidth}px)`;
  }
  if (currentIndex === -1) {
    slider.style.transition = "none";
    currentIndex = slides.length - 1;
    slider.style.transform = `translateX(-${slides.length * slideWidth}px)`;
  }
  isTransitioning = false;
});

// Move to the next slide
function goToNextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  updateSliderPosition();
}

// Move to the previous slide
function goToPreviousSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  updateSliderPosition();
}

// Start auto-slide
function startAutoSlide() {
  interval = setInterval(goToNextSlide, 4000);
}

// Stop auto-slide
function stopAutoSlide() {
  clearInterval(interval);
}

// Add event listeners
nextButton.addEventListener("click", () => {
  stopAutoSlide();
  goToNextSlide();
  startAutoSlide();
});

prevButton.addEventListener("click", () => {
  stopAutoSlide();
  goToPreviousSlide();
  startAutoSlide();
});

slider.addEventListener("mouseover", stopAutoSlide);
slider.addEventListener("mouseout", startAutoSlide);

// Initialize
startAutoSlide();
