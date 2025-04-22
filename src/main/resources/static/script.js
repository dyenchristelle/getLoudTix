//home
document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const termsPopup = document.getElementById("termsPopup");
  const acceptBtn = document.getElementById("acceptBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // Show the Terms and Conditions popup when the "Start" button is clicked
  startBtn.addEventListener("click", function () {
    termsPopup.style.display = "flex";
  });

  // Redirect to index.html if the "Accept" button is clicked
  acceptBtn.addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to the index page
  });

  // Close the popup without accepting when the "Cancel" button is clicked
  cancelBtn.addEventListener("click", function () {
    termsPopup.style.display = "none"; // Close the popup
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const nextInput = inputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    });
  });
});
// view
document.addEventListener("DOMContentLoaded", function () {
  // Select the button with ID 'doneBtn'
  document.getElementById("doneBtn").addEventListener("click", function () {
    // Redirect to index.html when the button is clicked
    window.location.href = "index.html";
  });
});

// define q lang here
let reservedConcerts = new Set();

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  let emailError = document.getElementById("emailError");
  let inputError = document.getElementById("inputError");

  const form = document.getElementById("rsrvForm");
  if (!form) {
    console.error("Form not found!");
    return;
  }
  console.log("Form loaded successfully!");

  if (startButton) {
    startButton.addEventListener("click", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      if (!name || !email) {
        alert("Both name and email are required!");
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        alert("Invalid email!");
        return;
      }

      window.location.href = "reserve.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Toggle Ticket Tab
  let ticketIconElement = document.querySelector(".ticket-icon");
  let bodyElement = document.querySelector("body");
  let closeTicket = document.querySelector(".close");

  if (ticketIconElement && closeTicket) {
    closeTicket.addEventListener("click", () => {
      bodyElement.classList.toggle("showTicket");
    });

    ticketIconElement.addEventListener("click", () => {
      bodyElement.classList.toggle("showTicket");
    });
  }

  // ✅ Reservation System
//   let reservedConcerts = new Set();
  // let maxReservations = 10;
  let listTicketHTML = document.querySelector(".concerts-container");
  let listCartHTML = document.querySelector(".listTicket");
  let iconTicketSpan = document.querySelector(".ticket-icon span");
  let listTickets = [];

  // ✅ Reserve Ticket Function
  function reserveTicket(event) {
    const button = event.target;
    const concertId = parseInt(button.dataset.concertId);

    // Check if concert is already reserved
    if (reservedConcerts.has(concertId)) {
      alert("You have already reserved this concert!");
      return;
    }

    // Add concert to reserved list
    reservedConcerts.add(concertId);
    // ✅ Reservation System

    // let maxReservations = 10;
    let listTicketHTML = document.querySelector(".concerts-container");
    let listCartHTML = document.querySelector(".listTicket"); // 🎟️ Ticket tab!
    let iconTicketSpan = document.querySelector(".ticket-icon span");
    let listTickets = [];

    // ✅ Reserve Ticket Function
    function reserveTicket(event) {
      const button = event.target;
      const concertId = parseInt(button.dataset.concertId);
      // inadd q to
      const concert = listTickets.find((ticket) => ticket.id === concertId);

      // Update cart badge
      updateCartBadge();

      // Add to ticket tab
      addToTicketTab(concertId);

      // Mark button as reserved
      button.classList.add("reserved");
      button.innerText = "Reserved";
    }

    // Check reservation limit
    // if (reservedConcerts.size >= maxReservations) {
    //     alert("You can only reserve a maximum of 6 concerts.");
    //     return;
    // }

    // Add concert to reserved list eto pinaltan q
    reservedConcerts.add({
      id: concert.id,
      name: concert.name,
      date: concert.date,
    });

    // ✅ Add to Ticket Tab
    function addToTicketTab(concertId) {
      const concert = listTickets.find((ticket) => ticket.id === concertId);

      if (concert) {
        let ticketItem = document.createElement("div");
        ticketItem.classList.add("item");
        ticketItem.dataset.id = concert.id;
        ticketItem.innerHTML = `
                <div class="image">
                    <img src="${concert.image}" alt="Ticket">
                </div>
                <div class="name">${concert.name}</div>
                <div class="removebtn">
                    <button class="removeTicket" data-concert-id="${concert.id}">Remove</button>
                </div>`;

        // 🎟️ Add ticket to the ticket tab
        listCartHTML.appendChild(ticketItem);

        // ✅ Add event listener to remove button
        ticketItem
          .querySelector(".removeTicket")
          .addEventListener("click", removeFromTicketTab);

        // ✅ Show ticket tab content when at least one ticket is selected
        listCartHTML.classList.add("has-tickets");
      }
    }

    // ✅ Remove from Ticket Tab
    function removeFromTicketTab(event) {
      const button = event.target;
      const concertId = parseInt(button.dataset.concertId);

      reservedConcerts.delete(concertId);

      // Remove from ticket tab
      const ticketItem = button.closest(".item");
      ticketItem.remove();

      // Unmark button as reserved
      let reserveButton = document.querySelector(
        `.reserve-btn[data-concert-id="${concertId}"]`
      );
      if (reserveButton) {
        reserveButton.classList.remove("reserved");
        reserveButton.innerText = "Reserve";
      }

      // Update cart badge
      updateCartBadge();

      // ✅ Hide ticket tab content if no tickets are selected
      if (reservedConcerts.size === 0) {
        listCartHTML.innerHTML = ""; // Clear the ticket tab content
        listCartHTML.classList.remove("has-tickets");
      }
    }

    // ✅ Update Cart Badge
    function updateCartBadge() {
      iconTicketSpan.innerText = reservedConcerts.size;
      if (reservedConcerts.size > 0) {
        iconTicketSpan.classList.add("visible");
      } else {
        iconTicketSpan.classList.remove("visible");
      }
    }

    // ✅ Add Concerts to HTML from JSON
    const addDataToHTML = () => {
      listTicketHTML.innerHTML = "";
      if (listTickets.length > 0) {
        listTickets.forEach((ticket) => {
          let newTicket = document.createElement("div");
          newTicket.classList.add("concert-card");
          newTicket.dataset.id = ticket.id;
          newTicket.innerHTML = `
                    <img src="${ticket.image}" alt="${ticket.name}" />
                    <div class="concert-info">
                        <h2>${ticket.name}<br>${ticket.concert}</h2>
                        <p>${ticket.date}</p>
                        <button class="reserve-btn" data-concert-id="${ticket.id}">Reserve</button>
                    </div>`;
          listTicketHTML.appendChild(newTicket);
        });

        // ✅ Attach event listeners after adding elements to DOM
        document.querySelectorAll(".reserve-btn").forEach((button) => {
          button.addEventListener("click", reserveTicket);
        });
      }
    };

    // ✅ Initialize App (Fetch Data from JSON)
    const initApp = () => {
      fetch("http://localhost:9090/tickets.json")
        .then((response) => response.json())
        .then((data) => {
          listTickets = data;
          addDataToHTML();
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    // ✅ Start App
    initApp();
  }
});

function getFormData() {
    const name = localStorage.setItem("name");
    const email =  localStorage.setItem("email");
    console.log("Stored name:", name); 
    console.log("Stored email:", email);
    
    const selectedConcerts = Array.from(reservedConcerts).map(concert => concert.name);

  return { name, email, concerts: selectedConcerts };
}

function saveFormData(formData) {
  localStorage.setItem("reservationData", JSON.stringify(formData));
  console.log("Data saved:", formData);
}

function submitReservation(formData) {
  console.log("Sending data:", formData);

  fetch("http://localhost:9090/api/submitChoice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from backend:", data);
      if (data.success) {
        alert("Reservation successful!");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        window.location.href = "index.html";
      } else {
        alert("Reservation failed. " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error submitting reservation: ", error);
      alert("An error occurred. Please try again. " + error.message);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const checkout = document.querySelector(".checkout");
  let listCartHTML = document.querySelector(".listTicket");
  let listTickets = [];

  if (checkout) {
    checkout.addEventListener("click", function (event) {
      event.preventDefault();

      const storedName = localStorage.getItem("reservationName");
      const storedEmail = localStorage.getItem("reservationEmail");

      const formData = getFormData();
      if (formData.concerts.length === 0) {
        alert("No reservation to checkout.");
        return;
      }

      const userConfirmed = confirm(
        `Are you sure you want to reserve tickets for ${formData.concerts.join(
          ", "
        )}?`
      );
      if (!userConfirmed) {
        return;
      }
      saveFormData(formData);
      submitReservation(formData);
    });
  }
});
