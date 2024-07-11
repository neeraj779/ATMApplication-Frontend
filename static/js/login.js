document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const pin = document.getElementById("pin").value;

    fetch("<api>", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardNumber, pin }),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            localStorage.setItem("cardNumber", cardNumber);
            localStorage.setItem("pin", pin);
            window.location.href = "../templates/home.html";
          } else {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerText = data.errorMessage;
          }
        });
      })
      .catch((e) => {
        console.error("Error:", e);
        document.getElementById("error").style.display = "block";
      });
  });
