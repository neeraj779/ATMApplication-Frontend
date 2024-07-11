$(document).on("click", "#withdraw-button", function (event) {
  event.preventDefault();

  let amount = $("#amount").val();
  // let cardno = localStorage.getItem("cardno");
  // let pin = localStorage.getItem("pin");
  let cardno = "123";
  let pin = "1234";

  function validateAmount(amount) {
    const allowedMultiples = [100, 500, 2000];
    for (let multiple of allowedMultiples) {
      if (amount % multiple === 0) {
        return true;
      }
    }
    return false;
  }

  if (amount === "") {
    Swal.fire({
      icon: "error",
      title: "Ah snap! looks like you forgot something 🤔",
      text: "Please enter the amount to withdraw.",
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Okay!',
      confirmButtonAriaLabel: "Thumbs up, okay!",
    });
    return;
  } else if (amount < 100) {
    Swal.fire({
      icon: "info",
      title: "Wait a sec 🤔",
      text: "Minimum withdrawal amount is 100.",
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Okay!',
      confirmButtonAriaLabel: "Thumbs up, okay!",
    });
    return;
  } else if (amount > 10000) {
    Swal.fire({
      icon: "info",
      title: "Wow! look at you rolling in 💰",
      text: "Sorry but you can't withdraw more than 10,000 at once. 😅",
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Okay!',
      confirmButtonAriaLabel: "Thumbs up, okay!",
    });
    return;
  } else if (validateAmount(amount) === false) {
    Swal.fire({
      icon: "info",
      title: "Uh oh! looks like we have a problem 🤔",
      text: "Amount cannot be dispensed using 2000, 500, and 100 notes. Please enter a amount that can be dispensed using 2000, 500, and 100 notes.",
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Okay!',
      confirmButtonAriaLabel: "Thumbs up, okay!",
    });
    return;
  }

  function showInitialSwal() {
    let tips = [
      "Just hang in there... we're conjuring some magic! ✨🪄",
      "We are working on your request, please wait a moment! 🛠️",
      "Your money is on its way! 🚚💨",
    ];
    let tipIndex = 0;
    setInterval(function () {
      tipIndex = (tipIndex + 1) % tips.length;
      $("#tip-text").text(tips[tipIndex]);
    }, 1000);
    initialSwal = Swal.fire({
      title: "Processing your request &#128515;...",
      html: '<span id="tip-text">' + tips[tipIndex] + "</span>",
      imageUrl: "/assets/gif/money.webp",
      imageWidth: 300,
      imageHeight: 270,
      imageAlt: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  showInitialSwal();

  setTimeout(() => {
    fetch("http://127.0.0.1:8000/process_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cardno: cardno,
        pin: pin,
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Swal.close();
        Swal.fire({
          title: "Yoo! you have successfully withdrawn the amount. 🎉",
          text: `Please collect your cash. Your remaining balance is ₹${data.balance}.`,
          color: "#716add",
          imageUrl: "/assets/gif/moneyOut.webp",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          allowOutsideClick: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        });
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops... we ran into some trouble :(",
          text: "Failed to initiate the process.",
        });
      });
  }, 4000);
});
