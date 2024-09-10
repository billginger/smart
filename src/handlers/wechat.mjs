const key = process.env.GptApiFreeKey;
const url = 'https://api.chatanywhere.tech/';
const method = 'POST';

const headers = new Headers();
headers.append('Authorization', `Bearer ${key}`);
headers.append('Content-Type', 'application/json');

export const handler = async (event) => {
  const body = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [{
      "role": "system",
      "content": "You are a helpful assistant."
    }, {
      "role": "user",
      "content": "Hello!"
    }]
  });
  const requestUrl = `${url}/v1/chat/completions`;
  const requestOptions = { method, headers, body };
  const res = await fetch(requestUrl, requestOptions);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    })
  };

  return response;
}
