public enum ErrorCode : int
{
    Success = 0,

    InternalError = 1,
    DBError = 2,
    
    InvalidSession = 3,
    
    InvalidParam = 4,
    MissingParam = 5,

    Undefinded = -1,
}

public enum Platform : int
{
    Guest = 0,
    Android = 1,
    IOS = 2,
}
