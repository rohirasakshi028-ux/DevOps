const name = sessionStorage.getItem("userName");

if (name) {

    document.getElementById("welcomeMessage").textContent =
        "Welcome, " + name + "!";

} else {

    window.location.href = "/login";

}