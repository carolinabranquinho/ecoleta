const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");
const night_mode_button = document.querySelector(".night_mode_button button");
const night_mode = document.querySelector(".night_mode");

buttonSearch.addEventListener("click", () => {      
    modal.classList.remove("hide");
});

close.addEventListener("click", () =>{
    modal.classList.add("hide");
})

night_mode_button.addEventListener("click", () => {
    night_mode.classList.toggle("night_mode_button")
})