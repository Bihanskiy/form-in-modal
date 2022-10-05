(() => {
    "use strict";
    const modal = options => {
        const defaultOptions = {
            contentSelector: "",
            headerText: "",
            modalId: "",
            btnToShowSelector: ""
        };
        const finalOptions = Object.assign(defaultOptions, options);
        const body = document.body;
        function removeOriginalContent() {
            document.querySelector(finalOptions.contentSelector).remove();
        }
        function getContent() {
            const content = document.querySelector(finalOptions.contentSelector);
            const modalIdTpl = "{{modalId}}";
            const modalHeaderTpl = "{{modalHeader}}";
            const modalContentTpl = "{{modalContent}}";
            const template = `\n        <div class="modal" id='{{modalId}}'>\n            <div class="modal__container">\n                <div class="modal__body">\n                    <div class="modal__header">{{modalHeader}}</div>\n                    <div class="modal__close">\n                        <a href="#">\n                            &times;\n                        </a>\n                    </div>\n                    <div class="modal__content">\n                        {{modalContent}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        `;
            const htmlToElements = html => {
                const tpl = document.createElement("template");
                html = html.trim();
                tpl.innerHTML = html;
                return tpl.content.firstChild;
            };
            const getModalContent = () => {
                const templated = template.replace(modalIdTpl, finalOptions.modalId).replace(modalHeaderTpl, finalOptions.headerText).replace(modalContentTpl, content.innerHTML);
                return htmlToElements(templated);
            };
            return getModalContent();
        }
        function initModal() {
            const modalElementContainer = getContent();
            removeOriginalContent();
            body.append(modalElementContainer);
            return modalElementContainer;
        }
        function initInteractions(modalElement) {
            const closeBtn = modalElement.querySelector(".modal__close a");
            const hide = event => {
                event && event.preventDefault();
                modalElement.classList.remove("visible");
                body.classList.remove("modal__visible");
            };
            const show = event => {
                event && event.preventDefault();
                modalElement.classList.add("visible");
                body.classList.add("modal__visible");
            };
            closeBtn.addEventListener("click", (event => {
                hide(event);
            }));
            body.addEventListener("keyup", (event => {
                if ("Escape" === event.code) hide(event);
            }));
            return {
                show,
                hide
            };
        }
        function initShowBtn(showCallback) {
            const showBtn = document.querySelector(finalOptions.btnToShowSelector);
            showBtn.addEventListener("click", (event => {
                event.preventDefault();
                showCallback();
            }));
        }
        const modalElementContainer = initModal();
        const interactions = initInteractions(modalElementContainer);
        initShowBtn(interactions.show);
        return interactions;
    };
    const features_modal = modal;
    function setValidation() {
        let id = id => document.getElementById(id);
        let classes = classes => document.getElementsByClassName(classes);
        let username = id("username"), email = id("email"), password = id("phone"), form = id("form"), errorMsg = classes("form__error"), successMsg = classes("form__success");
        console.log(successMsg);
        const validator = (id, serial, message) => {
            if ("" === id.value.trim()) {
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
        form.addEventListener("submit", (e => {
            e.preventDefault();
            validator(username, 0, "Enter user name");
            validator(email, 1, "Enter email");
            validator(password, 2, "Enter phone number");
        }));
    }
    const validation = setValidation;
    window.onload = function() {
        let preloader = document.getElementById("preloader");
        preloader.style.display = "none";
        document.body.classList.add("body__visible");
        features_modal({
            contentSelector: ".form-content",
            headerText: "User Form",
            modalId: "formModal",
            btnToShowSelector: "#openForm"
        });
        validation();
    };
})();