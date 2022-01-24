using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{
    public static class endecryption
    {
        public static string encryption(string str)
        {
            Byte[] bytesEncode = System.Text.Encoding.UTF8.GetBytes(str); //取得 UTF8 2進位 Byte
            string resultEncode = Convert.ToBase64String(bytesEncode); // 轉換 Base64 索引表
            return resultEncode;
        }
        
        public static string decryption(string str)
        {
            Byte[] bytesDecode = Convert.FromBase64String(str); // 還原 Byte
            string resultText = System.Text.Encoding.UTF8.GetString(bytesDecode); // 還原 UTF8 字元*/
            return resultText;
        }
        public static string encode(int time, string enstring)
        {
            for (int i = 0; i < time; i++)
            {
                enstring = endecryption.decryption(enstring);
                enstring = enstring.Remove(enstring.Length - 1);
            }
            return enstring;
        }
    }
}
