const RENEW_EVERY = 300000;
let fetchPromise;
let lastFetch = 0;

//this is an Azure function which returns an authtoken and region for the azure speach service
const speachAuthTokenHost = 'https://x.azurewebsites.net/api/GetToken';

async function region() {
  const { region } = await fetchCredentials();
  return region;
}

async function token() {
  const { authorizationToken } = await fetchCredentials();
  return authorizationToken;
}

// This fetch function will be called every time Web Speech recognizer or synthesizer start
// You are advised to cache the token to prevent unnecessary network call and delay
async function fetchCredentials() {
  const now = Date.now();

  if (!fetchPromise || now - lastFetch > RENEW_EVERY) {
    fetchPromise = fetch(speachAuthTokenHost, { method: 'POST' })
      .then(res => res.json())
      .catch(() => {
        lastFetch = 0;
      });

    lastFetch = now;
  }

  return fetchPromise;
}

export default fetchCredentials;
export { region, token };
