// const { Op } = require("sequelize");
const repo = require("../repository/taskRepository");


exports.getTasks = async (req, res) => {
  try {
    const { user } = req;
    const { status, sort } = req.query;

    let conditionGetTasks = {
      where: { user_id: user.id },
      order: []
    };

    if (status === "pending" || status === "completed") {
      conditionGetTasks.where.status = status;
    }

    if (sort === "asc" || sort === "desc") {
      conditionGetTasks.order.push(["due_date", sort]);
    }

    let tasks = await repo.getAllTasks(conditionGetTasks);
    res.status(200).send({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Fetching tasks failed.",
      error: error.message
    });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { user, body } = req;
    const validStatuses = ["pending", "completed"];
    if (!validStatuses.includes(body.status)) {
       return res.status(400).send({ success: false, message: "Invalid task status." });
    }
    let data = {
      title: body.title,
      description: body.description,
      due_date: body.due_date,
      status: body.status,
      user_id: user.id
    };
    
    let task = await repo.createTask(data);
    res.status(200).send({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Creating task failed.",
      error: error.message
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { user, body, params } = req;
    let conditionUpdateTask = {
      where: {
        id: params.id,
        user_id: user.id
      }
    };
    let data = {
      title: body.title,
      description: body.description,
      due_date: body.due_date,
      status: body.status
    };
    await repo.updateTask(data, conditionUpdateTask);
    res.status(200).send({
      success: true,
      message: "Task updated successfully."
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Updating task failed.",
      error: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { user, params } = req;
    let conditionDeleteTask = {
      where: {
        id: params.id,
        user_id: user.id
      }
    };
    await repo.deleteTask(conditionDeleteTask);
    res.status(200).send({
      success: true,
      message: "Task deleted successfully."
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Deleting task failed.",
      error: error.message
    });
  }
};
