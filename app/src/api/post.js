const postRequest = async (url, data) => {
  let request = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      Origin: window.location.origin,
      "Content-Type": "application/json"
    }
  })
  return await request.json()
}

export default {
  postRequest
};