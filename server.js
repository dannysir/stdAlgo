const net = require('net');

class EchoServer {
    // 그룹

    // 그룹 이름 - 각각의 클라이언트 소캣

    // checkIn 여부 ( 각 클라이언트별 그룹 목록 )

    // 키값  - 그룹 이름

    constructor(port) {
        this.port = port;
        // 서버가 생성될 때마다 (socekt)=>{} 콜백 실행.
        this.server = net.createServer((socket) => this.handleConnection(socket));
    }

    start() {
        this.server.listen(this.port, '0.0.0.0', () => {
            console.log(`서버가 0.0.0.0:${this.port}에서 리스닝 중`);
        });
    }

    handleConnection(socket) {
        const clientInfo = `${socket.remoteAddress}:${socket.remotePort}`;
        console.log(`새로운 클라이언트 접속: ${clientInfo}`);


        // reuse 조건 때문에 넣은 코드
        // 연결을 활성상태로 유지
        socket.setKeepAlive(true);
        // 데이터를 즉시 전송
        socket.setNoDelay(true);


        // 이곳에 요구 사항별 함수를 실행 시킨다.
        socket.on('data', (data) => {
            const input = data.toString().trim();
            console.log(`클라이언트로부터 데이터 수신: ${input}`);

            if (input.length >= 4 && input.length <= 1024) {
                console.log(`클라이언트에게 응답 전송: ${input}`);
                socket.write(input + "\n");  // 새 줄 문자 추가
                socket.end();
            } else {
                socket.write("4 ~ 1024 길이만 입력해주세요!!!\n");
            }
        });

        socket.on('end', () => {
            console.log(`클라이언트 ${clientInfo} 연결 종료`);
        });

        socket.on('error', (err) => {
            console.error(`클라이언트 ${clientInfo} 오류 발생:`, err);
        });
    }
}

const server = new EchoServer(2024);
server.start();