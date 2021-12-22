# ProjectT

인프라 : AWS EC2(amazone linux), AWS RDS

엔진 : Node.js, express.js

언어 : Typescript, C#

DB : mariaDB(mysql), redis

기타 : docker, pm2


# 구성
admin_svr : 운영서버/툴

chat_svr : 채팅서버

game_svr : 게임서버

rank_svr : 랭킹서버 (작성중)

common : 공용코드

packet : 패킷 파일(c# 코드를 ts로 변환하여 사용)

config : 설정파일 (.config)

script : 서버 설정 및 실행 bash 스크립트

table : 게임 데이터 테이블 (.csv)

test_client : 패킷 테스트 클라이언트 코드

test_code: 테스트 코드

node_modules : npm 패키지 설치된 폴더


# branch
dev : 개발 브랜치

master : 보관용 브랜치 (live)


# Service
게임 서버 : https://game.rumdice.net/test (test 패킷 경로)

운영 서버 :  http://admin.rumdice.net:5000/

클라이언트 : https://github.com/rumdice/UnityProject/tree/main/ChatTester (유니티 클라이언트)

