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

// Function to update price ticker dynamically
function updatePriceTicker() {
    const ticker = document.getElementById('price-ticker');

    // Fetch live prices from CoinGecko API for Bitcoin and Ethereum
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const btcPrice = data.bitcoin.usd;
            const ethPrice = data.ethereum.usd;

            // Adjust the AIBotCoin price manually (for example purposes)
            const totalSupply = 10000000000000; // 10 trillion tokens
            const marketCap = 1000000; // $1 million market cap
            const aiBotCoinPrice = marketCap / totalSupply; // Price per token

            ticker.innerHTML = `
                <span>AIBotCoin: $${aiBotCoinPrice.toFixed(8)} | </span>
                <span>Bitcoin (BTC): $${btcPrice} | </span>
                <span>Ethereum (ETH): $${ethPrice}</span>
            `;
        })
        .catch(error => console.error('Error fetching prices:', error));
}

// Call the updatePriceTicker function every 10 seconds (10,000 milliseconds)
setInterval(updatePriceTicker, 10000); // Adjust to 10 seconds for faster updates

// Initial call to display prices when page loads
document.addEventListener('DOMContentLoaded', updatePriceTicker);
