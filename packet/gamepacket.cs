using CommonPacketStruct;
using Newtonsoft.Json;
using System;

namespace GamePacketStruct
{
    public abstract class BaseRequest
    {
        [JsonIgnore]
        public virtual string URL => "";
    }
    public class BaseResponse
    {
        public ErrorCode error = ErrorCode.Undefinded;       
    }
    public class RequestTest : BaseRequest
    {
        public override string URL => "/test";

        public string userUid;
    }

    public class ResponseTest : BaseResponse
    {
        public string serverMsg;
    }






    // Request Packet Body
    public class RequestBodyLogin : RequestBody
    {
        public string userUid;
    }
    public class RequestBodyTest : RequestBody
    {
        public string userUid;
    }




    // Response Packet Body
    public class ResponseBodyLogin : ResponseBody
    {
        public string userUid;
    }
    public class ResponseBodyTest : ResponseBody
    {
        public string userUid;
    }





    // Request Packet Full (header + body)
    public class RequestLogin : RequestPacket<RequestBodyLogin>
    {
        public override string header => nameof(RequestLogin);
    }
    public class RequestTest : RequestPacket<RequestBodyTest>
    {
        public override string header => nameof(RequestTest);
    }



    // Response Packet Full (header + body)
    public class ResponseLogin : ResponsePacket<ResponseBodyLogin> { }
    public class ResponseTest : ResponsePacket<ResponseTest> { }







    public class RequestBody
    {

    }
    public class ResponseBody
    {
        // TODO: commonPacket.cs에 정의 되어 있음. 
        // 툴로 c# to ts 전환시 해당 부분의 import 가 되지는 않아서 생성된 ts파일에서 import를 걸어줘야 함. 
        // json으로 패킷을 주고받지 말고 gRPC를 쓰면 해결 될 듯..?
        public ErrorCode error = ErrorCode.Undefinded;
    }

    public class RequestPacketBase
    {
        public virtual string header => "";
    }

    public class ResponsePacketBase
    {
        public string header;
    }

    public class ResponsePacket<T> : ResponsePacketBase where T : ResponseBody
    {
        public T body;
    }

    public class RequestPacket<T> : RequestPacketBase where T : RequestBody
    {
        public T body;
    }
}