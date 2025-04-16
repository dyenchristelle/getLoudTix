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

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  let emailError = document.getElementById("emailError");
  let inputError = document.getElementById("inputError");

  if (startButton) {
    startButton.addEventListener("click", function () {
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
  let reservedConcerts = new Set();
  // let maxReservations = 10;
  let listTicketHTML = document.querySelector(".concerts-container");
  let listCartHTML = document.querySelector(".listTicket"); // 🎟️ Ticket tab!
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

    // Check reservation limit
    // if (reservedConcerts.size >= maxReservations) {
    //     alert("You can only reserve a maximum of 6 concerts.");
    //     return;
    // }

    // Add concert to reserved list
    reservedConcerts.add(concertId);

    // Update cart badge
    updateCartBadge();

    // Add to ticket tab
    addToTicketTab(concertId);

    // Mark button as reserved
    button.classList.add("reserved");
    button.innerText = "Reserved";
  }

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
    fetch("tickets.json")
      .then((response) => response.json())
      .then((data) => {
        listTickets = data;
        addDataToHTML();
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // ✅ Start App
  initApp();
});
