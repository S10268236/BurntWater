//trophys data
const trophiesData = [
  { index: 1, name: "First Login", image: "trophies/trophy1.png" },
  { index: 2, name: "Goober Defeated!", image: "trophies/trophy2.png" },
  { index: 3, name: "Slymurai Defeated!", image: "trophies/trophy3.png" }
];

// Function to display trophys
function displayTrophies(data) {
  const trophyContainer = document.getElementById('trophy');

  // Create and append each trophy
  data.forEach(trophy => {
    const trophyDiv = document.createElement('div');
    trophyDiv.className = 'trophy';

    trophyDiv.innerHTML = `
      <img src="${trophy.image}" alt="${trophy.name}" />
      <p class="trophy-name">${trophy.name}</p>
    `;

    trophyContainer.append(trophyDiv);
  });
}

// Load trophys
window.onload = () => {
  displayTrophies(trophiesData);
};