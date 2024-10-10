// Function to add fade-in animation when sections are scrolled into view
document.addEventListener('DOMContentLoaded', function () {
        const sections = document.querySelectorAll('section');

function fadeInSection() {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (sectionPosition < screenPosition) {
                section.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', fadeInSection);
});

// Add fade-in class in CSS to define the animation
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 1s ease-out, transform 1s ease-out;
        }
        
        section {
            opacity: 0;
            transform: translateY(50px);
        }
    `;
    document.head.appendChild(style);
});

// Price ticker function using CoinGecko API
function updatePriceTicker() {
    const ticker = document.getElementById('price-ticker');

    // Fetch live prices from CoinGecko API (Bitcoin and Ethereum as examples)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const btcPrice = data.bitcoin.usd;
            const ethPrice = data.ethereum.usd;

            // You can adjust the AIBotCoin price manually for now
            const aiBotCoinPrice = 0.00001;

            ticker.innerHTML = `
                <span>AIBotCoin: $${aiBotCoinPrice} | </span>
                <span>Bitcoin (BTC): $${btcPrice} | </span>
                <span>Ethereum (ETH): $${ethPrice}</span>
            `;
        })
        .catch(error => console.error('Error fetching prices:', error));
}

// Call updatePriceTicker every 30 seconds to refresh prices
setInterval(updatePriceTicker, 30000);

// Initial call to display prices when page loads
document.addEventListener('DOMContentLoaded', updatePriceTicker);
