using Newtonsoft.Json;
using System;
using ErrorCode;

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


    // Login
    public class RequestLogin : BaseRequest
    {
        public override string URL => "/login";
        public string userUid;
        public string userName;
    }
    public class ResponseLogin : BaseResponse
    {
    }

}