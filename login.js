//LOGIN API//
const apiKey = "6795e1862e4264a096d23985";
const dbUrl = "https://burnttest-6fda.restdb.io/rest/logins";

// Register function
async function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
  
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    // System-defined values
    const gems = 0; // Default role for new users
    const hp = 50; // Default status for new users
    const atk = 10;
    //Validate gems is integer
    if (isNaN(gems) || gems < 0) {
      alert("Gems must be a valid positive number or zero");
      return;
    }

    try {
      const response = await fetch(dbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
        body: JSON.stringify({
          username,
          password,
          gems,
          hp,
          atk,
        }),
      });
  
      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }
  // Function to update gems
async function updateGems(userId, newGems) {
  if (isNaN(newGems) || newGems < 0) {
    alert("Gems must be a valid positive number");
    return;
  }

  try {
    const response = await fetch(`${dbUrl}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
      },
      body: JSON.stringify({
        gems: newGems, // Dynamically updated gems
      }),
    });

    if (response.ok) {
      alert("Gems updated successfully!");
    } else {
      alert("Failed to update gems");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred");
  }
}
  // Login function
  async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
  
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    try {
      const response = await fetch(`${dbUrl}?q={"username":"${username}"}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
      });
  
      const users = await response.json();
  
      if (users.length > 0 && users[0].password === password) {
        const user = users[0];
        alert("Login successful!");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }
  
  // Update user values function (optional, for admin/system use)
  async function updateUser(userId, updatedFields) {
    try {
      const response = await fetch(`${dbUrl}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (response.ok) {
        alert("User updated successfully!");
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }
