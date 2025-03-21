//click enter sa after mag-input sa name text field lilipat sa email text field sheesh
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
function submitReservation(formData) {
    saveFormData();
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
            alert("Reservation successful!");
            window.location.href = "index.html";
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
document.addEventListener("DOMContentLoaded", function() {
    const confirm = document.getElementById("confirmation");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    console.log(nameInput); 
    console.log(emailInput);

    confirm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = getFormData();
        if (formData.day.length === 0){
            alert("Select at least one day.");
            return;
        }

        const userConfirmed = confirm("Are you sure you want to reserve tickets for " + formData.day.join(", ") + "?");
        if (!userConfirmed) return;

        saveFormData(formData); 
        submitReservation(formData); 
    });
});

//view reservation button
document.addEventListener("DOMContentLoaded", function() {
    const viewButton = document.getElementById("viewButton");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (viewButton) {
        viewButton.addEventListener("click", function(event) {
            // event.preventDefault();
        //     fetch(`/check-input?value=${encodeURIComponent(emailInput)}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             if (!data.exists) {
        //                 window.location.href = "reserve.html";
        //             } else {
        //                 alert("Account does not exist. You haven't reserve any ticket yet.");
        //             }
        //         })
        //         .catch(error => console.error("Error:", error));
        window.location.href = "view.html";
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

//change reservation button
document.addEventListener("DOMContentLoaded", function() {
    const changeButton = document.getElementById("changeButton");
    const submit = document.getElementById("submit");
    const updButton = document.getElementById("updButton");
    const deleteButton = document.getElementById("deleteButton");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (changeButton) { 
        changeButton.addEventListener("click", function(event) {
            localStorage.setItem("hideSubmit", "true");
            localStorage.setItem("showOtherButtons", "true");
            window.location.href = "reserve.html";
        });
    }
    if (submit && localStorage.getItem("hideSubmit") === "true") {
        submit.style.display = "none"; 
        localStorage.removeItem("hideSubmit");
    }
    if (localStorage.getItem("showOtherButtons") === "true") {
        updButton.style.display = "block";
        deleteButton.style.display = "block";
    } else { 
        updButton.style.display = "none";
        deleteButton.style.display = "none";
    }
});

// update button 
document.addEventListener("DOMContentLoaded", function() {
    const confirm = document.getElementById("confirmation");
    const updBUtton = document.getElementById("updButton");

});

// delete button
document.addEventListener("DOMContentLoaded", function () {
    const confirm = document.getElementById("confirmation");
    let deleteButton = document.getElementById("deleteButton");

    if (localStorage.getItem("showDeleteButton") === "true") {
        deleteButton.classList.add("show");
        localStorage.removeItem("showDeleteButton"); 
    }

    deleteButton.addEventListener("click", function () {
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();

        if (!name || !email) {
            alert("Please enter name and email!");
            return;
        }
        fetch("/api/delete-reservation", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Reservation deleted successfully.");
                window.location.href = "index.html";
            } else {
                alert("Error deleting reservation.");
            }
        })
        .catch(error => console.error("Error:", error));
    });
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