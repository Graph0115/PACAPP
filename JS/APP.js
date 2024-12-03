// Auth0 Configuration
const auth0 = new auth0.WebAuth({
    domain: "YOUR_DOMAIN", // Replace with your Auth0 domain
    clientID: "YOUR_CLIENT_ID", // Replace with your Auth0 Client ID
    redirectUri: "http://localhost:3000", // Replace with your app's redirect URI
    responseType: "token id_token",
    scope: "openid profile email"
  });
  
  // DOM Elements
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout");
  const userProfile = document.getElementById("user-profile");
  
  // Login
  loginButton.addEventListener("click", () => {
    auth0.authorize(); // Redirects the user to the Auth0 login page
  });
  
  // Handle Authentication
  window.onload = () => {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // Save tokens to localStorage
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("idToken", authResult.idToken);
  
        // Display user profile
        auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          if (profile) {
            userProfile.textContent = JSON.stringify(profile, null, 2);
          }
        });
      } else if (err) {
        console.error("Authentication Error:", err);
      }
    });
  };
  
  // Logout
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    userProfile.textContent = "";
    alert("Logged out");
  });

  