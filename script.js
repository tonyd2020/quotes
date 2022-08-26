const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quotes from API
let apiQuoutes =[];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show new Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuoutes[Math.floor(Math.random() * apiQuoutes.length)];

    // Check if author is null
    if(!quote.author ) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    // Check Quote length and add the 'long-quote' class if greater than 50 chars
    if(quote.text.length > 40) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    // Hide Loader
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuoutes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
}

// Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On load
getQuotes();
