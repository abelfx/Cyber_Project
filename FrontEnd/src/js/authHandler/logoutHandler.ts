document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector(
    ".logoutButton"
  ) as HTMLButtonElement;

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        // Make a request to the backend to logout
        const response = await fetch("http://localhost:3000/api/logout", {
          method: "POST",
          credentials: "include",
        });

        const data = await response.json();
        localStorage.removeItem("user");
        if (response.ok) {
          console.log(data.status);

          window.location.href = "login.html";
        } else {
          console.error("Logout failed:", data);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    });
  }
});
