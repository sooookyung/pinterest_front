export function fakeFetch(url?: string): Promise<Response> {
  if (url === undefined) {
    return Promise.reject(new Error("No url"));
  }
  if (url.includes("findAllIds")) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.01) {
          reject(new Error("Fake Error"));
        } else {
          resolve(
            new Response(
              JSON.stringify(Array.from({ length: 100 }, (_, i) => i + 1)),
            ),
          );
        }
      }, 300);
    });
  }

  if (url.includes("pins/")) {
    const ids = url.match(/\/pins\/(\d+)\?/);
    if (ids === null) {
      return Promise.reject(new Error("No id"));
    }
    const id = ids[1];
    return Promise.resolve(
      new Response(JSON.stringify({ image: { imgSeq: id } })),
    );
  }

  if (url.includes("upImages")) {
    const ids = url.match(/\/upImages\/(\d+)\//);
    if (ids === null) {
      return Promise.reject(new Error("No id"));
    }
    const id = ids[1];
    return fetch(
      "https://placehold.co/600x400?" +
        new URLSearchParams({ text: id }).toString(),
    );
  }
  return Promise.reject(new Error("Unknown Error"));
}
