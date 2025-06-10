import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../api/taskApi';
import CreateEditTask from './EditTask';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Font Awesome icons

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(statusFilter);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        alert('Task deleted successfully.');
        fetchTasks();
      } catch (error) {
        alert('Failed to delete the task.');
      }
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setModalOpen(false);
    fetchTasks();
  };
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Task Dashboard</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4">Title</th>
              <th className="text-left py-2 px-4">Description</th>
              <th className="text-left py-2 px-4">Due Date</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="py-2 px-4">{task.title}</td>
                  <td className="py-2 px-4">{task.description}</td>
                  <td className="py-2 px-4">
                    {new Date(task.due_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 capitalize">{task.status}</td>
                  <td className="py-2 px-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 text-center" colSpan="5">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <CreateEditTask
          task={selectedTask}
          onClose={handleModalClose}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default Dashboard;
