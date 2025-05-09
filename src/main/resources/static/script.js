//index and some instructions
document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const termsPopup = document.getElementById("termsPopup");
  const acceptBtn = document.getElementById("acceptBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // Show the Terms and Conditions popup when the "Start" button is clicked
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      termsPopup.style.display = "flex";
    });
    acceptBtn.addEventListener("click", function () {
      window.location.href = "registration.html"; 
    });
    cancelBtn.addEventListener("click", function () {
      termsPopup.style.display = "none"; 
    });
  }
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

//Start Registration button
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");

  const form = document.getElementById("rsrvForm");
  if (!form) {
    console.error("Form not found!");
    return;
  }
  console.log("Form loaded successfully!");

  if (startButton) {
    startButton.addEventListener("click", async function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const errorMessage = document.getElementById("error-message");
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!name || !email) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Both name and email are required. Please fill out those fields.";
        return;
      } if (!emailRegex.test(email)) {
          errorMessage.style.display = "block";
          errorMessage.textContent = "Invalid email format. Please try again.";
          return;
      } else {
        errorMessage.style.display = "none";
      }  
      
//retrieve, check if email already exists (must be not yet existing)
      try {
        const response = await fetch(`https://casinos-omissions-llp-k.trycloudflare.com/api/checkReservation?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        if (data.exists) {
          errorMessage.style.display = "block";
          errorMessage.textContent = "Email already exists.";
          return;
        }
      } catch (error) {
        console.error("Error checking reservation:", error);
        alert("Something went wrong while checking your reservation. Please try again.");
        return;
      }

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      console.log("Stored name:", name);
      console.log("Stored email:", email);

      window.location.href = "reserve.html";
    });
  }
});

//Delete reservation
document.addEventListener("DOMContentLoaded", function () {
  const deleteBtn = document.getElementById("viewButton");

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const errorMessage = document.getElementById("error-message");

      if (!name || !email) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Both name and email are required. Please fill out those fields.";
        return;
      } else {
        errorMessage.style.display = "none";
      }

//retrieve, check if email exists (must be existing)
      try {
        const response = await fetch(`https://casinos-omissions-llp-k.trycloudflare.com/api/checkReservation?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        if (data.exists) {
          const userConfirmed = confirm(`Hi, are you sure you want to delete your reservation? A confirmation email will be sent to you.`);
            if (!userConfirmed) return;

          const deleteResponse = await fetch(`https://casinos-omissions-llp-k.trycloudflare.com/api/deleteReservation?email=${encodeURIComponent(email)}`,{
              method: "DELETE",
            }
          );

          const result = await deleteResponse.json();
          if (result.success) {
            
            alert("Your reservation has been deleted successfully.");
            window.location.href = "registration.html";
          }
        } else {
          errorMessage.style.display = "block";
          errorMessage.textContent = "Email provided does not exist. You haven't reserve yet.";
        }
      } catch (error) {
        console.error("Error checking reservation:", error);
        alert(
          "Something went wrong while checking your reservation. Please try again."
        );
        return;
      }
    });
  }
});

const reservedConcerts = new Set();
document.addEventListener("DOMContentLoaded", function () {
  //Ticket Tab
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
  
  //Update Ticket Badge
  function updateCartBadge() {
    iconTicketSpan.innerText = reservedConcerts.size;
    if (reservedConcerts.size > 0) {
      iconTicketSpan.classList.add("visible");
    } else {
      iconTicketSpan.classList.remove("visible");
    }
  }

  // Reservation System
  // let maxReservations = 10;
  let listTicketHTML = document.querySelector(".concerts-container");
  let listCartHTML = document.querySelector(".listTicket");
  let iconTicketSpan = document.querySelector(".ticket-icon span");
  let listTickets = [];

  //Reserve Ticket Function
  function reserveTicket(event) {
    const button = event.target;
    const concertId = parseInt(button.dataset.concertId);
    const concert = listTickets.find((ticket) => ticket.id === concertId);

    reservedConcerts.add(concert.id);

    // Update cart badge
    updateCartBadge();
    // Add to ticket tab
    addToTicketTab(concertId);
    // Mark button as reserved
    button.classList.add("reserved");
    button.innerText = "Reserved";

    updateSlotDisplay();
  }

  //Add to Concert to Ticket Tab
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
      //Add ticket to the ticket tab
      listCartHTML.appendChild(ticketItem);
      ticketItem.querySelector(".removeTicket").addEventListener("click", removeFromTicketTab);
    }
  }

  //Remove Concert from Ticket Tab
  function removeFromTicketTab(event) {
    const button = event.target;
    const concertId = parseInt(button.dataset.concertId);

    reservedConcerts.delete(concertId);
    
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
    updateCartBadge();
  }

  //Add Concerts to HTML from JSON
  const addDataToHTML = () => {
    listTicketHTML.innerHTML = "";
    if (listTickets.length > 0) {
      listTickets.forEach((ticket) => {
        let newTicket = document.createElement("div");
        newTicket.classList.add("concert-card");
        newTicket.dataset.id = ticket.id;

      const parts = ticket.details.split('\n');
      const artist = parts[0] || "";
      const event = parts[1] || "";
      const date = parts[2] || "";

      newTicket.innerHTML = `
  <img src="${ticket.image}" alt="${ticket.name}" />  
  <div class="concert-info">
    <h2>
      ${artist}<br>
      ${event}<br>
      <span class="concert-date">${date}</span> 
    </h2>
    <span class="slot">Slots available:</span>
    <button class="reserve-btn" data-concert-id="${ticket.id}">Reserve</button>
  </div>
`;
        listTicketHTML.appendChild(newTicket);
      });

      document.querySelectorAll(".reserve-btn").forEach((button) => {
        button.addEventListener("click", reserveTicket);
      });
    }
  };

  function updateSlotDisplay() {
    fetch('https://casinos-omissions-llp-k.trycloudflare.com/api/slots') // will fetch the avail_slot table
      .then(response => response.json())
      .then(slotData => {  // function
        for (let i = 1; i <= 10; i++) { //from day1 to day10
          const slot = parseInt(slotData[`day${i}`], 10); //inaaccess yung value ni slot, nagiiterate
          console.log(`Slot for day${i}:`, slot);
          const concertCard = document.querySelector(`.concert-card[data-id="${i}"]`); //selects the html element that represents the concert card for current day
          
          if (concertCard) {
            const slotElement = concertCard.querySelector('.slot');
            const reserveButton = concertCard.querySelector('.reserve-btn');
            
            if (slotElement) {
              slotElement.textContent = `Slots available: ${slot}`; // ung nauupdate na slot, dinidisplay dito
            }
    
            if (reserveButton) {
              if (reservedConcerts.has(i)) {
                reserveButton.disabled = true;
                reserveButton.textContent = "Reserved";
              } else if (slot === 0) {
                reserveButton.disabled = true;
                reserveButton.textContent = "Out of Stock";
                reserveButton.className = "sold-out-btn";
              } else {
                reserveButton.disabled = false;
                reserveButton.textContent = "Reserve";
                reserveButton.className = "reserve-btn";
              }
              
}

          }
        }
      })
      .catch(error => console.error("Error fetching slot data:", error));
  }  


  const initApp = () => {
    console.log("Initializing app...");
    fetch("https://casinos-omissions-llp-k.trycloudflare.com/tickets.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Response Status:", response.status); // Log response status
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        listTickets = data;
        addDataToHTML();
        updateSlotDisplay();
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

 
  try {
    initApp();
  } catch (error) {
    console.error("Error in initApp:", error);
  }
});

// Checkout/Submit button
document.addEventListener("DOMContentLoaded", function () {
  function setFormData() {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const selectedConcerts = Array.from(reservedConcerts);

    console.log("data: " + selectedConcerts);
    return { name, email, concert_id: selectedConcerts };
  }

  function saveFormData(formData) {
    localStorage.setItem("reservationData", JSON.stringify(formData));
    console.log("Data saved:", formData);
  }

  function submitReservation(formData) {
    const overlay = document.getElementById("loadingOverlay");
    overlay.style.display = "block";
  
    console.log("Sending data:", formData);
  
    fetch("https://casinos-omissions-llp-k.trycloudflare.com/api/submitChoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        overlay.style.display = "none"; 
        console.log("Response from backend:", data);
  
        if (data.success) {
          setTimeout(() => {
            alert("Reservation successful!");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            window.location.href = "index.html";
          }, 100); 
        } else {
          setTimeout(() => {
            alert("Reservation failed. " + data.message);
          }, 100); 
        }
      })
      .catch((error) => {
        overlay.style.display = "none"; 
        console.error("Error occurred:", error);
        setTimeout(() => {
          alert("An error occurred while submitting your reservation.");
        }, 100); 
      });
  }
  

  const checkout = document.querySelector(".checkout");
  if (checkout) {
    checkout.addEventListener("click", function (event) {
      event.preventDefault();

      const formData = setFormData();
      if (formData.concert_id.length === 0) {
        alert("No reservation to checkout.");
        return;
      }

      const userConfirmed = confirm(`Hi ${formData.name}, \n\nAre you sure you want to reserve the ticket(s)? A confirmation email will be sent to you.`);

      if (!userConfirmed) return;

      const overlay = document.getElementById("loadingOverlay");
      overlay.style.display = "block";

      saveFormData(formData);
      submitReservation(formData);
    });
  }
});