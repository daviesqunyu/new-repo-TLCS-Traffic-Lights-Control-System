function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

function navigateTo(page) {
  // Add your navigation logic here
  console.log("Navigating to " + page);
  // Example: window.location.href = page + ".html";
}

// Wait for the document to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
  // Caching DOM elements for better performance
  const roadStatus = document.getElementById('roadStatus');
  const pedestrianStatus = document.getElementById('pedestrianStatus');
  const carStatus = document.getElementById('carStatus');
  
  // API endpoints
  const endpoints = {
      roadStatus: 'https://api.example.com/roadStatus',
      pedestrianStatus: 'https://api.example.com/pedestrianStatus',
      carStatus: 'https://api.example.com/carStatus'
  };
  
  const apiKey = 'your_api_key';

  // Function to fetch and update status data
  async function fetchStatus(endpoint, statusElement) {
      try {
          const response = await fetch(`${endpoint}?api_key=${apiKey}`);
          const data = await response.json();
          statusElement.textContent = `${statusElement.id.replace('Status', ' Status')}: ${data.status}`;
      } catch (error) {
          statusElement.textContent = `${statusElement.id.replace('Status', ' Status')}: Error fetching data`;
          console.error(`Error fetching ${statusElement.id}:`, error);
      }
  }

  // Function to update all statuses
  function updateStatus() {
      fetchStatus(endpoints.roadStatus, roadStatus);
      fetchStatus(endpoints.pedestrianStatus, pedestrianStatus);
      fetchStatus(endpoints.carStatus, carStatus);
  }

  // Initially load the traffic data
  updateStatus();

  // Refresh traffic data every 60 seconds
  setInterval(updateStatus, 60000);

  // Simulated data (replace with actual data fetching logic)
  const simulatedData = {
      vehicleCount: 150,
      pedestrianCount: 50,
      heavyTrafficRoads: ['Mombasa Road', 'Uhuru Highway'],
      preferredRoute: 'Waiyaki Way',
      weatherCondition: 'Sunny',
      roadCondition: 'Good',
      speedLimit: '50 km/h'
  };

  // Update numeric data in the DOM
  for (const [key, value] of Object.entries(simulatedData)) {
      document.getElementById(key).innerText = Array.isArray(value) ? value.join(', ') : value;
  }

  // Generate visual representation (for demonstration purposes)
  const visualRepresentation = document.getElementById('visualRepresentation');
  visualRepresentation.innerHTML = `<img src="map.png" alt="Nairobi CBD Map">`;
});
