const form = document.getElementById("form");
const serverUrl = "https://frantic-red-pumps.cyclic.app/"
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    }
    if (payload.name.length>0&&payload.email.length>0&&payload.password.length>0) {
        registered(payload)
        Swal.fire(
          'Good job signup successful!',
          'You clicked the button!',
          'success'
        )
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went Wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
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
