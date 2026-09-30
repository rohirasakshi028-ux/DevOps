const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "packet.json");

const server = http.createServer((req, res) => {

    
    // OPEN REGISTRATION PAGE
    
    if (req.method === "GET" && req.url === "/") {

        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end("Error loading page");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }


    
    // OPEN LOGIN PAGE
    
    if (req.method === "GET" && req.url === "/login") {

        fs.readFile(path.join(__dirname, "login.html"), (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end("Error loading login page");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }


    
    // SERVE login.js
   
    if (req.method === "GET" && req.url === "/login.js") {

        fs.readFile(path.join(__dirname, "login.js"), (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end("login.js not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/javascript"
            });

            res.end(data);
        });

        return;
    }


    
    // OPEN WELCOME PAGE
    
    if (req.method === "GET" && req.url === "/welcome") {

        fs.readFile(path.join(__dirname, "welcome.html"), (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end("Error loading welcome page");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }


    
    // SERVE welcome.js
    
    if (req.method === "GET" && req.url === "/welcome.js") {

        fs.readFile(path.join(__dirname, "welcome.js"), (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end("welcome.js not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/javascript"
            });

            res.end(data);
        });

        return;
    }


    
    // SERVE script.js
    
    if (req.method === "GET" && req.url === "/script.js") {

        fs.readFile(path.join(__dirname, "script.js"), (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end("script.js not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/javascript"
            });

            res.end(data);
        });

        return;
    }


   
    // SERVE style.css
    
    if (req.method === "GET" && req.url === "/style.css") {

        fs.readFile(path.join(__dirname, "style.css"), (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end("style.css not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/css"
            });

            res.end(data);
        });

        return;
    }


    
    // REGISTER NEW STUDENT
   
    if (req.method === "POST" && req.url === "/register") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const newStudent = JSON.parse(body);

                // Read existing JSON
                const data = JSON.parse(
                    fs.readFileSync(DATA_FILE, "utf8")
                );

                // Add new student
                data.students.push(newStudent);

                // Save updated JSON
                fs.writeFileSync(
                    DATA_FILE,
                    JSON.stringify(data, null, 2)
                );

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: true,
                    message: "Registration saved successfully"
                }));

            } catch (error) {

                console.error(error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Failed to save registration"
                }));
            }
        });

        return;
    }


    
    // LOGIN AUTHENTICATION
    
    if (req.method === "POST" && req.url === "/login") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                // Get login details from frontend
                const loginData = JSON.parse(body);

                // Read students from packet.json
                const data = JSON.parse(
                    fs.readFileSync(DATA_FILE, "utf8")
                );

                // Find matching student
                const student = data.students.find(
                    student =>
                        student.name === loginData.name &&
                        student.password === loginData.password
                );

                // If student is found
                if (student) {

                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: true,
                        name: student.name
                    }));

                } 
                
                // If student is not found
                else {

                    res.writeHead(401, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: "Invalid Full Name or Password"
                    }));
                }

            } catch (error) {

                console.error(error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Login failed"
                }));
            }
        });

        return;
    }


   
    
    // PAGE / ROUTE NOT FOUND
    
    res.writeHead(404);
    res.end("Not Found");

});



// START SERVER

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});