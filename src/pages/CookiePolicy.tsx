import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="text-4xl mr-4 animate-float">🍪</span>
              <h1 className="text-4xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent uppercase tracking-wider">
                Cookie Policy
              </h1>
            </div>
            <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto uppercase tracking-wider leading-relaxed">
              Learn how Kawerify Tech Tournaments uses cookies and similar technologies to enhance your experience.
            </p>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Important Notice */}
            <Alert className="border-white/10 rounded-xl bg-slate-900/40">
              <AlertDescription className="text-slate-400 font-bold text-xs">
                By continuing to use our website, you consent to our use of cookies as described in this policy.
              </AlertDescription>
            </Alert>

            {/* What Are Cookies */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  👁️ What Are Cookies?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-4">
                <p>
                  Cookies are small text files that are stored on your computer or mobile device when you visit 
                  a website. They are widely used to make websites work more efficiently and provide information 
                  to website owners.
                </p>
                <p>
                  Cookies allow us to recognize your device and store some information about your preferences or 
                  past actions to improve your experience on our tournament platform.
                </p>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🗄️ Types of Cookies We Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-xs">
                <div>
                  <h3 className="text-sm font-black mb-3 text-emerald-500 uppercase tracking-wider">Essential Cookies</h3>
                  <p className="text-slate-500 font-semibold mb-2">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-500 font-semibold">
                    <li>Authentication and security cookies</li>
                    <li>Session management cookies</li>
                    <li>Load balancing cookies</li>
                    <li>User interface customization cookies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-blue-500 uppercase tracking-wider">Functional Cookies</h3>
                  <p className="text-slate-500 font-semibold mb-2">
                    These cookies enable enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-500 font-semibold">
                    <li>Language and region preferences</li>
                    <li>User interface preferences</li>
                    <li>Tournament data storage</li>
                    <li>Player profile settings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-purple-500 uppercase tracking-wider">Analytics Cookies</h3>
                  <p className="text-slate-500 font-semibold mb-2">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-500 font-semibold">
                    <li>Page view tracking</li>
                    <li>User behavior analysis</li>
                    <li>Performance monitoring</li>
                    <li>Error tracking and reporting</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-orange-500 uppercase tracking-wider">Local Storage</h3>
                  <p className="text-slate-500 font-semibold mb-2">
                    We use browser local storage to enhance your tournament experience.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-500 font-semibold">
                    <li>Tournament data and statistics</li>
                    <li>Player profiles and media</li>
                    <li>Match history and results</li>
                    <li>User preferences and settings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Cookies */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  ⚙️ How We Use Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-purple-505 bg-primary rounded-full mt-1.5"></div>
                    <p>To provide essential website functionality and security</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-purple-505 bg-primary rounded-full mt-1.5"></div>
                    <p>To remember your preferences and settings</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-purple-555 bg-primary rounded-full mt-1.5"></div>
                    <p>To store tournament data locally on your device</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-purple-555 bg-primary rounded-full mt-1.5"></div>
                    <p>To analyze website usage and improve our services</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-1.5 w-1.5 bg-purple-555 bg-primary rounded-full mt-1.5"></div>
                    <p>To ensure optimal performance and user experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🛡️ Managing Your Cookie Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div>
                  <h3 className="text-sm font-black mb-3 uppercase tracking-wider text-slate-900 dark:text-white">Browser Settings</h3>
                  <p className="text-slate-500 font-semibold mb-4">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-500 font-semibold">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete existing cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies (may affect website functionality)</li>
                    <li>Set preferences for third-party cookies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 uppercase tracking-wider text-slate-900 dark:text-white">Local Storage</h3>
                  <p className="text-slate-500 font-semibold">
                    Our tournament platform primarily uses local storage to keep your data on your device. 
                    You can clear this data through your browser's developer tools or by using our data 
                    export/clear functions in the admin panel.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 uppercase tracking-wider text-slate-900 dark:text-white">Impact of Disabling Cookies</h3>
                  <p className="text-slate-500 font-semibold">
                    Please note that disabling cookies may affect the functionality of our website. Some 
                    features may not work properly, and you may need to re-enter information each time 
                    you visit.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p className="mb-4">
                  We may use third-party services that set their own cookies. These services include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Analytics providers for website usage statistics</li>
                  <li>Content delivery networks for improved performance</li>
                  <li>Security services for protection against threats</li>
                  <li>Social media platforms for sharing functionality</li>
                </ul>
                <p className="mt-4">
                  These third parties have their own privacy policies and cookie practices, which we 
                  encourage you to review.
                </p>
              </CardContent>
            </Card>

            {/* Updates to Policy */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Updates to This Cookie Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any 
                  material changes by posting the updated policy on our website.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-white/10 text-white rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🍪 Questions About Cookies?
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-semibold mt-1">
                  If you have any questions about our use of cookies, please contact us:
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

export default CookiePolicy;
