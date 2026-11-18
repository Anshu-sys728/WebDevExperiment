const form = document.querySelector("#feedback-form");
const statusMessage = document.querySelector("#feedback-status");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusMessage.classList.remove("error");
    statusMessage.textContent = "Submitting...";

    const formData = new FormData(form);
    try {
        const response = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.get("name"),
                feedback: formData.get("feedback"),
            }),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || "Feedback could not be submitted.");
        }

        statusMessage.textContent = result.message;
        form.reset();
    } catch (error) {
        statusMessage.classList.add("error");
        statusMessage.textContent = error.message || "Could not connect to the server.";
    }
});
