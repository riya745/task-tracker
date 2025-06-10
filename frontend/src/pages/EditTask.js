import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api/taskApi';

const CreateEditTask = ({ task, onClose, fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date ? task.due_date.split('T')[0] : '',
        status: task.status || 'pending'
      });
    } else {
      // Reset form for new task
      setFormData({
        title: '',
        description: '',
        due_date: '',
        status: 'pending'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task && task.id) {
        // Update existing task
        if (window.confirm('Are you sure you want to update this task?')) {
          await updateTask(task.id, formData);
          alert('Task updated successfully.');
        }
      } else {
        // Create new task
        await createTask(formData);
        alert('Task created successfully.');
      }
      fetchTasks(); // Refresh task list in parent component
      onClose();
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {task ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border rounded w-full px-3 py-2"
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditTask;
