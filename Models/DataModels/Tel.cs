namespace project.Models.DataModels
{
    public class Tel : contact
    {
        public override string GetFullyphonenumber()
        {
            return this.areacode + " : " + this.number;
        }
    }
}
