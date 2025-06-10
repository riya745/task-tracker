import React from "react";

const TaskForm = ({ formData, setFormData, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="border p-2"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-2"
      />
      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
