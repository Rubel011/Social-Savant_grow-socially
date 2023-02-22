const OnLogin = () => {
    const payload = {
      email: document.getElementById("email").value,
      pass: document.getElementById("pass").value,
    };
    fetch("https://super-leg-warmers-bear.cyclic.app/login", {
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
        localStorage.setItem("NotesApptoken", res.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };