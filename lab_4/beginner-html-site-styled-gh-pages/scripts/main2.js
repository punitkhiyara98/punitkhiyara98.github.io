let myImage = document.querySelector("img");

myImage.onclick = function() {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "beginner-html-site-styled-gh-pages/images/firefox-icon.png") {
    myImage.setAttribute(
      "src",
      "beginner-html-site-styled-gh-pages/images/firefox2.png"
    );
  } else {
    myImage.setAttribute(
      "src",
      "beginner-html-site-styled-gh-pages/images/firefox-icon.png"
    );
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  let myName = prompt("Please enter your name.");
  if (!myName || myName === null) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.innerHTML = "Mozilla is cool, " + myName;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  let storedName = localStorage.getItem("name");
  myHeading.textContent = "Mozilla is cool, " + storedName;
}

myButton.onclick = function() {
  setUserName();
};
