// Select the form element
const signupForm = document.querySelector<HTMLFormElement>("form");

if (signupForm) {
  signupForm.addEventListener("submit", async (event: Event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Collect form data
    const formData = new FormData(signupForm);
    const name = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const role = formData.get("role")?.toString() || ""; // Get the selected role

    // Validate inputs
    if (!name || !email || !password || !role) {
      alert("Please fill out all fields and select a role.");
      return;
    }

    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      // Handle the response
      if (response.ok) {
        const result: { message: string } = await response.json();
        window.location.href =
          "/Cyber_Project/FrontEnd/src/login.html";
        alert("Signup successful! You can now log in.");
      } else {
        const errorData: { message: string } = await response.json();
        alert(
          `Signup failed: ${errorData.message || "Unknown error occurred"}`
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred while signing up. Please try again later.");
    }
  });
}
