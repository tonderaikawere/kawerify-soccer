import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="text-4xl mr-4 animate-float">🛡️</span>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-550 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider">
                Privacy Policy
              </h1>
            </div>
            <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto uppercase tracking-wider leading-relaxed">
              Your privacy is important to us. This policy explains how Kawerify Tech Tournaments collects, uses, and protects your information.
            </p>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  👁️ Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-4">
                <p>
                  Kawerify Tech Tournaments ("we," "our," or "us") operates the soccer tournament management platform. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                  visit our website and use our services.
                </p>
                <p>
                  By accessing or using our service, you agree to the collection and use of information in accordance 
                  with this policy. If you do not agree with our policies and practices, do not use our service.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🗄️ Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-emerald-500 uppercase tracking-wider">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Player names and usernames</li>
                    <li>Email addresses for communication</li>
                    <li>Profile images and media uploads</li>
                    <li>Tournament participation data</li>
                    <li>Match statistics and performance data</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-blue-500 uppercase tracking-wider">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Browser type and version</li>
                    <li>Operating system information</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and preferences</li>
                    <li>Device information and identifiers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-purple-500 uppercase tracking-wider">Local Storage Data</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Tournament data stored locally in your browser</li>
                    <li>Player profiles and statistics</li>
                    <li>Match history and results</li>
                    <li>User preferences and settings</li>
                    <li>Media files uploaded by users</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  👥 How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5"></div>
                    <p>To provide and maintain our tournament management services</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5"></div>
                    <p>To manage player profiles, statistics, and tournament data</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5"></div>
                    <p>To communicate with users about tournaments and updates</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5"></div>
                    <p>To improve our services and user experience</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5"></div>
                    <p>To ensure fair play and tournament integrity</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5"></div>
                    <p>To comply with legal obligations and resolve disputes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Storage and Security */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🔑 Data Storage and Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Local Storage</h3>
                  <p>
                    Most of your tournament data is stored locally in your browser's storage. This means your data 
                    remains on your device and is not transmitted to external servers unless explicitly required 
                    for specific features.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Security Measures</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Encryption of sensitive data in transit</li>
                    <li>Secure authentication for admin access</li>
                    <li>Regular security updates and monitoring</li>
                    <li>Limited access to personal information</li>
                    <li>Secure backup and recovery procedures</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Data Retention</h3>
                  <p>
                    We retain your information only as long as necessary to provide our services and comply with 
                    legal obligations. You can request deletion of your data at any time by contacting us.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🛡️ Your Privacy Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Access Rights</h3>
                    <p className="text-slate-500">
                      You have the right to access and review your personal information stored in our system.
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Correction Rights</h3>
                    <p className="text-slate-500">
                      You can update or correct your personal information through your profile settings.
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Deletion Rights</h3>
                    <p className="text-slate-500">
                      You can request deletion of your personal data, subject to legal and operational requirements.
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Portability Rights</h3>
                    <p className="text-slate-500">
                      You can export your tournament data using our data export functionality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-3">
                <p>
                  Our service may contain links to third-party websites or services. We are not responsible for 
                  the privacy practices of these third parties. We encourage you to read their privacy policies.
                </p>
                <p>
                  We may use third-party services for analytics, hosting, or other operational purposes. These 
                  services have their own privacy policies and data handling practices.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p>
                  Our service is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe your 
                  child has provided us with personal information, please contact us to have it removed.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date. You are advised to 
                  review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-white/10 text-white rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  ✉️ Contact Us
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-semibold mt-1">
                  If you have any questions about this Privacy Policy, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-400 space-y-2">
                <p><strong>Email:</strong> info@kawerifytech.com</p>
                <p><strong>Phone:</strong> +263 71 626 4988</p>
                <p><strong>Address:</strong> KoMthombeni, Plot 2 Grampsway, Rangemore, Bulawayo, Zimbabwe</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
