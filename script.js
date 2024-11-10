document.addEventListener('DOMContentLoaded', () => {
    const generateRandomBtn = document.getElementById('generateRandom');
    const generateEarthLikeBtn = document.getElementById('generateEarthLike');
    const planetDisplay = document.getElementById('planetDisplay');
    const loading = document.getElementById('loading');

    const API_BASE_URL = 'https://five-2-71ex.onrender.com';

    async function generatePlanet(params = {}) {
        try {
            loading.style.display = 'block';
            planetDisplay.innerHTML = '';

            const queryString = new URLSearchParams(params).toString();
            const url = `${API_BASE_URL}/generate${queryString ? '?' + queryString : ''}`;
            
            const response = await fetch(url);
            const data = await response.json();

            displayPlanetInfo(data);
        } catch (error) {
            console.error('Error generating planet:', error);
            planetDisplay.innerHTML = '<p style="color: #ff3366">Failed to generate planet. Please try again!</p>';
        } finally {
            loading.style.display = 'none';
        }
    }

    function displayPlanetInfo(planet) {
        const properties = Object.entries(planet).map(([key, value]) => {
            return `
                <div class="planet-property">
                    <span class="property-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span>${value}</span>
                </div>
            `;
        }).join('');

        planetDisplay.innerHTML = properties;
    }

    generateRandomBtn.addEventListener('click', () => generatePlanet());
    
    generateEarthLikeBtn.addEventListener('click', () => {
        generatePlanet({ base: 'earth' });
    });

    // Generate a random planet when the page loads
    generatePlanet();
});
