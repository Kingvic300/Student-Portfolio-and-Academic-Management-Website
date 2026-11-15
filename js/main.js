// Shared script for all pages

// Mobile menu toggle
var menuBtn = document.getElementById("menuBtn");
var navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Highlight the link of the current page
var page = window.location.pathname.split("/").pop() || "index.html";
var links = document.querySelectorAll(".nav a");
links.forEach(function (link) {
  if (link.getAttribute("href") === page) {
    link.classList.add("active");
  }
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Time-based greeting on the home page
var greeting = document.getElementById("greeting");
if (greeting) {
  var hour = new Date().getHours();
  var text = "Good evening";
  if (hour < 12) {
    text = "Good morning";
  } else if (hour < 17) {
    text = "Good afternoon";
  }
  greeting.textContent = text + "! Welcome to my portfolio.";
}
