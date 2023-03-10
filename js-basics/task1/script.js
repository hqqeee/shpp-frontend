/** TASK 1-2 */
const squareBtnCss = document.getElementById("square-btn-css");
const squareBtnJs = document.getElementById("square-btn-js");
const squareBtnCssJs = document.getElementById("square-btn-css-js");
const square1 = document.getElementById("square1");

function hideSquareCss() {
    square1.style.display = "none";
}

function hideSquareJs() {
    square1.remove();
}

function toggleHiddenSquareCssJs() {
    if (square1.classList.contains("hidden")) {
        square1.classList.remove("hidden");
    } else {
        square1.classList.add("hidden");
    }
}

squareBtnCss.addEventListener("click", hideSquareCss, false);
squareBtnJs.addEventListener("click", hideSquareJs, false);
squareBtnCssJs.addEventListener("click", toggleHiddenSquareCssJs, false);

/** TASK 3 */

const arrayOfSquares = [...document.getElementsByClassName("task3")];
const task3Btn = document.getElementById("square-btn-task3");

function toggleHiddenAllSquares() {
    if (arrayOfSquares[0].classList.contains("hidden")) {
        arrayOfSquares.forEach(e => e.classList.remove("hidden"));
    } else {
        arrayOfSquares.forEach((e) => e.classList.add("hidden"));
    }
}

task3Btn.addEventListener("click", toggleHiddenAllSquares, false);

/** TASK 4 */

const hideButton = document.getElementById("task4btn");
function hideByQuerySelector(){
    let elements = document.querySelectorAll(document.getElementById('selectorInput').value);
    console.log(elements)
    for(let i = 0; i < elements.length; i++){
        console.log(elements[i]);
        if(elements[i].classList.contains("hidden")){
            elements[i].classList.remove("hidden");
        } else {
            elements[i].classList.add("hidden");
        }
    }
}
hideButton.addEventListener("click", hideByQuerySelector,false);

/** TASK 5 */

const yellowSquare = document.getElementById("yellow-square");
function hideMe(){
    this.classList.add("hidden");
}
function alertHelloAndChangeListener(){
    alert("Привіт");
    this.removeEventListener("click", alertHelloAndChangeListener);
    this.addEventListener("click", hideMe, false);
}
yellowSquare.addEventListener("click", alertHelloAndChangeListener, false);

/** TASK 6 */
const redSquare = document.getElementById("red-small-square");
const task6Btn = document.getElementById("task6-btn");

function hideRedSquare() {
    redSquare.classList.add("hidden");
}
function showRedSquare() {
    redSquare.classList.remove("hidden");
}

task6Btn.addEventListener("mouseover", showRedSquare);
task6Btn.addEventListener("mouseout", hideRedSquare);

/** TASK 7 */
const greenSmallRectangle = document.getElementById("green-small-rectangle");
const task7Input = document.getElementById("task7-input");

function hideGreenRectangle() {
    greenSmallRectangle.classList.add("hidden");
}
function showGreenRectangle() {
    greenSmallRectangle.classList.remove("hidden");
}

task7Input.addEventListener("focus", showGreenRectangle);
task7Input.addEventListener("keyup", hideGreenRectangle);

/** TASK 8 */
const task8Input = document.getElementById("task8-input");
const task8Btn = document.getElementById("task8-btn");
const task8Img = document.getElementById("task8-img");
function showImage() {
    let imageUrl = task8Input.value;
    task8Img.classList.remove("hidden");
    task8Img.setAttribute("src", imageUrl);
}
task8Btn.addEventListener("click", showImage);