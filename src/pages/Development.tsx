
import { useState } from "react";
import { Check, X, Clock, ChevronRight, Bookmark, Play } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type LearningItem = {
  id: string;
  title: string;
  source: string;
  sourceIcon: string;
  duration: string;
  type: "article" | "course" | "video";
  tags: string[];
  url: string;
  completed?: boolean;
  saved?: boolean;
  remindLater?: boolean;
};

const learningItems: LearningItem[] = [
  {
    id: "1",
    title: "Building Your Personal Brand in Tech",
    source: "Medium",
    sourceIcon: "M",
    duration: "8 min read",
    type: "article",
    tags: ["Career Growth", "Personal Brand"],
    url: "#",
  },
  {
    id: "2",
    title: "Mastering the Product Manager Interview",
    source: "Coursera",
    sourceIcon: "C",
    duration: "2 hour course",
    type: "course",
    tags: ["Interviews", "Product Management"],
    url: "#",
  },
  {
    id: "3",
    title: "Effective Networking for Career Growth",
    source: "YouTube",
    sourceIcon: "Y",
    duration: "15 min video",
    type: "video",
    tags: ["Networking", "Career Growth"],
    url: "#",
  },
  {
    id: "4",
    title: "Technical Leadership: From Engineer to Manager",
    source: "LinkedIn Learning",
    sourceIcon: "L",
    duration: "1.5 hour course",
    type: "course",
    tags: ["Leadership", "Engineering"],
    url: "#",
  },
];

const Development = () => {
  const [items, setItems] = useState<LearningItem[]>(learningItems);
  
  const handleAction = (id: string, action: "done" | "save" | "later") => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          switch (action) {
            case "done":
              toast.success("Marked as completed!");
              return { ...item, completed: true, remindLater: false };
            case "save":
              toast.success("Saved for later!");
              return { ...item, saved: !item.saved };
            case "later":
              toast.success("We'll remind you later!");
              return { ...item, remindLater: true };
            default:
              return item;
          }
        }
        return item;
      })
    );
  };

  const getItemsByStatus = (status: "active" | "completed" | "saved") => {
    switch (status) {
      case "completed":
        return items.filter((item) => item.completed);
      case "saved":
        return items.filter((item) => item.saved);
      default:
        return items.filter((item) => !item.completed && !item.remindLater);
    }
  };

  const getIconForSource = (source: string) => {
    switch (source) {
      case "YouTube":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-gray-100 text-gray-600";
      case "Coursera":
        return "bg-blue-100 text-blue-600";
      case "LinkedIn Learning":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-career-soft-purple text-career-purple";
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "video":
        return Play;
      case "course":
        return Bookmark;
      default:
        return ChevronRight;
    }
  };

  return (
    <PageContainer title="Professional Development">
      <Tabs defaultValue="suggested">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="suggested" className="space-y-4 animate-fade-in">
          <div className="bg-career-soft-purple p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-1">Weekly Learning Goal</h3>
            <p className="text-sm">Complete at least one learning activity</p>
          </div>

          {getItemsByStatus("active").length > 0 ? (
            getItemsByStatus("active").map((item) => (
              <Card key={item.id} className="card-hover">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full ${getIconForSource(item.source)} flex items-center justify-center font-medium`}>
                        {item.sourceIcon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <div className="flex items-center text-sm text-career-gray mt-1">
                          <span>{item.source}</span>
                          <span className="mx-2">•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                    {item.saved && (
                      <Badge className="bg-career-soft-purple text-career-purple border-0">
                        Saved
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAction(item.id, "later")}
                    >
                      <Clock size={14} className="mr-1" /> Later
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${
                        item.saved
                          ? "bg-career-soft-purple text-career-purple border-career-purple"
                          : ""
                      }`}
                      onClick={() => handleAction(item.id, "save")}
                    >
                      <Bookmark size={14} className="mr-1" /> Save
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-career-purple hover:bg-career-dark-purple text-white"
                      onClick={() => handleAction(item.id, "done")}
                    >
                      <Check size={14} className="mr-1" /> Done
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p>No suggestions available right now.</p>
              <p className="text-career-gray">Check back later for new recommendations!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 animate-fade-in">
          {getItemsByStatus("saved").length > 0 ? (
            getItemsByStatus("saved").map((item) => (
              <Card key={item.id} className="card-hover">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full ${getIconForSource(item.source)} flex items-center justify-center font-medium`}>
                        {item.sourceIcon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <div className="flex items-center text-sm text-career-gray mt-1">
                          <span>{item.source}</span>
                          <span className="mx-2">•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAction(item.id, "save")}
                    >
                      <X size={14} className="mr-1" /> Remove
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-career-purple hover:bg-career-dark-purple text-white"
                      onClick={() => handleAction(item.id, "done")}
                    >
                      <Check size={14} className="mr-1" /> Done
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p>No saved items yet.</p>
              <p className="text-career-gray">Save items from the Suggested tab to view them here.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 animate-fade-in">
          {getItemsByStatus("completed").length > 0 ? (
            getItemsByStatus("completed").map((item) => (
              <Card key={item.id}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full ${getIconForSource(item.source)} flex items-center justify-center font-medium`}>
                        {item.sourceIcon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <div className="flex items-center text-sm text-career-gray mt-1">
                          <span>{item.source}</span>
                          <span className="mx-2">•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-600 border-0">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p>No completed items yet.</p>
              <p className="text-career-gray">Mark items as done to track your progress.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Development;
