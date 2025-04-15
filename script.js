document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const optimizerForm = document.getElementById('optimizerForm');

  // Login functionality
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value;
      const pass = loginForm.querySelector('input[type="password"]').value;

      // Basic mock login check
      if (email && pass.length >= 6) {
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html"; // Redirect to dashboard
      } else {
        alert("Please enter valid email and password.");
      }
    });
  }

  // Signup functionality
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;

      if (name && email && pass.length >= 6) {
        localStorage.setItem("username", name); // Store the full name in localStorage
        alert("Signup successful! Redirecting to login...");
        window.location.href = "index.html"; // Redirect to login page
      } else {
        alert("Please fill all fields correctly.");
      }
    });
  }

  // Dashboard functionality
  if (optimizerForm) {
    const resultDiv = document.getElementById('result');
    const historyList = document.getElementById('history');
    const nameDisplay = document.getElementById('usernameDisplay');
    const username = localStorage.getItem("username");

    // Display the user's name in the dashboard
    if (nameDisplay && username) {
      nameDisplay.textContent = username; // Display stored name
    } else {
      nameDisplay.textContent = "User"; // Default name if none exists
    }

    // Load history from localStorage
    const loadHistory = () => {
      const history = JSON.parse(localStorage.getItem("fertilizerHistory")) || [];
      historyList.innerHTML = "";
      history.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `🌱 <strong>${entry.crop}</strong> | ${entry.soil} | ${entry.area} acres → <strong>${entry.total}kg</strong>`;
        li.style.padding = "6px 0";
        historyList.appendChild(li);
      });
    };

    loadHistory(); // Load history on page load

    // Handle optimizer form submission
    optimizerForm.addEventListener('submit', e => {
      e.preventDefault();
      const crop = document.getElementById('crop').value;
      const soil = document.getElementById('soil').value;
      const area = Number(document.getElementById('area').value);

      let baseFertilizer = 50; // Base fertilizer amount
      if (soil.toLowerCase().includes("clay")) baseFertilizer += 10; // Adjust based on soil type
      if (crop.toLowerCase().includes("wheat")) baseFertilizer += 15; // Adjust based on crop

      const total = baseFertilizer * area; // Calculate total fertilizer

      resultDiv.innerHTML = `💡 For <strong>${crop}</strong> in <strong>${soil}</strong> soil, apply <strong>${baseFertilizer}kg</strong> per acre. Total: <strong>${total}kg</strong> 🌿`;

      // Store the history in localStorage
      const newEntry = { crop, soil, area, total };
      const history = JSON.parse(localStorage.getItem("fertilizerHistory")) || [];
      history.unshift(newEntry); // Add new entry to the beginning
      localStorage.setItem("fertilizerHistory", JSON.stringify(history.slice(0, 10))); // Limit history to 10 entries

      loadHistory(); // Reload history after adding new entry
    });
  }

  // Logout functionality
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem("username"); // Remove username from localStorage
      localStorage.removeItem("fertilizerHistory"); // Optional: Clear history as well
      alert("Logged out successfully!");
      window.location.href = "index.html"; // Redirect to login page
    });
  }
});
