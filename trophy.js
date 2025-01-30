// Fetch trophy data from a JSON file or API
fetch('/trophies.json') // Replace with your API endpoint or JSON file path
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    displayTrophy(data); // Pass the fetched data to displayTrophy
  })
  .catch(error => {
    console.error('Error loading achievements:', error);
  });

// Function to display trophies
function displayTrophy(data) {
  const trophyContainer = document.getElementById('trophy');

  // Clear the container (in case it's called multiple times)
  trophyContainer.innerHTML = '';

  // Create and append each trophy
  data.forEach(trophy => {
    const trophyDiv = document.createElement('div');
    trophyDiv.className = 'trophy';

    trophyDiv.innerHTML = `
      <img src="${trophy.image}" alt="${trophy.name}" />
      <p class="trophy-name">${trophy.name}</p>
    `;

    trophyContainer.appendChild(trophyDiv);
  });
}

