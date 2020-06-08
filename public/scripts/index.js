const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#dark-mode-toggle");
//const night_mode = document.querySelector(".night_mode");

buttonSearch.addEventListener("click", () => {      
    modal.classList.remove("hide");
});

close.addEventListener("click", () =>{
    modal.classList.add("hide");
})

const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "true");
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", null);
}

if(darkMode === "true"){
    enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");

    if(darkMode !== 'true'){
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})