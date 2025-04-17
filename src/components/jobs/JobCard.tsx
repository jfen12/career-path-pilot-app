import React from 'react';
import { Building2, Calendar, MapPin, BadgeDollarSign } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  tags?: string[];
  description?: string;
  isDragging?: boolean;
  dragHandleProps?: any;
  draggableProps?: any;
  ref?: any;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  postedDate,
  tags = [],
  description,
  isDragging,
  dragHandleProps,
  draggableProps,
  ref
}) => {
  return (
    <Card
      ref={ref}
      {...draggableProps}
      className={`mb-3 overflow-hidden ${isDragging ? 'shadow-lg' : 'shadow'}`}
    >
      <div
        {...dragHandleProps}
        className="p-4 cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <Building2 className="w-4 h-4 mr-1" />
              <span>{company}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          {salary && (
            <div className="flex items-center">
              <BadgeDollarSign className="w-4 h-4 mr-1" />
              <span>{salary}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{postedDate}</span>
          </div>
        </div>

        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default JobCard; 