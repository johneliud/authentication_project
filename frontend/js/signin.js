import { showFeedback } from "./script.js";

// Password toggle visibility
const visibilityBtn = document.querySelector(".toggle-password-visibility");

visibilityBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const input = document.getElementById(visibilityBtn.dataset.target);
  input.type = input.type === "password" ? "text" : "password";
});

const signinForm = document.getElementById("signinForm");
const signinBtn = document.getElementById("signinBtn");

signinForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  signinBtn.disabled = true;
  signinBtn.textContent = "Logging in...";

  const formData = new FormData(signinForm);

  try {
    const response = await fetch("/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showFeedback(data.message, data.success);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      const error = await response.json();
      showFeedback(error.message, false);
      signinBtn.disabled = false;
      signinBtn.textContent = "Log In";
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    showFeedback("Failed to sign in. Please try again.", false);
    signinBtn.disabled = false;
    signinBtn.textContent = "Log In";
    return;
  }
});
