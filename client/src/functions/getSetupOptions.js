const getSetupOptions = () => {
  return new Promise((resolve, reject) => {
    fetch('api/getSetupOptions', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //   courses,
      //   requestedQuestionCount,
      //   existingQuestionIDs
      // })
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => console.log(err)); //// Add proper error handling here
  });
}



export default getSetupOptions;
