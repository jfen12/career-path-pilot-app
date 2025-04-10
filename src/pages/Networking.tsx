
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ContactCard, { Contact } from "@/components/networking/ContactCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";

// Sample data for contacts
const sampleContacts: Contact[] = [
  {
    id: "1",
    name: "Alicia Rodriguez",
    title: "Product Manager",
    company: "TechCorp",
    email: "alicia@example.com",
    tags: ["Product", "Technology"],
    lastContacted: "2 weeks ago",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    title: "Marketing Director",
    company: "GrowthLabs",
    email: "marcus@example.com",
    phone: "555-123-4567",
    tags: ["Marketing", "Leadership"],
  },
  {
    id: "3",
    name: "Sarah Chen",
    title: "Software Engineer",
    company: "DevSolutions",
    email: "sarah@example.com",
    tags: ["Engineering", "Web Development"],
    lastContacted: "1 month ago",
  },
  {
    id: "4",
    name: "David Park",
    title: "UX Designer",
    company: "CreativeMinds",
    email: "david@example.com",
    tags: ["Design", "UX Research"],
  },
];

// Sample message templates
const messageTemplates = [
  {
    id: "1",
    title: "Catch up",
    content: "Hi [Name], it's been a while since we last caught up. I'd love to hear what you've been working on recently. Do you have time for a quick call next week?",
  },
  {
    id: "2",
    title: "Career advice",
    content: "Hi [Name], I'm exploring opportunities in [industry] and would love to get your insights given your experience. Would you be open to a 15-minute chat?",
  },
  {
    id: "3",
    title: "Introduction",
    content: "Hi [Name], I came across your profile and am impressed by your work in [field]. I'm also working in this space and would love to connect to learn more about your experience.",
  },
];

const Networking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("suggested");
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(messageTemplates[0]);
  const [customMessage, setCustomMessage] = useState("");
  const { toast } = useToast();

  const handleConnect = (contact: Contact) => {
    setSelectedContact(contact);
    setIsTemplateOpen(true);
    // Pre-fill the template with the contact's name
    const preFilledTemplate = messageTemplates[0].content.replace("[Name]", contact.name.split(" ")[0]);
    setCustomMessage(preFilledTemplate);
  };

  const handleSelectTemplate = (template: typeof messageTemplates[0]) => {
    setSelectedTemplate(template);
    if (selectedContact) {
      const preFilledTemplate = template.content.replace("[Name]", selectedContact.name.split(" ")[0]);
      setCustomMessage(preFilledTemplate);
    }
  };

  const handleSendMessage = () => {
    toast({
      title: "Message ready to send",
      description: `Your message to ${selectedContact?.name} has been prepared.`,
    });
    setIsTemplateOpen(false);
  };

  const filteredContacts = sampleContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer title="Networking">
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-career-gray" size={18} />
        <Input
          placeholder="Search connections..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="suggested" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggested" className="animate-fade-in">
          <div className="mb-4 bg-career-soft-purple p-4 rounded-lg">
            <h3 className="font-medium mb-1">Your weekly networking goal</h3>
            <p className="text-sm mb-2">1 out of 3 connections this week</p>
            <div className="w-full bg-white rounded-full h-2 mb-2">
              <div className="bg-career-purple h-2 rounded-full" style={{ width: "33%" }}></div>
            </div>
          </div>

          {filteredContacts.slice(0, 3).map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onConnect={handleConnect}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="recent" className="animate-fade-in">
          {filteredContacts.length > 0 ? (
            filteredContacts.slice(-2).map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onConnect={handleConnect}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-career-gray">No recent contacts found</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="all" className="animate-fade-in">
          <div className="flex justify-end mb-3">
            <Button className="bg-career-purple hover:bg-career-dark-purple text-white">
              <Plus size={16} className="mr-1" /> Add Contact
            </Button>
          </div>
          
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onConnect={handleConnect}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-career-gray">No contacts found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Message Template Dialog */}
      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message {selectedContact?.name}</DialogTitle>
            <DialogDescription>
              Choose a template or customize your message
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {messageTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                    selectedTemplate.id === template.id
                      ? "bg-career-purple text-white"
                      : "bg-career-light-gray text-career-dark-gray"
                  }`}
                >
                  {template.title}
                </button>
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message:</label>
              <textarea
                className="w-full min-h-[150px] p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-career-purple"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsTemplateOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-career-purple hover:bg-career-dark-purple text-white"
                onClick={handleSendMessage}
              >
                Prepare Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Networking;
