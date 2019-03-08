// Make a client connection

const socket  = io.connect("http://localhost");

// Query DOM
const message = document.getElementById("message");
const user = document.getElementById("handle");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

// Emit events
btn.addEventListener("click",()=>{
    socket.emit("chat", {
        user: user.value,
        message: message.value
    });
});

message.addEventListener("keypress",() => {
    socket.emit("typing", user.value);
});


// Listen events
socket.on("chat", data => {
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.user}</strong> ${data.message}</p>`;
})

socket.on("typing", user => {
    feedback.innerHTML = `<p><em>${user} is typing a message...</em></p>`;
})