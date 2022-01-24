namespace project.Models.DataModels
{
    public class Fax : contact
    {
        public override string GetFullyphonenumber()
        {
            return this.areacode + " : " + this.number;
        }
    }
}
