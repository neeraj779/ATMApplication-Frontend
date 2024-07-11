document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const pin = document.getElementById("pin").value;

    fetch("http://127.0.0.1:8000/login", {
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
            window.location.href = "../index.html";
          } else {
            console.log(data);
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerText = data.detail;
          }
        });
      })
      .catch((e) => {
        console.error("Error:", e);
        document.getElementById("error").style.display = "block";
      });
  });
