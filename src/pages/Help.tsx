import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Help = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1">Help & Support</h1>
        <p className="body-text text-slate-gray mt-2">
          Get help with TalentPrimer and find answers to your questions
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Search Help Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Search for help articles..." className="flex-1" />
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-deep-teal hover:text-gold-ochre">
                    How to set up your profile
                  </a>
                </li>
                <li>
                  <a href="#" className="text-deep-teal hover:text-gold-ochre">
                    Understanding your dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="text-deep-teal hover:text-gold-ochre">
                    Career path planning guide
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-gray mb-4">
                Need more help? Our support team is here for you.
              </p>
              <Button variant="outline">Contact Us</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-deep-teal mb-2">
                  How do I update my skills?
                </h3>
                <p className="text-slate-gray">
                  Navigate to your profile settings and select the Skills section to add or update your skills.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-deep-teal mb-2">
                  Can I connect with other professionals?
                </h3>
                <p className="text-slate-gray">
                  Yes! Use the Networking feature to find and connect with other professionals in your field.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help; 