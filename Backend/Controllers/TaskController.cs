using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TaskController : ControllerBase
  {
    private static List<TaskItem> tasks = new List<TaskItem>();
    private static int nextId = 1;

    [HttpGet]
    public ActionResult<List<TaskItem>> Get()
    {
      return tasks;
    }

    [HttpPost]
    public ActionResult<TaskItem> Post(TaskItem newTask)
    {
      newTask.Id = nextId++;
      tasks.Add(newTask);
      return CreatedAtAction(nameof(GetById), new { id = newTask.Id }, newTask);
    }

    [HttpGet("{id}")]
    public ActionResult<TaskItem> GetById(int id)
    {
      var task = tasks.FirstOrDefault(x => x.Id == id);
      if (task == null) { return NotFound(); }
      return task;
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, TaskItem updatedTask)
    {
      var task = tasks.FirstOrDefault(t => t.Id == id);
      if (task == null) { return NotFound(); }
      task.Title = updatedTask.Title;
      task.IsDone = updatedTask.IsDone;
      task.isDoing = updatedTask.isDoing;

      return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      var task = tasks.FirstOrDefault(t => t.Id == id);
      if (task == null) { return NotFound(); }

      tasks.Remove(task);
      return NoContent();
    }
  }
}