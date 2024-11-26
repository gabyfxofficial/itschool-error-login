const loginFormEl = document.getElementById("login-form");

const login = async (e) => {
  e.preventDefault();

  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");

  const username = usernameEl.value;
  const password = passwordEl.value;

  // Clear previous error messages
  let errorEl = document.getElementById("error-message");
  if (errorEl) {
    errorEl.remove();
  }

  if (username === "" || password === "") {
    errorEl = document.createElement("div");
    errorEl.id = "error-message";
    errorEl.textContent = "Username and password cannot be empty.";
    errorEl.style.color = "red";
    errorEl.style.marginTop = "10px";
    loginFormEl.appendChild(errorEl);
    return;
  }

  try {
    const response = await fetch(`${serverAddress}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const loginData = await response.json();

    if (response.ok && loginData.token) {
      localStorage.setItem("token", loginData.token);
      window.location.href = "/index.html";
    } else {
      errorEl = document.createElement("div");
      errorEl.id = "error-message";
      errorEl.textContent = "Invalid username or password!";
      errorEl.style.color = "red";
      errorEl.style.marginTop = "10px";
      loginFormEl.appendChild(errorEl);
    }
  } catch (error) {
    errorEl = document.createElement("div");
    errorEl.id = "error-message";
    errorEl.textContent = "Invalid username or password! Please try again!";
    errorEl.style.color = "red";
    errorEl.style.marginTop = "10px";
    loginFormEl.appendChild(errorEl);
    console.log(error);
  }
};

loginFormEl.addEventListener("submit", login);
