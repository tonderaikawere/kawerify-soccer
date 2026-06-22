import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const About = () => {
  const teamMembers = [
    {
      name: "Mr T Sibanda",
      role: "Founder & CEO",
      description: "Visionary leader driving innovation in competitive gaming.",
      avatar: "TS"
    },
    {
      name: "M D Mthombeni",
      role: "Director",
      description: "Strategic director overseeing platform development and operations.",
      avatar: "MM"
    },
    {
      name: "Mr Panashe",
      role: "Vice Director",
      description: "Vice director managing technical excellence and user experience.",
      avatar: "MP"
    },
    {
      name: "Matsi T",
      role: "Entertainment Director",
      description: "Entertainment specialist creating engaging gaming experiences.",
      avatar: "MT"
    },
    {
      name: "Tsepo",
      role: "Game Tester",
      description: "Quality assurance expert ensuring flawless gaming experience.",
      avatar: "TP"
    }
  ];

  const offers = [
    { emoji: "🏆", title: "Professional Platform", description: "FIFA-style tournament management" },
    { emoji: "👥", title: "Community Focused", description: "Built for soccer gaming enthusiasts" },
    { emoji: "🎯", title: "Performance Driven", description: "Advanced statistics and analytics" },
    { emoji: "⚡", title: "Real-time Updates", description: "Live match tracking and results" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          
          {/* Page Header */}
          <PageHeader
            title="About"
            highlightedTitle="Kawerify"
            subtitle="Pioneering the future of competitive soccer gaming with professional tournament management solutions."
          />

          {/* Our Story */}
          <div className="mb-16">
            <Card className="overflow-hidden glass-panel border-white/10 shadow-2xl rounded-2xl relative">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <CardHeader className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 text-white border-b border-white/5">
                <CardTitle className="text-2xl font-black uppercase tracking-wider flex items-center gap-3">
                  ❤️ Our Story
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                  From passion to professional platform
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 text-xs font-semibold text-slate-500 leading-relaxed space-y-4">
                <p>
                  Kawerify Tech Tournaments was born from a simple passion: bringing the excitement and 
                  professionalism of FIFA World Cup tournaments to the gaming community. Based in the 
                  heart of Zimbabwe, we recognized the need for a comprehensive, user-friendly platform 
                  that could manage complex tournament structures while maintaining the thrill of competitive gaming.
                </p>
                
                <p>
                  Our journey began with a vision to create more than just a tournament tracker. We wanted 
                  to build a complete ecosystem where soccer gaming enthusiasts could compete, track their 
                  progress, celebrate achievements, and be part of a vibrant community. Every feature, from 
                  our FIFA-style animations to our comprehensive statistics system, has been crafted with 
                  the user experience at its core.
                </p>
                
                <p>
                  Today, Kawerify Tech Tournaments stands as a testament to innovation in sports gaming 
                  technology. We continue to evolve, always listening to our community and pushing the 
                  boundaries of what a tournament management platform can achieve.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-black uppercase tracking-wider gap-3">
                  🎯 Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  To revolutionize competitive soccer gaming by providing a professional, feature-rich 
                  tournament management platform that brings players together, celebrates achievements, 
                  and elevates the gaming experience to new heights.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-black uppercase tracking-wider gap-3">
                  ⭐ Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  To become the global standard for soccer gaming tournaments, fostering a worldwide 
                  community of passionate players while continuously innovating to enhance competitive 
                  gaming experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer */}
          <div className="mb-16 space-y-8">
            <h2 className="text-2xl font-black text-center uppercase tracking-widest text-slate-900 dark:text-white">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offers.map((offer, index) => (
                <Card key={index} className="text-center glass-card hover:-translate-y-1 hover:border-primary/45 transition-all duration-300 rounded-2xl border-white/10">
                  <CardContent className="p-6 space-y-3">
                    <div className="text-4xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                      {offer.emoji}
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">{offer.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{offer.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-center">Platform Features</CardTitle>
                <CardDescription className="text-center text-xs font-semibold uppercase tracking-wider mt-1 text-slate-500">
                  Everything you need for professional tournament management
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-bold text-slate-455">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-emerald-500">Tournament Management</h3>
                    <ul className="space-y-2.5 text-slate-500 font-semibold">
                      <li>• FIFA World Cup-style tournaments</li>
                      <li>• Automatic fixture generation</li>
                      <li>• Weekly scheduling system</li>
                      <li>• Real-time match tracking</li>
                      <li>• Cup-style knockout format</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-blue-500">Player Experience</h3>
                    <ul className="space-y-2.5 text-slate-500 font-semibold">
                      <li>• Detailed player profiles</li>
                      <li>• Comprehensive statistics</li>
                      <li>• Achievement badges</li>
                      <li>• Media gallery support</li>
                      <li>• Team history tracking</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-purple-500">Advanced Features</h3>
                    <ul className="space-y-2.5 text-slate-500 font-semibold">
                      <li>• Local data storage</li>
                      <li>• Export/import functionality</li>
                      <li>• Hall of Fame system</li>
                      <li>• Admin dashboard</li>
                      <li>• Responsive design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Our Team */}
          <div className="mb-16 space-y-8">
            <h2 className="text-2xl font-black text-center uppercase tracking-widest text-slate-900 dark:text-white">
              Executive Roster
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center glass-card hover:-translate-y-1 hover:border-primary/45 transition-all duration-300 rounded-2xl border-white/10">
                  <CardContent className="p-8 space-y-3">
                    <Avatar className="h-20 w-20 mx-auto border-2 border-primary shadow-lg">
                      <AvatarImage src="" alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-xl font-black">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">{member.name}</h3>
                      <Badge className="mt-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-950/60 text-emerald-400 border border-white/5">{member.role}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-white/10 text-white rounded-2xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-black uppercase tracking-wider text-center">Get In Touch</CardTitle>
                <CardDescription className="text-center text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                  We'd love to hear from you and answer any questions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-xs font-semibold text-slate-400">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-2xl animate-float">📍</div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Location</h3>
                    <p className="leading-relaxed">
                      KoMthombeni, Plot 2 Grampsway<br />
                      Rangemore, Bulawayo<br />
                      Zimbabwe
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-2xl animate-float" style={{ animationDelay: '0.4s' }}>📞</div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Phone</h3>
                    <p>
                      <a href="tel:+263716264988" className="hover:text-white transition-colors duration-200">
                        +263 71 626 4988
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-2xl animate-float" style={{ animationDelay: '0.8s' }}>✉️</div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Email</h3>
                    <p>
                      <a href="mailto:info@kawerifytech.com" className="hover:text-white transition-colors duration-200">
                        info@kawerifytech.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="glass-panel border-white/10 rounded-2xl relative overflow-hidden">
              <CardContent className="p-12 space-y-4">
                <div className="text-5xl animate-float">🏆</div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Ready to Compete?
                </h2>
                <p className="text-xs text-slate-500 font-semibold max-w-lg mx-auto leading-relaxed">
                  Join the Kawerify Tech Tournaments community and experience the future of competitive soccer gaming.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <Badge className="text-[10px] font-black uppercase tracking-wider rounded-lg px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 border-0 text-white">
                    Professional Platform
                  </Badge>
                  <Badge className="text-[10px] font-black uppercase tracking-wider rounded-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white">
                    Global Community
                  </Badge>
                  <Badge className="text-[10px] font-black uppercase tracking-wider rounded-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 border-0 text-white">
                    Advanced Features
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
