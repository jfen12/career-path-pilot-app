import { ChevronDown } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Investors = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-deep-teal mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-ochre mb-4">
            Career Path Pilot
          </h1>
          <p className="text-xl md:text-2xl text-soft-sand mb-6">
            "AI-Powered Career Navigation for the Modern Professional"
          </p>
          <Button
            onClick={() => scrollToSection("problem")}
            className="bg-gold-ochre text-deep-teal hover:bg-gold-ochre/90 group"
          >
            Learn More
            <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Problem Section */}
      <section id="problem" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">The Problem</h2>
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-xl font-medium mb-4">
                The professional networking landscape is broken:
              </p>
              <div className="space-y-3 ml-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-2"></div>
                  <p>LinkedIn has become content-focused rather than career development-focused</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-2"></div>
                  <p>Professionals lack structured guidance for career advancement</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-2"></div>
                  <p>Hiring is inefficient, with companies relying on superficial metrics</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-2"></div>
                  <p>Networking is approached randomly rather than strategically</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-2"></div>
                  <p>Career development happens in silos (networking, skills, job hunting)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Market Opportunity Section */}
      <section id="market" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Market Opportunity</h2>
        
        {/* Total Addressable Market */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">
              The Professional Development & Hiring Landscape
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Total Addressable Market: $30B+ global professional networking and recruitment ecosystem</h4>
                <ul className="space-y-3 ml-6 list-disc">
                  <li>LinkedIn's market cap: ~$26B (when acquired by Microsoft)</li>
                  <li>Global recruitment market: $200B+ annually</li>
                  <li>Professional development & training: $370B+ globally</li>
                  <li>Career coaching: $1.3B+ market growing at 6.7% CAGR</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Fragmentation */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Market Fragmentation</h3>
            <ul className="space-y-3 ml-6 list-disc">
              <li>Networking: LinkedIn, industry events, alumni associations</li>
              <li>Job Search: Indeed, Monster, ZipRecruiter, niche job boards</li>
              <li>Skill Development: Coursera, Udemy, LinkedIn Learning, Pluralsight</li>
              <li>Career Coaching: Fragmented market of individual coaches and consultancies</li>
              <li>Hiring: Traditional recruiters, internal HR, applicant tracking systems</li>
            </ul>
          </CardContent>
        </Card>

        {/* Market Inefficiencies */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Market Inefficiencies</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">For Professionals:</h4>
                <ul className="space-y-3 ml-6 list-disc">
                  <li>Average job search: 5 months</li>
                  <li>75% of job opportunities never publicly posted</li>
                  <li>$10,000+ average income loss during career transitions</li>
                  <li>$4,000+ spent annually on unstructured professional development</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">For Companies:</h4>
                <ul className="space-y-3 ml-6 list-disc">
                  <li>$4,700+ average cost per hire</li>
                  <li>42 days average time-to-fill positions</li>
                  <li>30% of new hires leave within first year</li>
                  <li>$240,000+ cost of a bad executive hire</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opportunity Gap */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Opportunity Gap</h3>
            <ul className="space-y-3 ml-6 list-disc">
              <li>No platform effectively combines all aspects of career development into one data-driven ecosystem</li>
              <li>Hiring decisions based on resume scanning and subjective interviews rather than verified capabilities</li>
              <li>"Job-first" approach instead of "career-first" strategy</li>
              <li>Massive data disconnect between what professionals can do and what companies need</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Solution Section */}
      <section id="solution" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Solution</h2>
        
        {/* Core Value Proposition */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">
              Career Path Pilot: The AI-Powered Career Navigation System
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Core Value Proposition</h4>
                <p className="text-lg">
                  Career Path Pilot transforms fragmented career development into an integrated ecosystem, 
                  guided by AI, that benefits both professionals and hiring companies through verified capabilities 
                  and strategic growth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features for Professionals */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">For Professionals: Your Personal Career Architecture Team</h3>
            
            <div className="space-y-8">
              {/* AI Career Architect */}
              <div>
                <h4 className="font-medium mb-3">AI Career Architect (24/7 Access)</h4>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Continuous career strategy development and refinement</li>
                  <li>Proactive identification of growth opportunities within current role</li>
                  <li>Personalized guidance for navigating workplace challenges</li>
                  <li>Strategic preparation for advancement conversations</li>
                  <li>Career trajectory modeling showing multiple potential paths</li>
                  <li>Industry planning for industry shifts and role changes</li>
                </ul>
              </div>

              {/* Strategic Networking Companion */}
              <div>
                <h4 className="font-medium mb-3">Strategic Networking Companion</h4>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Personalized conversation starters and follow-up recommendations</li>
                  <li>Connection recommendations aligned with long-term career objectives</li>
                  <li>Proactional relationship events and key conversations</li>
                  <li>Relationship health scoring and nurturing reminders</li>
                  <li>Opportunity identification within existing network</li>
                </ul>
              </div>

              {/* Professional Development Navigator */}
              <div>
                <h4 className="font-medium mb-3">Professional Development Navigator</h4>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Continuous skills gap analysis with market demand insight</li>
                  <li>Just-in-time learning recommendations when skills become relevant</li>
                  <li>Development tracking that maps to verified career advancement</li>
                  <li>Learning effectiveness measurement and reinforcement</li>
                  <li>Skill verification through practical application scenarios</li>
                  <li>Cross-functional development recommendations to increase versatility</li>
                </ul>
              </div>

              {/* Career Transition Guide */}
              <div>
                <h4 className="font-medium mb-3">Career Transition Guide</h4>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Step-by-step guidance through job search and career pivots</li>
                  <li>Interview preparation with role-specific coaching</li>
                  <li>Negotiation strategy development and simulation</li>
                  <li>Onboarding support for new roles</li>
                  <li>First 90-day planning and execution guidance</li>
                  <li>Risk assessment for potential career moves</li>
                </ul>
              </div>

              {/* Workplace Challenge Coach */}
              <div>
                <h4 className="font-medium mb-3">Workplace Challenge Coach</h4>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Real-time advice for navigating difficult workplace situations</li>
                  <li>Communication strategy development for critical conversations</li>
                  <li>Conflict resolution guidance and multiple perspective analysis</li>
                  <li>Work-life balance optimization recommendations</li>
                  <li>Burnout prevention through early warning detection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Product Overview Section */}
      <section id="product" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Product Overview</h2>
        
        {/* Core Components */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Core Components</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Career Coach */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gold-ochre"></div>
                    <h4 className="font-medium">AI Career Coach</h4>
                  </div>
                  <p className="text-gray-600 ml-6">
                    Personalized guidance and strategy
                  </p>
                </div>

                {/* Strategic Networking */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gold-ochre"></div>
                    <h4 className="font-medium">Strategic Networking</h4>
                  </div>
                  <p className="text-gray-600 ml-6">
                    Relationship building and purpose
                  </p>
                </div>

                {/* Skills Development */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gold-ochre"></div>
                    <h4 className="font-medium">Skills Development</h4>
                  </div>
                  <p className="text-gray-600 ml-6">
                    Targeted learning pathways
                  </p>
                </div>

                {/* Opportunity Matching */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gold-ochre"></div>
                    <h4 className="font-medium">Opportunity Matching</h4>
                  </div>
                  <p className="text-gray-600 ml-6">
                    Merit-based job connections
                  </p>
                </div>

                {/* 360° Profile */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gold-ochre"></div>
                    <h4 className="font-medium">360° Profile</h4>
                  </div>
                  <p className="text-gray-600 ml-6">
                    Verified, comprehensive professional view
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Business Model Section */}
      <section id="business-model" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Business Model</h2>
        
        {/* Revenue Streams & Pricing Structure */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Revenue Streams & Pricing Structure</h3>
            
            <div className="space-y-8">
              {/* For Professionals (Users) */}
              <div>
                <h4 className="text-lg font-medium mb-4">For Professionals (Users)</h4>
                
                {/* Free Tier */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-gold-ochre mt-0.5"></div>
                    <h5 className="font-medium">Free Tier:</h5>
                  </div>
                  <ul className="space-y-2 ml-8 list-disc text-gray-600">
                    <li>Core AI career coaching</li>
                    <li>Basic networking recommendations</li>
                    <li>Skills assessment & 360° profile building</li>
                    <li>Job opportunity matching</li>
                    <li>Estimated adoption: 90% of user base</li>
                  </ul>
                </div>

                {/* Premium Tier */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-gold-ochre mt-0.5"></div>
                    <h5 className="font-medium">Premium Tier: $29/month or $299/year (15% discount)</h5>
                  </div>
                  <ul className="space-y-2 ml-8 list-disc text-gray-600">
                    <li>Advanced L&D pathways with progress tracking</li>
                    <li>Priority coaching with specialized industry focus</li>
                    <li>Enhanced analytics and career trajectory modeling</li>
                    <li>Advanced networking tools and relationship tracking</li>
                    <li>Unlimited skill verifications and assessments</li>
                    <li>Estimated adoption: 10% of free users in Year 1, growing to 25% by Year 5</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Financial Projections Section */}
      <section id="financials" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Financial Projections (Revised)</h2>
        
        {/* Year-by-Year Projections */}
        <div className="space-y-6">
          {/* Year 1 */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Year 1</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Users: 75,000 total (7,500 premium - 10% conversion)</p>
                </div>
                <div>
                  <p className="font-medium">Hiring Companies: 200 (140 Starter, 50 Professional, 10 Enterprise)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Revenue Breakdown:</h4>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>Premium Users: $2.2M</li>
                    <li>Hiring Company Subscriptions: $5.8M</li>
                    <li>Enterprise Implementations: $0.8M</li>
                    <li>Total Revenue: $8.8M</li>
                    <li>Gross Margin: 72%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Year 3 */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Year 3</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Users: 850,000 total (170,000 premium - 20% conversion)</p>
                </div>
                <div>
                  <p className="font-medium">Hiring Companies: 2,500 (1,750 Starter, 625 Professional, 125 Enterprise)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Revenue Breakdown:</h4>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>Premium Users: $50.8M</li>
                    <li>Hiring Company Subscriptions: $96.5M</li>
                    <li>Enterprise Implementations: $15M</li>
                    <li>Total Revenue: $162.3M</li>
                    <li>Gross Margin: 78%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Year 5 */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Year 5</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Users: 3.5M total (875,000 premium - 25% conversion)</p>
                </div>
                <div>
                  <p className="font-medium">Hiring Companies: 8,000</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Revenue Breakdown:</h4>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>Total Revenue: $490M</li>
                    <li>Gross Margin: 80%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unit Economics */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Unit Economics</h3>
              
              {/* CAC */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">CAC (Customer Acquisition Cost):</h4>
                <ul className="space-y-2 ml-6 list-disc text-gray-600">
                  <li>Professional User: $35</li>
                  <li>Premium User: $120</li>
                  <li>Hiring Company: $5,000</li>
                </ul>
              </div>

              {/* LTV */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">LTV (Lifetime Value):</h4>
                <ul className="space-y-2 ml-6 list-disc text-gray-600">
                  <li>Professional User: $85</li>
                  <li>Premium User: $720</li>
                  <li>Hiring Company: $75,000</li>
                </ul>
              </div>

              {/* LTV:CAC Ratio */}
              <div>
                <h4 className="font-medium mb-2">LTV:CAC Ratio:</h4>
                <ul className="space-y-2 ml-6 list-disc text-gray-600">
                  <li>Professional User: 2.4:1</li>
                  <li>Premium User: 6:1</li>
                  <li>Hiring Company: 15:1</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section id="competitive-advantage" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Competitive Advantage</h2>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* vs. LinkedIn */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">vs. LinkedIn:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Merit-based vs. popularity-based; verified skills vs. self-reported
                </p>
              </div>

              {/* vs. Traditional Recruiters */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">vs. Traditional Recruiters:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  AI-powered matching; continuous relationship vs. transactional
                </p>
              </div>

              {/* vs. Career Coaches */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">vs. Career Coaches:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Scalable, affordable, data-driven guidance
                </p>
              </div>

              {/* vs. Learning Platforms */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">vs. Learning Platforms:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Targeted development aligned with career path
                </p>
              </div>

              {/* Key Differentiator */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Key Differentiator:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Comprehensive 360° verified profiles built through continuous usage
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Go-To-Market Strategy Section */}
      <section id="go-to-market" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Go-To-Market Strategy</h2>
        
        {/* Market Context */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Market Context: The AI Disruption in Careers</h3>
            
            {/* The Changing Professional Landscape */}
            <div className="mb-8">
              <h4 className="font-medium mb-4">The Changing Professional Landscape</h4>
              
              <div className="space-y-6">
                {/* AI Displacement Reality */}
                <div>
                  <h5 className="font-medium mb-2">AI Displacement Reality</h5>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>85 million jobs potentially displaced by AI by 2025</li>
                    <li>40% of current job tasks automatable with existing technology</li>
                    <li>Gen X professionals (40-55) particularly vulnerable with 25+ years until retirement</li>
                    <li>Middle management roles being hollowed out by automation and flattening hierarchies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* The Human Value Renaissance */}
            <div>
              <h4 className="font-medium mb-4">The Human Value Renaissance</h4>
              <div>
                <h5 className="font-medium mb-2">Emerging Differentiators in an AI World</h5>
                <ul className="space-y-2 ml-6 list-disc text-gray-600">
                  <li>Strategic thinking and contextual judgment</li>
                  <li>Relationship building and interpersonal intelligence</li>
                  <li>Adaptability and continuous learning capacity</li>
                  <li>Domain expertise combined with cross-functional fluency</li>
                  <li>Emotional intelligence and stakeholder management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Approach */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Our Strategic Approach</h3>
            
            {/* Phase 1 */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Phase 1: Professional Reinvention (Months 1-12)</h4>
                
                {/* Target Audience */}
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Target Audience:</h5>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>Primary: Gen X professionals (40-55) facing AI disruption</li>
                    <li>Secondary: Early-career professionals (25-35) building AI-resilient careers</li>
                  </ul>
                </div>

                {/* Target Industries */}
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Target Industries:</h5>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>Finance (high AI disruption potential)</li>
                    <li>Marketing (rapidly evolving skill requirements)</li>
                    <li>Technology (early adopters of new platforms)</li>
                    <li>Healthcare administration (undergoing digital transformation)</li>
                  </ul>
                </div>

                {/* Acquisition Strategy */}
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Acquisition Strategy:</h5>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>Strategic partnerships with professional associations facing disruption</li>
                    <li>Content marketing focused on "future-proofing" careers</li>
                    <li>Virtual workshops on "Reinventing Your Career in the AI Age"</li>
                    <li>Early access program with 20% discount on premium features</li>
                  </ul>
                </div>

                {/* Success Metrics */}
                <div>
                  <h5 className="font-medium mb-2">Success Metrics:</h5>
                  <ul className="space-y-2 ml-6 list-disc text-gray-600">
                    <li>25,000 active users by month 12</li>
                    <li>40% completion rate of initial capability verification</li>
                    <li>35% weekly engagement rate with AI coach</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology & Data Moat Section */}
      <section id="technology" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Technology & Data Moat</h2>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* AI Model */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">AI Model Learning</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  AI model continuously learning from career trajectories
                </p>
              </div>

              {/* Matching Algorithm */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Proprietary Matching</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Proprietary matching algorithm based on verified capabilities
                </p>
              </div>

              {/* Data Ecosystem */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Rich Data Ecosystem</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Rich data ecosystem of skills, goals, and development pathways
                </p>
              </div>

              {/* Verification System */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Profile Verification</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Verification system ensuring profile authenticity
                </p>
              </div>

              {/* Network Effect */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Network Effect</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Network Value increases with each verified professional
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Traction & Roadmap Section */}
      <section id="traction" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Traction & Roadmap</h2>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Current Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Current Status:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  MVP development completed
                </p>
              </div>

              {/* Next 6 Months */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Next 6 Months:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Beta launch with 10,000 users, 50 hiring companies
                </p>
              </div>

              {/* Year 1 */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Year 1:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  75,000 users, 200 hiring companies, $8.8M ARR
                </p>
              </div>

              {/* Year 3 */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Year 3:</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  850,000 users, 2,500 hiring companies, $162.3M ARR
                </p>
              </div>

              {/* Key Growth Metrics */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Key Growth Metrics:</h4>
                </div>
                <ul className="ml-6 space-y-2 list-disc text-gray-600">
                  <li>User growth: 80% quarter-over-quarter</li>
                  <li>Hiring company conversion, placement success rate</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Investment Thesis Section */}
      <section id="investment" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Investment Thesis</h2>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Market Disruption */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Market Opportunity</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Disrupting the $30B+ professional networking market
                </p>
              </div>

              {/* Hiring Paradigm */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Innovation in Hiring</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Creating a new paradigm in hiring based on verified capabilities
                </p>
              </div>

              {/* Business Model */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Revenue Streams</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Scalable business model with multiple revenue streams
                </p>
              </div>

              {/* Competitive Moat */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Defensibility</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Strong network effects and data moat
                </p>
              </div>

              {/* Team */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Expertise</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Experienced team with domain expertise
                </p>
              </div>

              {/* Growth Potential */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-ochre mt-1"></div>
                  <h4 className="font-medium">Expansion Potential</h4>
                </div>
                <p className="ml-6 text-gray-600">
                  Massive potential for expansion into adjacent markets (education, gig economy)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gold-ochre">Contact</h2>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Jack Fenley</h3>
                <a 
                  href="mailto:jack@talentprimer.com" 
                  className="text-gold-ochre hover:text-gold-ochre/80 transition-colors"
                >
                  jack@talentprimer.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
};

export default Investors; 