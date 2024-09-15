const { createHash } = await import('node:crypto');

const token = process.env.WechatToken;

const response = {
  statusCode: 200,
  body: '',
};

export const handler = async (event) => {
  console.info('received:', event);
  const { signature, timestamp, nonce, echostr } = event.queryStringParameters || {};
  const str = [token, timestamp, nonce].sort().join('');
  const result = createHash('sha1').update(str).digest('hex');
  if (result == signature) {
    response.body = echostr;
  }
  console.info('sent:', response);
  return response;
}
