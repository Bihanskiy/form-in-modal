function setValidation() {
    let id = (id) => document.getElementById(id);
    let classes = (classes) => document.getElementsByClassName(classes);

    let username = id("username"),
        email = id("email"),
        password = id("phone"),
        form = id("form"),
        errorMsg = classes("form__error"),
        successMsg = classes("form__success");

    const validator = (id, serial) => {
        if (id.value.length < 2) {
            errorMsg[serial].innerHTML = "Value must be more than 2 symbols";
            id.style.border = "2px solid red";
            return false;
        } else {
            errorMsg[serial].innerHTML = "";
            id.style.border = "2px solid green";
            return true;
        }
    };

    const setValidate = (...args) => {
        return args.every(inputValidation => inputValidation === true)
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const globalValidation = setValidate(validator(username, 0), validator(email, 1), validator(password, 2));
        globalValidation ? successMsg[0].innerHTML = "Form submitted successfully" : successMsg[0].innerHTML = "";
    });
}

export default setValidation;
