const statusMessage = document.querySelector("#status");
const authForms = document.querySelector("#auth-forms");
const account = document.querySelector("#account");
const accountEmail = document.querySelector("#account-email");
const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");
const logoutButton = document.querySelector("#logout-button");

function showStatus(text, isError) {
  statusMessage.textContent = text;
  statusMessage.classList.toggle("error", Boolean(isError));
}

function showAccount(user) {
  authForms.hidden = true;
  account.hidden = false;
  accountEmail.textContent = "Logged in as " + user.email;
}

function showAuthForms() {
  authForms.hidden = false;
  account.hidden = true;
}

async function request(url, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options && options.headers),
    },
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.error || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return result;
}

async function submitAuthForm(form, endpoint, successMessage) {
  const submitButton = form.querySelector("button[type='submit']");
  const credentials = Object.fromEntries(new FormData(form).entries());
  submitButton.disabled = true;
  showStatus("", false);

  try {
    const result = await request("/api/auth/" + endpoint, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    form.reset();
    showAccount(result.user);
    showStatus(successMessage, false);
  } catch (error) {
    showStatus(error.message, true);
  } finally {
    submitButton.disabled = false;
  }
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitAuthForm(registerForm, "register", "Account created. You are logged in.");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitAuthForm(loginForm, "login", "You are logged in.");
});

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  try {
    await request("/api/auth/logout", { method: "POST" });
    showAuthForms();
    showStatus("You are logged out.", false);
  } catch (error) {
    showStatus(error.message, true);
  } finally {
    logoutButton.disabled = false;
  }
});

async function checkLogin() {
  try {
    const result = await request("/api/auth/me");
    showAccount(result.user);
  } catch (error) {
    showAuthForms();
    if (error.status !== 401) {
      showStatus(error.message, true);
    }
  }
}

checkLogin();
