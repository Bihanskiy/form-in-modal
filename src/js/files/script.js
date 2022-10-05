import modal from "../features/modal.js";
import setValidation from "../features/validation.js";


window.onload = function () {
    let preloader = document.getElementById("preloader");
    preloader.style.display = "none";
    document.body.classList.add("body__visible");

    modal({
        contentSelector: ".form-content",
        headerText: "User Form",
        modalId: "formModal",
        btnToShowSelector: "#openForm"
    });

    setValidation();
}