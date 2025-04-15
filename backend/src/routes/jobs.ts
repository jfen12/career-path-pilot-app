import express from 'express';
import {
  getJobs,
  getJob,
  getApplications,
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
  getJobRecommendations,
  getApplicationStats,
  getApplicationTimeline
} from '../controllers/jobsController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJob);

// Protected routes
router.use(authenticate);
router.get('/recommendations', getJobRecommendations);
router.get('/applications', getApplications);
router.post('/applications', createApplication);
router.get('/applications/:id', getApplication);
router.put('/applications/:id', updateApplication);
router.delete('/applications/:id', deleteApplication);
router.get('/stats', getApplicationStats);
router.get('/timeline', getApplicationTimeline);

export default router; 