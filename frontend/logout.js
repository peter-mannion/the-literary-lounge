// Logout logic

document.getElementById("logoutBtn").addEventListener("click", () => {
  // Remove stored login info
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redirect to login page
  window.location.href = "login.html";
});
