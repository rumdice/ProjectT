using Newtonsoft.Json;
using System;
using ErrorCode;
using Entity; // TODO: 패킷 변환시 확인. ts code로 변환시 import 구문이 클래스 이름으로 셋팅됨.

namespace GamePacket
{
    public abstract class BaseRequest
    {
        [JsonIgnore]
        public virtual string URL => "";
    }
    public class BaseResponse
    {
        public ErrorCode error = ErrorCode.Undefinded;
        public string message;
    }


    // Test
    public class RequestTest : BaseRequest
    {
        public override string URL => "/test";
        public string userUid;
    }
    public class ResponseTest : BaseResponse
    {
    }


    // User
    public class RequestLogin : BaseRequest
    {
        public override string URL => "/login";
        public string userUid;
        public string userName;
    }
    public class ResponseLogin : BaseResponse
    {
    }

    public class RequestUserStatus : BaseRequest
    {
        public override string URL => "/userStatus";
        public string userUid;
    }
    public class ResponseUserStatus : BaseResponse
    {
        public UserStatus userStatus;
    }

}