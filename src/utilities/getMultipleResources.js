export async function getMultipleResourcesConcurrency(urls, limit = 4) {
  let index = 0;
  const results = [];

  async function worker() {
    while(index < urls.length) {
      const currentIndex = index++;
      const url = urls[currentIndex];
      const result = await getSingleResource(url);
      results[currentIndex] = result;
    }
  }

  const workers = Array.from({length: limit}, () => worker())
  await Promise.all(workers)

  const exitosas = results.filter(r => r.success);
  const fallidas = results.filter(r => !r.success);

  return { exitosas, fallidas }
}

async function getSingleResource(url) {
  try{
    const response = await fetch(url)
    if(!response.ok){
      throw new Error(`HTTP: ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data}

  }
  catch (error) {
    return { success: false, error: error.message}
  }
}
