public enum ErrorCode : int
{
    Success = 0,

    InvalidSession = 1,
    InvalidParam = 2,
    MissingParam = 3,

    DBError = 100,
    InternalError = 200,
    Undefinded = -1,
}

public enum Platform : int
{
    Guest = 0,
    Android = 1,
    IOS = 2,
}
