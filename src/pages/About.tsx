import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { 
  Heart, 
  Target, 
  Eye, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Users, 
  Trophy, 
  Cpu, 
  Zap 
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Mr T Sibanda",
      role: "Founder & CEO",
      description: "FIFA Style: Tiki-taka master. Built this platform so players would stop lying about their local win streaks.",
      avatar: "TS"
    },
    {
      name: "M D Mthombeni",
      role: "Director",
      description: "FIFA Style: 4-3-3 counter-attack. Keeps the server infrastructure running and the snack bar fully stocked.",
      avatar: "MM"
    },
    {
      name: "Mr Panashe",
      role: "Vice Director",
      description: "FIFA Style: Skill-move spammer. Oversees tournament fixtures and claims he's never lost a match fair-and-square.",
      avatar: "MP"
    },
    {
      name: "Matsi T",
      role: "Entertainment Director",
      description: "FIFA Style: Pure chaos. Manages the hype, plays the post-match tracks, and laughs at the rage-quits.",
      avatar: "MT"
    },
    {
      name: "Tsepo",
      role: "Game Tester",
      description: "FIFA Style: Park the bus. Tests layout designs, audits statistics, and blames network lag for every loss.",
      avatar: "TP"
    }
  ];

  const offers = [
    { icon: <Trophy className="h-8 w-8 text-amber-400" />, title: "Professional Platform", description: "FIFA-style tournament management" },
    { icon: <Users className="h-8 w-8 text-primary" />, title: "Community Focused", description: "Built for soccer gaming enthusiasts" },
    { icon: <Target className="h-8 w-8 text-secondary" />, title: "Performance Driven", description: "Advanced statistics and analytics" },
    { icon: <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />, title: "Real-time Updates", description: "Live match tracking and results" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#070b13] bg-stadium-grid text-white relative overflow-hidden transition-all duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-radial-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-555/10 rounded-full blur-[120px] pointer-events-none animate-radial-pulse" />

      <Navbar />
      <main className="flex-1 pb-16 relative z-10">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          
          {/* Page Header */}
          <PageHeader
            title="About"
            highlightedTitle="Kawerify"
            subtitle="Keeping the local FIFA and EA Sports scene alive in Bulawayo, one sweaty controller showdown at a time."
          />

          {/* Our Story */}
          <div className="mb-16">
            <Card className="overflow-hidden bg-slate-900/60 dark:bg-slate-955/45 border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl relative">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <CardHeader className="bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-955 p-6 md:p-8 text-white border-b border-white/5">
                <CardTitle className="text-2xl font-black uppercase tracking-wider flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500 fill-red-500 animate-pulse" /> Our Story: Heart & Controllers
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                  From living room arguments to Bulawayo's ultimate tournament
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 text-sm font-medium text-slate-300 leading-relaxed space-y-6">
                <p>
                  Kawerify Soccer League started where all great rivalries begin: a crowded living room in Bulawayo, 
                  slightly drifting controllers, and heated arguments about who actually plays the best FIFA. Located 
                  at KoMthombeni (Plot 2 Grampsway, Rangemore), we were just a group of friends who spent our weekends 
                  shouting at the TV screen, eating snacks, and disputing player ratings.
                </p>
                
                <p>
                  As the matches got more competitive and claims of being 'the pad king of Bulawayo' got louder, 
                  we realized we needed a way to prove who the real champion was. Scribbling brackets on pieces of 
                  paper wasn't cutting it anymore. So, we built Kawerify Soccer Cup—our custom digital tournament tracking system.
                </p>
                
                <p>
                  We wanted to capture the sheer hype of opening a fresh FUT pack, the heartbreak of a 90th-minute script goal, 
                  and the glory of raising the cup. Today, it’s the official home of our local esports community. No corporate 
                  fluff, no generic stats—just pure gaming, controller excuses, and proof of who is king of the console.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 rounded-2xl hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-black uppercase tracking-wider gap-3 text-white">
                  <Target className="h-5 w-5 text-primary" /> Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                  Through the controller, we unite. Our mission is to keep the local FIFA scene alive and kicking, 
                  giving every player in the community a platform to compete, track their career stats, and settle 
                  old scores once and for all.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 rounded-2xl hover:border-secondary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-black uppercase tracking-wider gap-3 text-white">
                  <Eye className="h-5 w-5 text-secondary" /> Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                  Bragging rights, officially documented. We envision a community where every weekend feels like a mini-stadium 
                  showdown, and where every player can look at their card statistics and let their gameplay do the talking.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer */}
          <div className="mb-16 space-y-8">
            <h2 className="text-2xl font-black text-center uppercase tracking-widest text-white">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offers.map((offer, index) => (
                <Card key={index} className="text-center bg-slate-900/40 border border-white/5 hover:-translate-y-1.5 hover:border-primary/45 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-center">
                      {offer.icon}
                    </div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">{offer.title}</h3>
                    <p className="text-xs text-slate-400 font-semibold">{offer.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-slate-955/45">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-center text-white flex items-center justify-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" /> Platform Features
                </CardTitle>
                <CardDescription className="text-center text-xs font-semibold uppercase tracking-wider mt-1 text-slate-400">
                  Everything you need for professional tournament management
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400 border-b border-white/5 pb-2">Tournament Management</h3>
                    <ul className="space-y-3 text-slate-300 text-xs font-semibold">
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> FIFA World Cup-style tournaments</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> Automatic fixture generation</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> Weekly scheduling system</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> Real-time match tracking</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> Cup-style knockout format</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-blue-400 border-b border-white/5 pb-2">Player Experience</h3>
                    <ul className="space-y-3 text-slate-300 text-xs font-semibold">
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Detailed player profiles</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Comprehensive statistics</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Achievement badges</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Media gallery support</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Team history tracking</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-purple-400 border-b border-white/5 pb-2">Advanced Tech</h3>
                    <ul className="space-y-3 text-slate-300 text-xs font-semibold">
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-purple-450 shrink-0" /> Local data storage</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-purple-455 shrink-0" /> Export/import functionality</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-purple-455 shrink-0" /> Hall of Fame system</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-purple-455 shrink-0" /> Admin dashboard</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-purple-455 shrink-0" /> Responsive design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Our Team */}
          <div className="mb-16 space-y-8">
            <h2 className="text-2xl font-black text-center uppercase tracking-widest text-white">
              Executive Roster
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center bg-slate-900/50 border border-white/5 hover:-translate-y-1.5 hover:border-primary/45 transition-all duration-300 rounded-2xl overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-emerald-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 space-y-4">
                    <div className="relative w-20 h-20 mx-auto group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300" />
                      <Avatar className="h-20 w-20 border-2 border-primary shadow-lg relative z-10">
                        <AvatarImage src="" alt={member.name} />
                        <AvatarFallback className="bg-gradient-to-br from-slate-900 to-slate-950 text-emerald-400 text-xl font-black border border-primary/20">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-white">{member.name}</h3>
                      <Badge className="mt-2 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-955/60 text-emerald-400 border border-white/5 px-2.5 py-0.5">{member.role}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-955 border-white/10 dark:border-white/5 text-white rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 p-4 opacity-5 pointer-events-none">
                <Mail className="w-48 h-48 animate-pulse" />
              </div>
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-xl font-black uppercase tracking-wider text-center">Get In Touch</CardTitle>
                <CardDescription className="text-center text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                  We'd love to hear from you and answer any questions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-xs font-semibold text-slate-400">
                  <div className="flex flex-col items-center space-y-3 bg-slate-955/45 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="p-3 bg-slate-900 rounded-xl border border-white/5 text-primary animate-float">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Location</h3>
                    <p className="leading-relaxed text-slate-350">
                      KoMthombeni, Plot 2 Grampsway<br />
                      Rangemore, Bulawayo<br />
                      Zimbabwe
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3 bg-slate-955/45 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="p-3 bg-slate-900 rounded-xl border border-white/5 text-emerald-400 animate-float" style={{ animationDelay: '0.4s' }}>
                      <Phone className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Phone</h3>
                    <p>
                      <a href="tel:+263716264988" className="text-slate-300 hover:text-white transition-colors duration-200">
                        +263 71 626 4988
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3 bg-slate-955/45 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="p-3 bg-slate-900 rounded-xl border border-white/5 text-secondary animate-float" style={{ animationDelay: '0.8s' }}>
                      <Mail className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Email</h3>
                    <p>
                      <a href="mailto:info@kawerifytech.com" className="text-slate-300 hover:text-white transition-colors duration-200">
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
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl relative overflow-hidden">
              <CardContent className="p-12 space-y-5">
                <div className="flex justify-center">
                  <div className="p-4 bg-slate-955/65 rounded-2xl border border-white/10 text-amber-400 shadow-xl shadow-amber-500/5 animate-float">
                    <Trophy className="h-10 w-10" />
                  </div>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-white">
                  Ready to Compete?
                </h2>
                <p className="text-xs text-slate-400 font-semibold max-w-lg mx-auto leading-relaxed">
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
