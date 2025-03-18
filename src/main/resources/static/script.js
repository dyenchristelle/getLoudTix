//start reservation button
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

// view button
document.addEventListener("DOMContentLoaded", function () {
    const viewButton = document.getElementById("viewButton");

    if (viewButton){
        viewButton.addEventListener("click", function() {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            
            window.location.href = "view.html"
        });
    }
});

//done button
document.addEventListener("DOMContentLoaded", function () {
    const doneButton = document.getElementById("doneButton");

    if (doneButton){
        doneButton.addEventListener("click", function() {
            window.location.href = "index.html"
        });
    }
});

function getFormData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const selectedDay = Array.from(document.querySelectorAll('input[name="day"]:checked'))
                              .map(checkbox => checkbox.value);

    return { name, email, day: selectedDay };
}
function saveFormData() {
    const formData = getFormData(); 
    localStorage.setItem("reservationData", JSON.stringify(formData));
    console.log("Data saved:", formData);
}
function submitReservation(event) {
    event.preventDefault(); 
    saveFormData();
    const formData = getFormData();
    console.log("Sending data:", formData); 

    fetch("https://getloudtix-production.up.railway.app/api/submitChoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from backend:", data);
        if (data.success) {
            console.log("Response from backend:", data);
            window.location.href = "index.html";
            alert("Reservation successful!");
        } else {
            alert("Reservation failed. " + data.message);
        }
    })
    .catch(error => {
        console.error("Error submitting reservation: ", error);
        alert("An error occurred. Please try again. " +error.message);
    });
}

// submit reservation
document.getElementById("confirmation").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = getFormData();
    
    if (!formData.name || !formData.email || formData.day.length === 0) {
        alert("Please fill in all fields and select at least one day.");
        return;
    }

    const userConfirmed = confirm("Are you sure you want to reserve tickets for " + formData.day.join(", ") + "?");
    if (!userConfirmed) return;

    saveFormData(); 
    submitReservation(event); 
});

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