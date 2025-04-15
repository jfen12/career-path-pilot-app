import { Request, Response } from 'express';
import Job from '../models/Job';
import Application from '../models/Application';
import { authenticate } from '../middleware/auth';

// Jobs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const { title, company, location, minSalary, maxSalary } = req.query;
    const query: any = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (company) query.company = { $regex: company, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minSalary) query['salary.min'] = { $gte: Number(minSalary) };
    if (maxSalary) query['salary.max'] = { $lte: Number(maxSalary) };

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Applications
export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .populate('jobId');
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createApplication = async (req: Request, res: Response) => {
  try {
    const application = new Application({
      ...req.body,
      userId: req.user._id
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('jobId');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    ).populate('jobId');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Additional functionality
export const getJobRecommendations = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userSkills = req.user.skills || [];
    const userPreferences = req.user.preferences || {};

    // Build recommendation query
    const query: any = {};
    
    if (userSkills.length > 0) {
      query.$or = userSkills.map((skill: string) => ({
        requirements: { $regex: skill, $options: 'i' }
      }));
    }

    if (userPreferences.location) {
      query.location = { $regex: userPreferences.location, $options: 'i' };
    }

    if (userPreferences.salaryRange) {
      query['salary.min'] = { $gte: userPreferences.salaryRange.min };
      query['salary.max'] = { $lte: userPreferences.salaryRange.max };
    }

    const recommendations = await Job.find(query)
      .sort({ postedDate: -1 })
      .limit(10);

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicationStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const stats = await Application.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalApplications = await Application.countDocuments({ userId: req.user._id });
    const interviewRate = stats.find(s => s._id === 'interviewing')?.count || 0;
    const offerRate = stats.find(s => s._id === 'offered')?.count || 0;

    res.json({
      totalApplications,
      statusBreakdown: stats,
      interviewRate: totalApplications > 0 ? (interviewRate / totalApplications) * 100 : 0,
      offerRate: totalApplications > 0 ? (offerRate / totalApplications) * 100 : 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicationTimeline = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const timeline = await Application.find({ userId: req.user._id })
      .sort({ applicationDate: -1 })
      .populate('jobId')
      .limit(10);

    res.json(timeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 