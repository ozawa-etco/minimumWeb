const email = document.getElementById("email");
const body = document.getElementById("body");
const btn = document.getElementById("btn");

const email_error = document.getElementById("email-error");
const body_error = document.getElementById("body-error");

const email_exp = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/;
const body_exp = /^.{1,10}$/;

btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!email_exp.test(email.value)) {
        email_error.classList.remove("hidden");
    }

    if (!body_exp.test(body.value)) {
        body_error.classList.remove("hidden");
    }

    if (email_error.classList.contains("hidden") && body_error.classList.contains("hidden")) {
        const api_url = "https://script.google.com/macros/s/AKfycbyWm1LMHpwdcoAf7nt0Q_mf3m9H_YK8OL9Z14iZVab7EHNuRGZhZbF6RfYp2tPfJgs/exec";

        fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encodeURI(`email=${email.value}&body=${body.value}&channel=web`)
        })
            .then((response) => {
                response.text().then((text) => {
                    alert(text);
                })
            })
            .catch((error) => {
                alert(error.message);
            })
    }

})

email.addEventListener("keyup", (e) => {
    if (email_exp.test(email.value)) {
        email_error.classList.add("hidden");
    } else {
        email_error.classList.remove("hidden");
    }
})

body.addEventListener("keyup", (e) => {
    if (body_exp.test(body.value)) {
        body_error.classList.add("hidden");
    } else {
        body_error.classList.remove("hidden");
    }
})