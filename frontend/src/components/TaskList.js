import React from "react";

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="border p-2 mb-2 flex justify-between items-center"
          >
            <div>
              <h3 className={task.status === "Completed" ? "line-through" : ""}>
                {task.title}
              </h3>
              <p>{task.description}</p>
              <p>Due: {task.dueDate?.slice(0, 10)}</p>
              <p>Status: {task.status}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(task)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button onClick={() => onDelete(task.id)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
              <button onClick={() => onToggle(task)} className="bg-green-500 px-2 py-1 rounded text-white">
                {task.status === "Completed" ? "Mark Pending" : "Complete"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
