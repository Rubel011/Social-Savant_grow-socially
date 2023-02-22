const form = document.getElementById("form");
const serverUrl = "http://localhost:1500/"
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    }
    registered(payload)
})

function registered(payload) {
    fetch(`${serverUrl}users/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

}
