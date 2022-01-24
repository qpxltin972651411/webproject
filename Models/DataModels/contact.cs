namespace project.Models.DataModels
{
    public abstract class contact
    {
        public string number { get; set; }
        public string areacode { get; set; }
        public abstract string GetFullyphonenumber();
    }
}
