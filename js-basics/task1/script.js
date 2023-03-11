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
    for(let i = 0; i < elements.length; i++){
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

/** TASK 9 */
const task9Input = document.getElementById("task9-textarea");
const task9Btn = document.getElementById("task9-btn");

function showImages(){
    let lines = task9Input.value.split('\n');
    lines.forEach((link) => {
        let img = document.createElement('img');
        img.src = link;
        document.getElementById("image-box").appendChild(img);
    });
}

task9Btn.addEventListener("click", showImages);

/** TASK 10 */
const xCordElem = document.getElementById('x-pos');
const yCordElem = document.getElementById('y-pos');

function changeCords() {
    xCordElem.innerText = event.clientX;
    yCordElem.innerText = event.clientY;
}

document.addEventListener("mousemove", changeCords);
/** TASK 11 */
document.getElementById('selected-lang').innerText = navigator.language;

/** TASK 12 */
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
navigator.geolocation.getCurrentPosition((position) => {
    latitude.innerText = position.coords.latitude;
    longitude.innerText = position.coords.longitude;
})

/** TASK 13 */
const editableTextLocalStorage = document.getElementById('editable-text-localStorage');
function saveTextToLocalStorage() {
    localStorage.setItem('editableText', editableTextLocalStorage.innerText);
}
editableTextLocalStorage.addEventListener("blur", saveTextToLocalStorage);

const editableTextCookies = document.getElementById('editable-text-cookies');
function saveTextToCookies() {
    document.cookie = 'editableText=' + editableTextCookies.innerText;
}
editableTextCookies.addEventListener("blur", saveTextToCookies);

const editableTextSessionStorage = document.getElementById('editable-text-sessionStorage');
function saveTextSessionStorage() {
    sessionStorage.setItem('editableText', editableTextSessionStorage.innerText);
}
editableTextSessionStorage.addEventListener("blur", saveTextSessionStorage);

window.addEventListener("load", (event) => {
    editableTextLocalStorage.innerText = localStorage.getItem('editableText');

    let cookiesName = "editableText=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookiesName) === 0) {
            editableTextCookies.innerText =  c.substring(cookiesName.length, c.length);
        }
    }

    editableTextSessionStorage.innerText = sessionStorage.getItem('editableText');
})

/** TASK 14 */
const topBtn = document.getElementById('top');

function showTopBtn() {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        topBtn.classList.remove('hidden');
    } else {
        topBtn.classList.add('hidden');
    }
}
function scrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
window.addEventListener('scroll', showTopBtn);
topBtn.addEventListener('click', scrollTop);

/** TASK 15 */
const outerBlock = document.getElementById('outer-block');
const innerBlock = document.getElementById('inner-block');
outerBlock.addEventListener('click', () => alert("Outer"));
innerBlock.addEventListener('click', () => {
    alert('Inner');
    event.stopPropagation();
});

/** TASK 16 */
const grayScreenButton = document.getElementById('gray-screen');
const popupBackground = document.getElementById('popup-background');
grayScreenButton.addEventListener('click', () =>{
    popupBackground.classList.remove('hidden');
    disableScroll();
});
popupBackground.addEventListener('click', () => {
    window.onscroll = function() {};
    popupBackground.classList.add('hidden');
})
function disableScroll() {
    scrollTop = document.documentElement.scrollTop;
    scrollLeft = document.documentElement.scrollLeft;
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
/** TASK 17 */

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
})

/** TASK 18 */
const dropArea = document.getElementById('drop-area');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}
['dragenter','dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () =>{
        dropArea.classList.add('blue-border');
    })
});

['dragleave','drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () =>{
        dropArea.classList.remove('blue-border');
    })
});
const fileInput = document.getElementById('fileInput');

dropArea.addEventListener('drop', (event) => {
  fileInput.files = event.dataTransfer.files;
  dropArea.classList.add('purple-border');
});
