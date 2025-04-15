import { Request, Response } from 'express';
import DevelopmentActivity from '../models/DevelopmentActivity';
import { authenticate } from '../middleware/auth';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await DevelopmentActivity.find({ userId: req.user._id });
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const activity = new DevelopmentActivity({
      ...req.body,
      userId: req.user._id
    });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getActivity = async (req: Request, res: Response) => {
  try {
    const activity = await DevelopmentActivity.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const activity = await DevelopmentActivity.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activity = await DevelopmentActivity.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    // This is a placeholder for the actual recommendation algorithm
    // In a real implementation, this would analyze user's skills and goals
    // to suggest relevant learning resources
    const recommendations = [
      {
        title: 'Advanced React Patterns',
        type: 'course',
        provider: 'Udemy',
        skills: ['React', 'JavaScript']
      },
      {
        title: 'System Design Interview',
        type: 'book',
        provider: 'Amazon',
        skills: ['System Design', 'Architecture']
      }
    ];
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 