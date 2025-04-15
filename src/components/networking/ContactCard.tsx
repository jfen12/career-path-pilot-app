import { useState } from "react";
import { Calendar, Mail, Phone, MessageCircle, Plus } from "lucide-react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CreateFollowUpDialog from "./CreateFollowUpDialog";

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
  status: string;
};

type ContactCardProps = {
  contact: Contact;
  onConnect: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
};

const ContactCard = ({ contact, onConnect, onEdit, onDelete }: ContactCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isCreateFollowUpOpen, setIsCreateFollowUpOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleCreateFollowUp = (data: {
    contactId: string;
    type: string;
    dueDate: string;
    notes: string;
  }) => {
    // TODO: Implement follow-up creation logic
    console.log("Creating follow-up:", data);
  };

  return (
    <>
      <Card className="card-hover mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base">{contact.name}</CardTitle>
              <CardDescription className="text-sm">
                {contact.title} at {contact.company}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsCreateFollowUpOpen(true)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Create Follow-up
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(contact)}>
                  Edit Contact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(contact.id)}>
                  Delete Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        </CardFooter>
      </Card>
      <CreateFollowUpDialog
        contact={contact}
        open={isCreateFollowUpOpen}
        onClose={() => setIsCreateFollowUpOpen(false)}
        onSubmit={handleCreateFollowUp}
      />
    </>
  );
};

export default ContactCard;
