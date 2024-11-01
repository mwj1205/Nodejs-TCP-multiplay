# Nodejs-TCP-multiplay

## 1️⃣ 프로젝트 개요

Node.js로 구현한 tcp 멀티플레이 서버

## AWS EC2 배포

- 프로젝트를 [**AWS EC2**](https://ap-northeast-2.console.aws.amazon.com/ec2)에 배포하였습니다.
- 주소: 13.124.144.254:5555

## 2️⃣ 프로젝트 구조

### 바이트 배열 구조

```
| 필드 명     | 타입     | 설명                 |
| ----------- | -------- | -------------------- |
| totalLength | int      | 메세지의 전체 길이   |
| packetType  | int      | 패킷의 타입          |
| protobuf    | protobuf | 프로토콜 버퍼 구조체 |
```

### 공통 protobuf 구조:

```
| 필드 명          | 타입   | 설명                                      |
|------------------|--------|------------------------------------------|
| handlerID        | int    | 요청을 처리할 서버 핸들러의 ID             |
| userId           | string | 요청을 보내는 유저의 ID                    |
| clientVersion    | string | 현재 클라이언트 버전 (고정: "1.0.0")       |
| payload          | bytes  | 요청 내용                                 |
```

### payload 구조

- initialPayload

```
| 필드 명          | 타입    | 설명                                     |
|------------------|--------|------------------------------------------|
| deviceId         | string | 요청을 보내는 유저의 고유 ID               |
| playerId         | int    | player의 아바타를 결정할 Id               |
| latency          | float  | 클라이언트의 초기 latency                 |
```

- LocationUpdatePayload

```
| 필드 명          | 타입    | 설명                                     |
|------------------|--------|------------------------------------------|
| x                | float  | player의 x 좌표                          |
| y                | float  | player의 y 좌표                          |
```

### 파일 구조

```
📦src
┣ 📂classes
┃ ┣ 📂managers
┃ ┃ ┗ 📜latency.manager.js
┃ ┗ 📂models
┃ ┃ ┣ 📜game.class.js
┃ ┃ ┗ 📜user.class.js
┣ 📂constants
┃ ┣ 📜dbconfig.js
┃ ┣ 📜env.js
┃ ┣ 📜handlerIds.js
┃ ┗ 📜header.js
┣ 📂db
┃ ┣ 📂game
┃ ┃ ┣ 📜game.db.js
┃ ┃ ┗ 📜game.queries.js
┃ ┣ 📂migration
┃ ┃ ┗ 📜createSchemas.js
┃ ┣ 📂sql
┃ ┃ ┣ 📜game_db.sql
┃ ┃ ┗ 📜user_db.sql
┃ ┣ 📂user
┃ ┃ ┣ 📜user.db.js
┃ ┃ ┗ 📜user.queries.js
┃ ┗ 📜database.js
┣ 📂events
┃ ┣ 📜onConnection.js
┃ ┣ 📜onData.js
┃ ┣ 📜onEnd.js
┃ ┗ 📜onError.js
┣ 📂handler
┃ ┣ 📂game
┃ ┃ ┗ 📜locationUpdate.handler.js
┃ ┣ 📂user
┃ ┃ ┗ 📜initial.handler.js
┃ ┗ 📜index.js
┣ 📂init
┃ ┣ 📜index.js
┃ ┗ 📜loadProto.js
┣ 📂protobuf
┃ ┣ 📂notification
┃ ┃ ┗ 📜game.notification.proto
┃ ┣ 📂request
┃ ┃ ┣ 📜common.proto
┃ ┃ ┣ 📜game.proto
┃ ┃ ┗ 📜initial.proto
┃ ┣ 📂response
┃ ┃ ┗ 📜response.proto
┃ ┗ 📜packetName.js
┣ 📂session
┃ ┣ 📜game.session.js
┃ ┣ 📜sessions.js
┃ ┗ 📜user.session.js
┣ 📂utils
┃ ┣ 📂db
┃ ┃ ┣ 📜dateFormatter.js
┃ ┃ ┗ 📜testconnection.js
┃ ┣ 📂error
┃ ┃ ┣ 📜customError.js
┃ ┃ ┣ 📜errorCodes.js
┃ ┃ ┗ 📜errorHandlers.js
┃ ┣ 📂notification
┃ ┃ ┗ 📜game.notification.js
┃ ┣ 📂parser
┃ ┃ ┗ 📜packetParser.js
┃ ┣ 📂response
┃ ┃ ┗ 📜createResponse.js
┃ ┗ 📜transformCase.js
┗ 📜server.js
```

## 3️⃣ 필수 기능

## 4️⃣ 도전 기능

## 🛠️ 기술 스택

<img src="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

Node.js: 서버 사이드 로직 <br>
TCP: 실시간 데이터 통신
