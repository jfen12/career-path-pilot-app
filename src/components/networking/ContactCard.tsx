
import { useState } from "react";
import { Calendar, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Contact = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  lastContacted?: string;
  tags: string[];
  avatarUrl?: string;
};

type ContactCardProps = {
  contact: Contact;
  onConnect: (contact: Contact) => void;
};

const ContactCard = ({ contact, onConnect }: ContactCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="card-hover mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-career-soft-purple flex items-center justify-center text-career-purple font-medium">
            {contact.avatarUrl ? (
              <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(contact.name)
            )}
          </div>
          <div>
            <CardTitle className="text-base">{contact.name}</CardTitle>
            <CardDescription className="text-sm">
              {contact.title} at {contact.company}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {contact.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {contact.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-career-soft-purple text-career-purple border-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {expanded && (
          <div className="mt-3 space-y-2 text-sm animate-slide-up">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-career-gray" />
              <span>{contact.email}</span>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-career-gray" />
                <span>{contact.phone}</span>
              </div>
            )}
            {contact.lastContacted && (
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-career-gray" />
                <span>Last contacted: {contact.lastContacted}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="ghost" 
          className="text-career-gray p-2 h-9" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Less" : "More"}
        </Button>
        <Button
          className="bg-career-purple hover:bg-career-dark-purple text-white"
          size="sm"
          onClick={() => onConnect(contact)}
        >
          <MessageCircle size={16} className="mr-1" /> Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
