using System;

namespace Common
{
    abstract class Entity
    {
         
    }

    public class UserStatus : Entity
    {
        public string name;
        public int level;
        public DateTime lastLogin;
        public DateTime create;
    }


    public class Item : Entity
    {
        public string name;
        public int level;
        public int grade;
        public bool breakable;
    }

}



