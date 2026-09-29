document.getElementById("loginForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {

            // Store the logged-in user's name
            sessionStorage.setItem("userName", result.name);

            // Open welcome page
            window.location.href = "/welcome";

        } else {

            alert("Invalid Full Name or Password!");

        }

    } catch (error) {

        console.error(error);
        alert("Could not connect to server!");

    }

});