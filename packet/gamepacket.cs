using Newtonsoft.Json;
using System;
using ErrorCode;
using Common; // TODO: 패킷 변환시 확인. ts code로 변환시 import 구문이 클래스 이름으로 셋팅됨.

namespace GamePacket
{
    public abstract class BaseRequest
    {
        [JsonIgnore]
        public virtual string URL => "";
        public string userUid;
    }
    public class BaseResponse
    {
        public ErrorCode error = ErrorCode.Undefinded;
        public string message;
    }


    // Test
    public class RequestTest : BaseRequest
    {
        public override string URL => "/Test";
    }
    public class ResponseTest : BaseResponse
    {
    }


    // User
    public class RequestLogin : BaseRequest
    {
        public override string URL => "/Login";
        public string userName;
        public Platform platform;
    }
    public class ResponseLogin : BaseResponse
    {
    }

    public class RequestUserStatus : BaseRequest
    {
        public override string URL => "/UserStatus";
    }
    public class ResponseUserStatus : BaseResponse
    {
        public UserStatus userStatus;
    }


    // Item
    public class RequestItemInfo : BaseRequest
    {
        public override string URL => "/ItemInfo";
    }
    public class ResponseItemInfo : BaseResponse
    {
        public Item[] items = new Item[0];
    }

    public class RequestItemUpgrade : BaseRequest
    {
        public override string URL => "/ItemUpgrade";
    }
    public class ResponseItemUpgrade : BaseResponse
    {

    }

}