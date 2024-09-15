const key = process.env.GptApiFreeKey;
const url = 'https://api.chatanywhere.tech/';
const method = 'POST';

const headers = new Headers();
headers.append('Authorization', `Bearer ${key}`);
headers.append('Content-Type', 'application/json');

export const handler = async (event) => {
  console.info('received:', event);
  const { content } = JSON.parse(event.body);
  const body = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{
      role: 'user',
      content
    }]
  });
  const requestUrl = `${url}/v1/chat/completions`;
  const requestOptions = { method, headers, body };
  const res = await fetch(requestUrl, requestOptions);
  const data = await res.json();
  console.info('fetched:', JSON.stringify(data));
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      content: data.choices[0].message.content,
    })
  };
  console.info('sent:', response);
  return response;
}
