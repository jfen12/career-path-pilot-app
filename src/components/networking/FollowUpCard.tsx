import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FollowUpItem } from "@/types/followUp";

interface FollowUpCardProps {
  followUp: FollowUpItem;
  onComplete: (id: string) => void;
}

const FollowUpCard = ({ followUp, onComplete }: FollowUpCardProps) => {
  const getStatusIcon = () => {
    switch (followUp.status) {
      case 'completed':
        return <CheckCircle2 className="text-green-500" size={16} />;
      case 'overdue':
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-amber-500" size={16} />;
    }
  };

  const getStatusColor = () => {
    switch (followUp.status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <Card className="card-hover mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{followUp.contactName}</CardTitle>
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{followUp.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-career-soft-purple text-career-purple border-0">
            {followUp.type}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-career-gray">
            <Calendar size={14} />
            <span>Due: {new Date(followUp.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
        <p className="text-sm mb-3">{followUp.description}</p>
        {followUp.notes && (
          <p className="text-sm text-career-gray italic">Notes: {followUp.notes}</p>
        )}
        {followUp.status !== 'completed' && (
          <Button
            className="w-full bg-career-purple hover:bg-career-dark-purple text-white mt-3"
            onClick={() => onComplete(followUp.id)}
          >
            Mark as Complete
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowUpCard; 