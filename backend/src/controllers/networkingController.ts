import { Request, Response } from 'express';
import Connection from '../models/Connection';
import { authenticate } from '../middleware/auth';

export const getConnections = async (req: Request, res: Response) => {
  try {
    const connections = await Connection.find({ userId: req.user._id });
    res.json(connections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createConnection = async (req: Request, res: Response) => {
  try {
    const connection = new Connection({
      ...req.body,
      userId: req.user._id
    });
    await connection.save();
    res.status(201).json(connection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getConnection = async (req: Request, res: Response) => {
  try {
    const connection = await Connection.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }
    res.json(connection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateConnection = async (req: Request, res: Response) => {
  try {
    const connection = await Connection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }
    res.json(connection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteConnection = async (req: Request, res: Response) => {
  try {
    const connection = await Connection.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }
    res.json({ message: 'Connection deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getConnectionSuggestions = async (req: Request, res: Response) => {
  try {
    // This is a placeholder for the actual suggestion algorithm
    // In a real implementation, this would analyze user's network and suggest potential connections
    const suggestions = await Connection.find({
      userId: { $ne: req.user._id },
      // Add more criteria based on user's profile, industry, etc.
    }).limit(10);
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 