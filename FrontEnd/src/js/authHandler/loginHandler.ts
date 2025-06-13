const loginForm = document.querySelector<HTMLFormElement>("form");

if (loginForm) {
  loginForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(loginForm);
    const emailOrUsername = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // Validate inputs
    if (!emailOrUsername || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Send POST request to the backend login endpoint
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailOrUsername,
          password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("user", result.name);
        localStorage.setItem("token", result.token);

        // Use the cookie and user role to determine where to redirect
        const userRole = result.role;
        if (userRole === "seller") {
          window.location.href =
            "/Cyber_Project/FrontEnd/src/Dashboard.html";
        } else if (userRole === "buyer") {
          window.location.href =
            "/Cyber_Project/FrontEnd/src/Buyerdashborad.html";
        } else {
          alert("Invalid user role received.");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  });
}

// Utility function to check if the user is already logged in
const checkAuth = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth-check", {
      method: "GET",
      credentials: "include", // Send cookies with the request
    });

    const checker = await response.json();

    if (response) {
      const user = await response.json();
      const userRole = user.role;

      // Redirect based on the role if already logged in
      if (userRole === "seller") {
        window.location.href = "/seller-dashboard.html";
      } else if (userRole === "buyer") {
        window.location.href = "/buyer-dashboard.html";
      }
    }
  } catch (error) {
    console.warn("User is not authenticated:", error);
    // Stay on the login page
  }
};

// Check authentication when the page loads
checkAuth();
