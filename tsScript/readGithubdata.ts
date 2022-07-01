export default async function fetchGithubData<T>(urLocator:RequestInfo):Promise<T> {
    // read github header data
    const response = await fetch(urLocator);
    const body = await response.json();
   return body;
  }
  