import Activity from "../models/Activity.js";

// ADD ACTIVITY
export const addActivity = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const activity = await Activity.create({
      title,
      description,
      date,
      user: req.user.id,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ACTIVITIES
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
