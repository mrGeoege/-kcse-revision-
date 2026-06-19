/**
 * Random Joke Generator
 * Fetches random jokes from the JokeAPI (https://jokeapi.dev)
 */

// Using the JokeAPI - a free API that doesn't require authentication
const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Any';

/**
 * Fetch a random joke from the API
 * @returns {Promise<Object>} Joke object containing the joke data
 */
async function getRandomJoke() {
  try {
    const response = await fetch(JOKE_API_URL);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const joke = await response.json();
    return joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error;
  }
}

/**
 * Format and display a joke
 * @param {Object} joke - Joke object from the API
 * @returns {string} Formatted joke string
 */
function formatJoke(joke) {
  if (joke.type === 'single') {
    // Single joke format
    return joke.joke;
  } else if (joke.type === 'twopart') {
    // Two-part joke (setup and delivery)
    return `${joke.setup}\n\n${joke.delivery}`;
  } else {
    return 'Unable to format joke';
  }
}

/**
 * Main function to generate and display a random joke
 */
async function main() {
  try {
    console.log('🎭 Fetching a random joke...\n');
    
    const joke = await getRandomJoke();
    const formattedJoke = formatJoke(joke);
    
    console.log(formattedJoke);
    console.log(`\n📂 Category: ${joke.category}`);
    console.log(`😄 Type: ${joke.type}\n`);
    
  } catch (error) {
    console.error('Failed to generate joke:', error.message);
  }
}

// Run the joke generator
main();

// Export functions for use in other modules
module.exports = { getRandomJoke, formatJoke };
