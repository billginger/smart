const { spawn } = require('child_process');
const { Parameters } = require('./env.json');

const parameterOverrides = Object.entries(Parameters).map(([key, value]) => `${key}=${value}`).join(' ');

const deploy = spawn('sam', ['deploy', '--parameter-overrides', parameterOverrides], {
  stdio: 'inherit',
  shell: true
});

deploy.on('close', () => {
  console.log('Deploy Succeeded');
});
