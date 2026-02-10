API => Application Programming Interface
    -> It allows two different apps talk to each other.
    -> Waiter example

Types  of APIs
REST API => It uses Http methods

 GET => Get some posts on instagram
 POST => Create a post
 PUT => Update a post(the entire post)
 PATCH => updates partially (modifying only specific fields)
 DELETE = Delete a post


//What is Endpoint?
// An endpoint is a combination of a URL + HTTP method (GET, POST, PUT, DELETE) that lets client to interact wth a specific resource.
// Example: GET /api/notes

// app.get("/api/notes", (req, res) => {
//     //send the notes to the frontend
//     res.status(200).send("You got 5 notes");
// })


// app.post("/api/notes", (req, res) => {
//     res.status(201).json({message: "Note created successfully!" });
// })

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({message: "Note updated successfully!"});
// })

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({message: "Note deleted successfully!"});
// })


What is middleware?
-> Its a functions that runs in between the the response and the request.

What is rate limiting?
-> Rate limiting is a way to control how often someone can do something on a website or app like how many times they can refresh a page, make a request to an API, or try to log in.
(like Only 100 requests per user every 15 minutes.)

=> It helps in:-
1. Preventing abuse(eg: stopping someone from making 1000 login attempts in a minute)
2. Protecting servers from getting overwhelmed.(stopping them from getting overloaded so they keep working smoothly.)

For this we use spstash.com. => Reddis => its like a nosql database stores data in key value pairs.(whereas mongodb store it in form of collections)


