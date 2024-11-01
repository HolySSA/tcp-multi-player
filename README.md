# tcp-multi-player

TCP를 이용하여 멀티 게임 서버를 구축해보자!

# 사용 라이브러리

yarn dotenv lodash mysql2 protobufjs uuid nodemon prettier

# 구현 내용

- 프로토버프를 이용한 패킷 구조 설계
- 상수 및 환경변수 중앙 집중식 관리
- mysql을 이용한 DB (유저 세션)
- 객체지향 패턴
- 레이턴시, 레이턴시 마스킹
  ...

# 패킷 구조

| 필드 명     | 타입     | 설명                 | 크기   |
| ----------- | -------- | -------------------- | ------ |
| totalLength | int      | 메세지의 전체 길이   | 4 Byte |
| packetType  | int      | 패킷의 타입          | 1 Byte |
| protobuf    | protobuf | 프로토콜 버퍼 구조체 | 가변   |
