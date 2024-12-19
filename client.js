const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(2024, '0.0.0.0', () => {
    console.log('서버에 연결됨');
    rl.prompt();
});

client.on('data', (data) => {
    console.log(data.toString());
    rl.prompt();
});

client.on('close', () => {
    console.log('서버와 연결 종료');
    rl.close();
});

rl.on('line', (input) => {
    if (input === "0") client.destroy();
    client.write(input);
});

rl.on('close', () => {
    client.destroy();
});