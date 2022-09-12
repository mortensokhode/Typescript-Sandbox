export default async function fetchGithubData(urLocator) {
    // read github header data
    const response = await fetch(urLocator);
    const body = await response.json();
    return body;
}
