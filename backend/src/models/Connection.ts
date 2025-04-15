import mongoose, { Document, Schema } from 'mongoose';

export interface IConnection extends Document {
  userId: mongoose.Types.ObjectId;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  contactCompany?: string;
  contactTitle?: string;
  relationshipType: string;
  tags: string[];
  notes?: string;
  lastContactDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ConnectionSchema = new Schema<IConnection>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  contactPhone: {
    type: String,
    trim: true
  },
  contactCompany: {
    type: String,
    trim: true
  },
  contactTitle: {
    type: String,
    trim: true
  },
  relationshipType: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String
  },
  lastContactDate: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model<IConnection>('Connection', ConnectionSchema); 