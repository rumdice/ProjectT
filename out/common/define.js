"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamType = exports.dbErrorMsg = exports.platform = exports.CONFIG_PATH_DB_REAL = exports.CONFIG_PATH_DB_QA = exports.CONFIG_PATH_DB_DEV = exports.TEAM_LEADER_EXPIRE_DAYS = exports.MAX_TEAM_CHAT_HELP_CNT = exports.MAX_TEAM_CHAT_ID_LENGTH = exports.MAX_TEAM_CHATLOG_CNT = exports.MAX_TEAM_MEMBER_CMT = exports.TEAM_SEARCH_CNT = exports.TEAM_RANK_CNT = exports.PERSONAL_RANK_CNT = exports.EVENT_TOURNAMENT_GROUP_RANK_CNT = exports.EVENT_TOURNAMENT_LEVEL_CNT = exports.MAX_USER_NICK_NAME = exports.PORT_SVR_CHAT = exports.PORT_SVR_ADMIN = exports.PORT_SVR_API = exports.CLUSTER_MAX_COUNT = void 0;
exports.CLUSTER_MAX_COUNT = 2; // 보통은 그냥 CPU CORE 수 만큼 하지만 일단 2개만 띄움
exports.PORT_SVR_API = 10010; // 게임 서버 포트
exports.PORT_SVR_ADMIN = 5000; // 운영 서버 포트
exports.PORT_SVR_CHAT = 8080; // 채팅 서버 포트
exports.MAX_USER_NICK_NAME = 12; // 유저 이름 최대 길이
exports.EVENT_TOURNAMENT_LEVEL_CNT = 5; // 이벤트 토너먼트 스테이지 갯수
exports.EVENT_TOURNAMENT_GROUP_RANK_CNT = 30; // 내 경쟁상대 인원 수
exports.PERSONAL_RANK_CNT = 30; // 개인 랭크 상위 랭커 표시 수
exports.TEAM_RANK_CNT = 30; // 팀 랭크 상위 랭커 표시 수
exports.TEAM_SEARCH_CNT = 50; // 팀 검색 결과로 보여줄 최대 갯수 (임시, 정해지지 않음, 무한대일 수도)
exports.MAX_TEAM_MEMBER_CMT = 50; // 팀 맴버 최대 인원 수
exports.MAX_TEAM_CHATLOG_CNT = 30; // 팀 채팅 최대 보관 수
exports.MAX_TEAM_CHAT_ID_LENGTH = 15; // 팀 채팅 하트 요청 메시지에 대한 고유id 문자열 최대 길이
exports.MAX_TEAM_CHAT_HELP_CNT = 5; // 팀 하트 요청에 대한 최대 도움 수
exports.TEAM_LEADER_EXPIRE_DAYS = 90; // 팀 리더 만료시간
exports.CONFIG_PATH_DB_DEV = "./config/dbconfig_dev.json"; // dev 개발 서버
exports.CONFIG_PATH_DB_QA = "./config/dbconfig_live.json"; // live -> qa
exports.CONFIG_PATH_DB_REAL = "./config/dbconfig_real.json"; // real 라이브
var platform;
(function (platform) {
    platform["android"] = "android";
    platform["ios"] = "ios";
    platform["editor"] = "editor";
})(platform = exports.platform || (exports.platform = {}));
;
exports.dbErrorMsg = {
    undefined: "select result is undefined.",
    affect0: "affected row is 0.",
    length0: "select result length is 0.",
    tableErr: "table data is abnormal.",
};
exports.teamType = {
    open: "Open",
    close: "Close"
};
//# sourceMappingURL=define.js.map