function setValidation() {
    let id = (id) => document.getElementById(id);
    let classes = (classes) => document.getElementsByClassName(classes);

    let username = id("username"),
        email = id("email"),
        password = id("phone"),
        form = id("form"),
        errorMsg = classes("form__error"),
        successMsg = classes("form__success");
        console.log(successMsg);

    const validator = (id, serial, message) => {
        if (id.value.trim() === "") {
            errorMsg[serial].innerHTML = message;
            id.style.border = "2px solid red";
        } else if (id.value.length < 2) {
            errorMsg[serial].innerHTML = "Value must be more than 2 symbols";
            id.style.border = "2px solid red";
        } else {
            errorMsg[serial].innerHTML = "";
            id.style.border = "2px solid green";
            successMsg[0].innerHTML = "Form submitted successfully";
        }
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        validator(username, 0, "Enter user name");
        validator(email, 1, "Enter email");
        validator(password, 2, "Enter phone number");
    });
}

export default setValidation;
