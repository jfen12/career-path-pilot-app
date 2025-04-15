import mongoose, { Document, Schema } from 'mongoose';

export interface IDevelopmentActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'course' | 'certification' | 'book' | 'workshop' | 'other';
  title: string;
  provider?: string;
  startDate?: Date;
  completionDate?: Date;
  status: 'planned' | 'in-progress' | 'completed';
  skills: string[];
  notes?: string;
  certificateUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DevelopmentActivitySchema = new Schema<IDevelopmentActivity>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['course', 'certification', 'book', 'workshop', 'other'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  provider: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date
  },
  completionDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed'],
    default: 'planned'
  },
  skills: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String
  },
  certificateUrl: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IDevelopmentActivity>('DevelopmentActivity', DevelopmentActivitySchema); 