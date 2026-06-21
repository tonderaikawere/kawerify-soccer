import { Trophy, Users, Target, Heart, MapPin, Phone, Mail, Award, Star, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const teamMembers = [
    {
      name: "Mr T Sibanda",
      role: "Founder & CEO",
      description: "Visionary leader driving innovation in competitive gaming",
      avatar: "TS"
    },
    {
      name: "M D Mthombeni",
      role: "Director",
      description: "Strategic director overseeing platform development and operations",
      avatar: "MM"
    },
    {
      name: "Mr Panashe",
      role: "Vice Director",
      description: "Vice director managing technical excellence and user experience",
      avatar: "MP"
    },
    {
      name: "Matsi T",
      role: "Entertainment Director",
      description: "Entertainment specialist creating engaging gaming experiences",
      avatar: "MT"
    },
    {
      name: "Tsepo",
      role: "Game Tester",
      description: "Quality assurance expert ensuring flawless gaming experience",
      avatar: "TP"
    }
  ];

  const achievements = [
    { icon: Trophy, title: "Professional Platform", description: "FIFA-style tournament management" },
    { icon: Users, title: "Community Focused", description: "Built for soccer gaming enthusiasts" },
    { icon: Target, title: "Performance Driven", description: "Advanced statistics and analytics" },
    { icon: Zap, title: "Real-time Updates", description: "Live match tracking and results" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="animate-bounce mr-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                About Kawerify Tech
              </h1>
              <div className="animate-bounce ml-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
            </div>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Pioneering the future of competitive soccer gaming with professional tournament management solutions
            </p>
            
            {/* Animated soccer balls */}
            <div className="flex justify-center space-x-8 mt-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.3}s` }}>
                  <div className="h-8 w-8 rounded-full bg-white border-2 border-black relative">
                    <div className="absolute inset-1 rounded-full border border-black"></div>
                    <div className="absolute top-1 left-1 h-1.5 w-1.5 bg-black rounded-full"></div>
                    <div className="absolute bottom-1 right-1 h-1.5 w-1.5 bg-black rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <CardTitle className="text-3xl font-bold flex items-center">
                  <Heart className="h-8 w-8 mr-3 text-red-300" />
                  Our Story
                </CardTitle>
                <CardDescription className="text-green-100 text-lg">
                  From passion to professional platform
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Kawerify Tech Tournaments was born from a simple passion: bringing the excitement and 
                    professionalism of FIFA World Cup tournaments to the gaming community. Based in the 
                    heart of Zimbabwe, we recognized the need for a comprehensive, user-friendly platform 
                    that could manage complex tournament structures while maintaining the thrill of competitive gaming.
                  </p>
                  
                  <p className="text-lg leading-relaxed mb-6">
                    Our journey began with a vision to create more than just a tournament tracker. We wanted 
                    to build a complete ecosystem where soccer gaming enthusiasts could compete, track their 
                    progress, celebrate achievements, and be part of a vibrant community. Every feature, from 
                    our FIFA-style animations to our comprehensive statistics system, has been crafted with 
                    the user experience at its core.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    Today, Kawerify Tech Tournaments stands as a testament to innovation in sports gaming 
                    technology. We continue to evolve, always listening to our community and pushing the 
                    boundaries of what a tournament management platform can achieve.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Our Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Target className="h-8 w-8 mr-3 text-green-600" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  To revolutionize competitive soccer gaming by providing a professional, feature-rich 
                  tournament management platform that brings players together, celebrates achievements, 
                  and elevates the gaming experience to new heights.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Star className="h-8 w-8 mr-3 text-blue-600" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  To become the global standard for soccer gaming tournaments, fostering a worldwide 
                  community of passionate players while continuously innovating to enhance competitive 
                  gaming experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <achievement.icon className="h-16 w-16 mx-auto text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">Platform Features</CardTitle>
                <CardDescription className="text-center text-lg">
                  Everything you need for professional tournament management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-green-600">Tournament Management</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• FIFA World Cup-style tournaments</li>
                      <li>• Automatic fixture generation</li>
                      <li>• Weekly scheduling system</li>
                      <li>• Real-time match tracking</li>
                      <li>• Cup-style knockout format</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-600">Player Experience</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Detailed player profiles</li>
                      <li>• Comprehensive statistics</li>
                      <li>• Achievement badges</li>
                      <li>• Media gallery support</li>
                      <li>• Team history tracking</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-purple-600">Advanced Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
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
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-2xl font-bold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <Badge className="mb-4">{member.role}</Badge>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">Get In Touch</CardTitle>
                <CardDescription className="text-center text-green-100 text-lg">
                  We'd love to hear from you and answer any questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center">
                    <MapPin className="h-12 w-12 mb-4 text-green-200" />
                    <h3 className="text-xl font-semibold mb-2">Location</h3>
                    <p className="text-green-100">
                      KoMthombeni, Plot 2 Grampsway<br />
                      Rangemore, Bulawayo<br />
                      Zimbabwe
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Phone className="h-12 w-12 mb-4 text-blue-200" />
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-blue-100">
                      <a href="tel:+263716264988" className="hover:text-white transition-colors">
                        +263 71 626 4988
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Mail className="h-12 w-12 mb-4 text-purple-200" />
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-purple-100">
                      <a href="mailto:info@kawerifytech.com" className="hover:text-white transition-colors">
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
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
              <CardContent className="p-12">
                <Trophy className="h-20 w-20 mx-auto mb-6 text-yellow-500 animate-bounce" />
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Ready to Compete?
                </h2>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join the Kawerify Tech Tournaments community and experience the future of competitive soccer gaming.
                </p>
                <div className="flex justify-center space-x-4">
                  <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-green-500 to-green-600">
                    Professional Platform
                  </Badge>
                  <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600">
                    Global Community
                  </Badge>
                  <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600">
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
