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

            const requestData = { name, email };
            console.log("Submitting data:", requestData); 

            localStorage.setItem("reservationName", name);
            localStorage.setItem("reservationEmail", email);

            window.location.href = "reserve.html";
        });
    } 
});
// define q lang here
let reservedConcerts = new Set();

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

        // Add concert to reserved list eto pinaltan q
        reservedConcerts.add({
            id: concert.id,
            name: concert.name,
            date: concert.date
        });

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
            ticketItem.querySelector(".removeTicket").addEventListener("click", removeFromTicketTab);

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
        let reserveButton = document.querySelector(`.reserve-btn[data-concert-id="${concertId}"]`);
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
});

function getFormData() {
    const name = localStorage.getItem("name") || "";
    const email =  localStorage.getItem("email") || "";
    console.log("Retrieved name:", name); 
    console.log("Retrieved email:", email);
    
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
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
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
    .catch(error => {
        console.error("Error submitting reservation: ", error);
        alert("An error occurred. Please try again. " + error.message);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const checkout = document.querySelector(".checkout");
    let listCartHTML = document.querySelector(".listTicket");
    let reservedConcerts = new Set();
    let listTickets = [];
    
    if (checkout) {
        checkout.addEventListener("click", function(event) {
            event.preventDefault();

            const storedName = localStorage.getItem("reservationName");
            const storedEmail = localStorage.getItem("reservationEmail");

            const formData = getFormData();
            if (formData.concerts.length === 0) {
                alert("No reservation to checkout.");
                return;
            }

            const userConfirmed = confirm(`Are you sure you want to reserve tickets for ${formData.concerts.join(", ")}?`)
            if (!userConfirmed) {
                return;
            }
            saveFormData(formData);
            submitReservation(formData);
        });
    }
});





//last march 27 thursday 
// document.addEventListener("DOMContentLoaded", function () {
//         const inputs = document.querySelectorAll("input");
    
//         inputs.forEach((input, index) => {
//             input.addEventListener("keydown", function (event) {
//                 if (event.key === "Enter") {
//                     event.preventDefault(); 
//                     const nextInput = inputs[index + 1];
//                     if (nextInput) {
//                         nextInput.focus();
//                     }
//                 }
//             });
//         });
//     });

// document.addEventListener("DOMContentLoaded", function () {
//     const startButton = document.getElementById("startButton");
//     let emailError = document.getElementById("emailError");
//     let inputError = document.getElementById("inputError");

//     if (startButton) {
//         startButton.addEventListener("click", function () {
//             const name = document.getElementById("name").value.trim();
//             const email = document.getElementById("email").value.trim();

//             if (!name || !email) {
//                 alert("Both name and email are required!");
//                 return;
//             }

//             const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//             if (!emailRegex.test(email)) {
//                 alert("Invalid email!");
//                 return;
//             }

//             window.location.href = "reserve.html";
//         });
//     } 
// });

// document.addEventListener('DOMContentLoaded', () => {
//     let ticketIconElement = document.querySelector('.ticket-icon');
//     let bodyElement = document.querySelector('body');
//     let closeTicket = document.querySelector('.close');

//     closeTicket.addEventListener('click', () => {
//         bodyElement.classList.toggle('showTicket');
//     });
//     ticketIconElement.addEventListener('click', () => {
//         bodyElement.classList.toggle('showTicket');
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {
//     let reservedConcerts = new Set();
//     let maxReservations = 6;
//     let listTicketHTML = document.querySelector(".concerts-container");
//     let listCartHTML = document.querySelector(".listTicket")
//     let iconTicketSpan = document.querySelector(".ticket-icon span")
//     let listTickets = [];
//     let tickets = [];
    
    

//     // Get reference to the cart badge
//     const cartBadge = document.querySelector(".ticket-icon span");

//     // Function to handle reservation
//     function reserveTicket(event) {
//         const button = event.target;
//         const concertId = button.dataset.concertId;

//         // Check if the concert is already reserved
//         if (reservedConcerts.has(concertId)) {
//             alert("You have already reserved this concert!");
//             return;
//         }

//         // Check reservation limit
//         if (reservedConcerts.size >= maxReservations) {
//             alert("You can only reserve a maximum of 6 concerts.");
//             return;
//         }

//         // Add concert to the reserved list
//         reservedConcerts.add(concertId);

//         // Update the cart badge count
//         cartBadge.innerText = reservedConcerts.size;

//         // Show the badge if at least one reservation
//         if (reservedConcerts.size > 0) {
//             cartBadge.classList.add("visible");
//         } else {
//             cartBadge.classList.remove("visible");
//         }

//         reservedConcerts.add(concertId);

//         // Add concert to ticket tab
//         addToTicketTab(concertId);

//         button.classList.add("reserved");

//         // Alert confirmation
//         alert("Concert reserved successfully! 🎟️");
//     }

    
//     // ✅ Add to ticket tab
//     function addToTicketTab(concertId) {
//         const concert = listTickets.find(ticket => ticket.id === concertId);

//         if (concert) {
//             let ticketItem = document.createElement("div");
//             ticketItem.classList.add("ticket-item");
//             ticketItem.dataset.id = concert.id;
//             ticketItem.innerHTML = `
//                 <img src="${concert.image}" alt="${concert.name}" />
//                 <div class="ticket-info">
//                     <h3>${concert.name}</h3>
//                     <p>${concert.date}</p>
//                     <button class="remove-btn" data-concert-id="${concert.id}">Remove</button>
//                 </div>`;
            
//             listCartHTML.appendChild(ticketItem);

//             // ✅ Add event listener to remove button
//             ticketItem.querySelector(".remove-btn").addEventListener("click", removeFromTicketTab);
//         }
//     }

//     // ✅ Remove from ticket tab
//     function removeFromTicketTab(event) {
//         const button = event.target;
//         const concertId = button.dataset.concertId;

//         // Remove concert from reserved list
//         reservedConcerts.delete(concertId);

//         // Remove the element from the ticket tab
//         const ticketItem = button.closest(".ticket-item");
//         ticketItem.remove();

//         // Mark the concert as not reserved
//         let reserveButton = document.querySelector(`.reserve-btn[data-concert-id="${concertId}"]`);
//         if (reserveButton) {
//             reserveButton.classList.remove("reserved");
//             reserveButton.innerText = "Reserve";
//         }
//         addTicketToHTML();
//     }

    
    
//     // Function to add data to HTML
//     const addDataToHTML = () => {
//         listTicketHTML.innerHTML = '';
//         if (listTickets.length > 0) {
//             listTickets.forEach(ticket => {
//                 let newTicket = document.createElement('div');
//                 newTicket.classList.add('concert-card');
//                 newTicket.dataset.id = ticket.id;
//                 newTicket.innerHTML = `
//                     <img src="${ticket.image}" alt="${ticket.name}" />
//                     <div class="concert-info">
//                         <h2>${ticket.name}<br>${ticket.concert}</h2>
//                         <p>${ticket.date}</p>
//                         <button class="reserve-btn" data-concert-id="${ticket.id}">Reserve</button>
//                     </div>`;
//                 listTicketHTML.appendChild(newTicket);
//             });

//             listTicketHTML.addEventListener('click', (event) => {
//                 let positionClick = event.target;
//                 if(positionClick.classList.contains('addticket')){
//                     let ticket_id = positionClick.parentElement.dataset.id;
//                     addToTicket ('ticket_id');
//                 }
//             })

//             // ✅ Add event listeners to newly created buttons AFTER adding them to the DOM
//             document.querySelectorAll(".reserve-btn").forEach(button => {
//                 button.addEventListener("click", reserveTicket);
//             });
//         }
//     };

//     const addToTicket = (ticket_id) => {
//         let positionProductInCart = CaretPosition.findIndex((value) => value.ticket_id);
        
//         if(tickets.length <= 0){
//             tickets = [{
//                 ticket_id : ticket_id,
//                 quantity : 1
//             }]
//         }else if(positionProductInCart < 0 ){
//             tickets.push({
//                 ticket_id : ticket_id,
//                 quantity : 1
//             });
//         }else{
//             tickets[positionProductInCart].quantity = carts[positionProductInCart].quantity + 1;
//         }
        
//         addTicketToHTML();
//     }
//     const addTicketToHTML = () => {
//         listTicketHTML.innerHTML = '';
//         if (listTickets.length > 0) {
//             listTickets.forEach(cart => {
//                 let newTicket = document.createElement('div');
//                 newTicket.classList.add('item');
//                 let positionTicket = listTickets.findIndex((value) => value.id == cartBadge.ticket_id);
//                 let info = listTickets[positionTicket];
//                 newTicket.innerHTML = `
//                     <div class="image">
//                     <img src="${info.image}" alt="${info.name}">
//                 </div>
//                 <div class="name">"${info.name}"</div>
//                 <div class="removebtn">
//                     <button class="removeTicket">Remove</button>
//                 </div>`;
//                 listTicketHTML.appendChild(newTicket);
//             });

//             listTicketHTML.addEventListener('click', (event) => {
//                 let positionClick = event.target;
//                 if(positionClick.classList.contains('addticket')){
//                     let ticket_id = positionClick.parentElement.dataset.id;
//                     addToTicket ('ticket_id');
//                 }
//             })

//             // ✅ Add event listeners to newly created buttons AFTER adding them to the DOM
//             document.querySelectorAll(".reserve-btn").forEach(button => {
//                 button.addEventListener("click", reserveTicket);
//             });
//         }
//     };

//     const initApp = () => {
//                 fetch('tickets.json')
//                 .then(response => response.json())
//                 .then(data=> {
//                     listTickets = data;
//                     addDataToHTML();    
//                 })
//             }
    

//     // Initialize the app
//     initApp();
// });



//last march 27 thursday ^^




// document.addEventListener("DOMContentLoaded", () => {
//     let reservedConcerts = new Set();
//     let maxReservations = 6;

//     // Get reference to the cart badge
//     const cartBadge = document.querySelector(".ticket-icon span");

//     // Function to handle reservation
//     function reserveTicket(event) {
//         const button = event.target;
//         const concertId = button.dataset.concertId;

//         // Check if the concert is already reserved
//         if (reservedConcerts.has(concertId)) {
//             alert("You have already reserved this concert!");
//             return;
//         }

//         // Check reservation limit
//         if (reservedConcerts.size >= maxReservations) {
//             alert("You can only reserve a maximum of 6 concerts.");
//             return;
//         }

//         // Add concert to the reserved list
//         reservedConcerts.add(concertId);

//         // Update the cart badge count
//         cartBadge.innerText = reservedConcerts.size;

//         // Show the badge if at least one reservation
//         if (reservedConcerts.size > 0) {
//             cartBadge.classList.add("visible");
//         } else {
//             cartBadge.classList.remove("visible");
//         }

//         button.classList.add("reserved");

//         // Alert confirmation
//         alert("Concert reserved successfully! 🎟️");
//     }

//     // Add event listener for all buttons with class "reserve-btn"
//     document.querySelectorAll(".reserve-btn").forEach(button => {
//         button.addEventListener("click", reserveTicket);
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {
//     let listTicketHTML = document.querySelector(".concerts-container");

//     let listTickets = [];

//     const addDataToHTML = () => {
//         listTicketHTML.innerHTML = '';
//         if(listTickets.length > 0){
//             listTickets.forEach(ticket => {
//                 let newTicket = document.createElement('div');
//                 newTicket.classList.add('concert-card');
//                 newTicket.innerHTML = `
//             <img src="${ticket.image}" alt="${ticket.name}" />
//             <div class="concert-info">
//             <h2>${ticket.name}<br>${ticket.concert}</h2>
//             <p>${ticket.date}</p>
//             <button class="reserve-btn" data-concert-id="${ticket.id}">Reserve</button>
//         </div>`;
//                 listTicketHTML.appendChild(newTicket);              
//             })
//         }
//     }

//     const initApp = () => {
//         fetch('tickets.json')
//         .then(response => response.json())
//         .then(data=> {
//             listTickets = data;
//             addDataToHTML();    
//         })
//     }

//     fetch('tickets.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Failed to load JSON");
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });

//     initApp();
// });



// document.addEventListener("DOMContentLoaded", () => {
//     let reservedConcerts = new Set();
//     let maxReservations = 6;

//     // Get reference to the cart badge
//     const cartBadge = document.querySelector(".ticket-icon span");

//     // Function to handle reservation
//     function reserveTicket(event) {
//         const concertId = event.target.dataset.concertId;

//         // Check if the concert is already reserved
//         if (reservedConcerts.has(concertId)) {
//             alert("You have already reserved this concert!");
//             return;
//         }

//         // Check reservation limit
//         if (reservedConcerts.size >= maxReservations) {
//             alert("You can only reserve a maximum of 6 concerts.");
//             return;
//         }

//         // Add concert to the reserved list
//         reservedConcerts.add(concertId);

//         // Update the cart badge count
//         cartBadge.innerText = reservedConcerts.size;

//         // Show the badge if at least one reservation
//         if (reservedConcerts.size > 0) {
//             cartBadge.style.display = "flex";
//         } else {
//             cartBadge.style.display = "none";
//         }

//         // Alert confirmation
//         alert("Concert reserved successfully! 🎟️");
//     }

//     // Add event listener for all buttons with class "reserve-btn"
//     document.querySelectorAll(".reserve-btn").forEach(button => {
//         button.addEventListener("click", reserveTicket);
//     });
// });

// // Track reserved concerts
// let reservedConcerts = new Set();
// let maxReservations = 6;

// // Function to handle reservation
// function reserveTicket(event) {
//     const concertId = event.target.dataset.concertId;
//     const cartBadge = document.getElementById("cart-badge");

//     // Check if the concert is already reserved
//     if (reservedConcerts.has(concertId)) {
//         alert("You have already reserved this concert!");
//         return;
//     }

//     // Check reservation limit
//     if (reservedConcerts.size >= maxReservations) {
//         alert("You can only reserve a maximum of 6 concerts.");
//         return;
//     }

//     // Add concert to the reserved list
//     reservedConcerts.add(concertId);

//     // Update the cart badge
//     cartBadge.innerText = reservedConcerts.size;
//     cartBadge.style.display = "inline-block";

//     // Alert confirmation
//     alert("Concert reserved successfully! 🎟️");
// }

// // Add event listener for all buttons with class "reserve-btn"
// document.addEventListener("DOMContentLoaded", () => {
//     document.querySelectorAll(".reserve-btn").forEach(button => {
//         button.addEventListener("click", reserveTicket);
//     });
// });



// // //click enter sa after mag-input sa name text field lilipat sa email text field sheesh
// document.addEventListener("DOMContentLoaded", function () {
//     const inputs = document.querySelectorAll("input");

//     inputs.forEach((input, index) => {
//         input.addEventListener("keydown", function (event) {
//             if (event.key === "Enter") {
//                 event.preventDefault(); 
//                 const nextInput = inputs[index + 1];
//                 if (nextInput) {
//                     nextInput.focus();
//                 }
//             }
//         });
//     });
// });

// // //start reservation button
// document.addEventListener("DOMContentLoaded", function () {
//     const startButton = document.getElementById("startButton");
//     let emailError = document.getElementById("emailError");
//     let inputError = document.getElementById("inputError");

//     if (startButton) {
//         startButton.addEventListener("click", function () {
//             const name = document.getElementById("name").value.trim();
//             const email = document.getElementById("email").value.trim();

//             if (!name || !email) {
//                 alert("Both name and email are required!");
//                 return;
//             }

//             const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//             if (!emailRegex.test(email)) {
//                 alert("Invalid email!");
//                 return;
//             }

//             window.location.href = "reserve.html";
//         });
//     } 
// });



// function getFormData() {
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const selectedDay = Array.from(document.querySelectorAll('input[name="day"]:checked'))
//                               .map(checkbox => checkbox.value);

//     return { name, email, day: selectedDay };
// }
// function saveFormData() {
//     const formData = getFormData(); 
//     localStorage.setItem("reservationData", JSON.stringify(formData));
//     console.log("Data saved:", formData);
// }
// function submitReservation(formData) {
//     saveFormData();
//     console.log("Sending data:", formData); 

//     fetch("https://getloudtix-production.up.railway.app/api/submitChoice", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Response from backend:", data);
//         if (data.success) {
//             console.log("Response from backend:", data);
//             alert("Reservation successful!");
//             window.location.href = "index.html";
//         } else {
//             alert("Reservation failed. " + data.message);
//         }
//     })
//     .catch(error => {
//         console.error("Error submitting reservation: ", error);
//         alert("An error occurred. Please try again. " +error.message);
//     });
// }

// // // submit reservation
// document.addEventListener("DOMContentLoaded", function() {
//     const confirm = document.getElementById("confirmation");
//     const nameInput = document.getElementById("name");
//     const emailInput = document.getElementById("email");

//     console.log(nameInput); 
//     console.log(emailInput);

//     confirm.addEventListener("submit", function(event) {
//         event.preventDefault();

//         const formData = getFormData();
//         if (formData.day.length === 0){
//             alert("Select at least one day.");
//             return;
//         }

//         const userConfirmed = confirm("Are you sure you want to reserve tickets for " + formData.day.join(", ") + "?");
//         if (!userConfirmed) return;

//         saveFormData(formData); 
//         submitReservation(formData); 
//     });
// });

//  // //view reservation button
// document.addEventListener("DOMContentLoaded", function() {
//     const viewButton = document.getElementById("viewButton");
//     const nameInput = document.getElementById("name");
//     const emailInput = document.getElementById("email");

//     if (viewButton) {
//         viewButton.addEventListener("click", function(event) {
//        //    // event.preventDefault();
//        // //     fetch(`/check-input?value=${encodeURIComponent(emailInput)}`)
//        // //         .then(response => response.json())
//        // //         .then(data => {
//        // //             if (!data.exists) {
//        // //                 window.location.href = "reserve.html";
//        // //             } else {
//        // //                 alert("Account does not exist. You haven't reserve any ticket yet.");
//        // //             }
//        // //         })
//        // //         .catch(error => console.error("Error:", error));
//         window.location.href = "view.html";
//         });
//     }
// });

// // //done button
// document.addEventListener("DOMContentLoaded", function () {
//     const doneButton = document.getElementById("doneButton");

//     if (doneButton){
//         doneButton.addEventListener("click", function() {
//             window.location.href = "index.html"
//         });
//     }
// });

// // //change reservation button
// document.addEventListener("DOMContentLoaded", function() {
//     const changeButton = document.getElementById("changeButton");
//     const submit = document.getElementById("submit");
//     const updButton = document.getElementById("updButton");
//     const deleteButton = document.getElementById("deleteButton");
//     const nameInput = document.getElementById("name");
//     const emailInput = document.getElementById("email");

//     if (changeButton) { 
//         changeButton.addEventListener("click", function(event) {
//             localStorage.setItem("hideSubmit", "true");
//             localStorage.setItem("showOtherButtons", "true");
//             window.location.href = "reserve.html";
//         });
//     }
//     if (submit && localStorage.getItem("hideSubmit") === "true") {
//         submit.style.display = "none"; 
//         localStorage.removeItem("hideSubmit");
//     }
//     if (localStorage.getItem("showOtherButtons") === "true") {
//         updButton.style.display = "block";
//         deleteButton.style.display = "block";
//     } else { 
//         updButton.style.display = "none";
//         deleteButton.style.display = "none";
//     }
// });

// // // update button 
// document.addEventListener("DOMContentLoaded", function() {
//     const confirm = document.getElementById("confirmation");
//     const updBUtton = document.getElementById("updButton");

// });

// // // delete button
// document.addEventListener("DOMContentLoaded", function () {
//     const confirm = document.getElementById("confirmation");
//     let deleteButton = document.getElementById("deleteButton");

//     if (localStorage.getItem("showDeleteButton") === "true") {
//         deleteButton.classList.add("show");
//         localStorage.removeItem("showDeleteButton"); 
//     }

//     deleteButton.addEventListener("click", function () {
//         let name = document.getElementById("name").value.trim();
//         let email = document.getElementById("email").value.trim();

//         if (!name || !email) {
//             alert("Please enter name and email!");
//             return;
//         }
//         fetch("/api/delete-reservation", {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name: name, email: email })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert("Reservation deleted successfully.");
//                 window.location.href = "index.html";
//             } else {
//                 alert("Error deleting reservation.");
//             }
//         })
//         .catch(error => console.error("Error:", error));
//     });
// });





   // try {
    //     let isExists = await checkIfExists(name, email);
    //     if (isExists) {
    //         alert("You have already made a reservation.");
    //         return;
    //     } 
            // signIn.style.display = "none";
            // rsrv.style.display = "block";
        
//     } catch(error) {
//         alert("An error occurred. Please try again later.");
//     }
// });

// async function checkIfExists(name, email) {
//     try {
//         const response = await fetch(`/api/checkReservation?name=${name}&email=${email}`);
//         const data = await response.json();
//         console.log("API Response: ", data)
//         return data.exists;
//     } catch (error) {
//         console.error("Error checking reservation:", error);
//         return false;
//     }
// 