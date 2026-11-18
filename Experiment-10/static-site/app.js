const welcomeButton = document.querySelector("#welcome-button");
const welcomeMessage = document.querySelector("#welcome-message");

welcomeButton.addEventListener("click", () => {
    welcomeMessage.textContent = "You clicked the button. JavaScript is working!";
});
