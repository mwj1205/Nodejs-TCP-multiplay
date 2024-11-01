# Nodejs-TCP-multiplay

Node.js로 구현한 tcp 멀티플레이 서버

## 파일 구조

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
