//Main Slider
var slideIndex = 0;
showSlides();

//Main Slider
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("bar");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000);
}

//Feedback Slider
var feedbackIndex = 1;
showFeedbacks(feedbackIndex);

function plusFeedback(n) {
  showFeedbacks(feedbackIndex += n);
}

function showFeedbacks(n) {
  var i;
  var feedbacks = document.getElementsByClassName("feedback");
  if (n > feedbacks.length) {feedbackIndex = 1}    
  if (n < 1) {feedbackIndex = feedbacks.length}
  for (i = 0; i < feedbacks.length; i++) {
    feedbacks[i].style.display = "none";  
  }
  feedbacks[feedbackIndex-1].style.display = "block";
}

//Hamburger
function myFunction() {
  var element = document.getElementById("mobile-header");
  element.classList.toggle("open");
}