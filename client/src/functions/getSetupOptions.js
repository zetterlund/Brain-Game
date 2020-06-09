export default function getSetupOptions() {
  return new Promise((resolve, reject) => {
    fetch('api/getSetupOptions', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => console.log(err)); //// Add proper error handling here
  });
}
