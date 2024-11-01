# Nodejs-TCP-multiplay
![image](https://github.com/user-attachments/assets/46a7b02d-4ff5-4bf6-911c-be98f97a0d6b)

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
**1. 처음 세팅부터 프로젝트 생성** <br>
    강의를 참고하여 프로젝트를 처음부터 세팅하여 만들어 보았습니다. <br>
    강의를 보면서 따라한 코드: [TCP-multiplay-project](https://github.com/mwj1205/TCP-multiplay-project) <br>
<br>
**2. 유저 접속** <br>
    ![image](https://github.com/user-attachments/assets/144d755d-6b54-49ab-a303-fc8bec7d969d) <br>
    서버를 처음 시동할 때 게임 세션 하나를 미리 생성합니다.
    유저들은 이 게임 세션에 접속하게 됩니다.


## 4️⃣ 도전 기능
**1. DB 연동** <br>
   **접속했던 유저의 정보 저장**
   ![image](https://github.com/user-attachments/assets/b7e4b47e-7ac5-4507-bf6c-cfe4fd367e3d) <br>
   deviceId가 같다면 같은 id로 관리합니다. <br>

   **같은 device id 를 가진 유저가 재접속 했을 경우 마지막 위치에서 재접속** <br>
   ![image](https://github.com/user-attachments/assets/077f4d92-72b0-4afc-ac25-802e6c563771) <br>
   유저가 게임에서 접속을 해제했을 때 위치를 DB에 저장한 후 이후 재접속했을 때 마지막 위치에서 재접속 하도록 합니다. <br> <br>
   NetworkManager.cs <br>
   ![image](https://github.com/user-attachments/assets/c1ccecdc-78a8-48fb-9ade-9f9ec58ebcdd) <br>
   Player.cs <br>
   ![image](https://github.com/user-attachments/assets/d7a6beae-01e6-43b3-9f03-1b0c1378b6af) <br>
   Player의 transfrom을 변경해 해당 위치에 스폰되도록 함니다. <br>

**2. Latency를 이용한 추측항법 적용** <br>
   ![image](https://github.com/user-attachments/assets/3b888624-0836-483e-b631-8af9d2e34fd8) <br>
   latency를 고려해 어느 정도 미리 계산된 위치를 다른 클라이언트로 전송합니다. <br>
   키보드로 위, 아래, 대각선 밖에 움직이기 때문에 굳이 삼각함수를 사용할 필요는 없지만, 배운 기념으로 한번 사용해 보았습니다. <br>


## 🛠️ 기술 스택

<img src="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://img.shields.io/badge/tcp-yellow" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://img.shields.io/badge/-Unity-%23444444?logo=Unity" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://img.shields.io/badge/-C%23-000000?logo=Csharp&style=flat" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

Node.js: 서버 사이드 로직 <br>
TCP: 실시간 데이터 통신 <br>
Unity: 클라이언트 로직
