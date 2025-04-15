import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
  applicationDate?: Date;
  notes?: string;
  documents?: {
    resumeUrl: string;
    coverLetterUrl?: string;
  };
  interviews?: {
    date: Date;
    type: string;
    notes?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    enum: ['saved', 'applied', 'interviewing', 'offered', 'rejected', 'accepted'],
    default: 'saved'
  },
  applicationDate: {
    type: Date
  },
  notes: {
    type: String
  },
  documents: {
    resumeUrl: {
      type: String,
      required: true
    },
    coverLetterUrl: {
      type: String
    }
  },
  interviews: [{
    date: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    notes: {
      type: String
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IApplication>('Application', ApplicationSchema); 