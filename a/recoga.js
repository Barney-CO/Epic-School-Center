fetch('/js/json/apps.json')
// Function to fetch JSON data
async function fetchJSONData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  // Function to display random items
  function displayRandomItems(data) {
    const container = document.getElementById('recommended-g');
    const randomItems = getRandomItems(data, 4);
  
    randomItems.forEach(item => {
      const element = document.createElement('div');
      game.classList.add('game');
      element.innerHTML = `<img src="${item.image}" loading="lazy"; alt="${item.title}"><h2>${item.title}</h2>`;
      container.appendChild(element);
    });
  }
  
  // Function to get random items from an array
  function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Fetch the JSON data
  fetchJSONData('/js/json/games.json')
    .then(data => {
      displayRandomItems(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    // fullscreen function
    function fullscreenFunction() {
        const iframe = document.getElementById('game-frame');
      
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // IE/Edge
          iframe.msRequestFullscreen();
        }
      }
      
      // Make the fullscreen button use the fullscreen function when clicked
      const fullscreenButton = document.querySelector('.fullscreen-svg');
      fullscreenButton.addEventListener('click', fullscreenFunction);

      function shareFunction() {
        
      }
      