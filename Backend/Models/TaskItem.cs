namespace Backend.Models
{
  public class TaskItem
  {
    public int Id { get; set; }
    public string Title { get; set; } = "";

    public bool isDoing { get; set; }
    public bool IsDone { get; set; }
  }
}