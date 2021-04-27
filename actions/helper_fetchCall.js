export function fetchCall(url, request) {
  console.log(url, request);
  return fetch(url, request)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
}
