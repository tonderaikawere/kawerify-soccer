import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="text-4xl mr-4 animate-float">⚠️</span>
              <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-655 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                Disclaimer
              </h1>
            </div>
            <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto uppercase tracking-wider leading-relaxed">
              Important information about the use of Kawerify Tech Tournaments platform and limitations of liability.
            </p>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Important Notice */}
            <Alert className="border-red-500/30 rounded-xl bg-red-950/20 text-red-800 dark:text-red-400">
              <AlertDescription className="font-bold text-xs">
                Please read this disclaimer carefully before using our services. Your use of the platform constitutes acceptance of these terms.
              </AlertDescription>
            </Alert>

            {/* General Disclaimer */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  ℹ️ General Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-4">
                <p>
                  The information contained in this website and tournament platform is for general information 
                  purposes only. While we endeavor to keep the information up to date and correct, Kawerify Tech 
                  makes no representations or warranties of any kind, express or implied, about the completeness, 
                  accuracy, reliability, suitability, or availability of the website or the information, products, 
                  services, or related graphics contained on the website for any purpose.
                </p>
                <p>
                  Any reliance you place on such information is therefore strictly at your own risk. In no event 
                  will we be liable for any loss or damage including without limitation, indirect or consequential 
                  loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising 
                  out of, or in connection with, the use of this website.
                </p>
              </CardContent>
            </Card>

            {/* Tournament Disclaimer */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🛡️ Tournament and Gaming Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-xs text-slate-500 font-semibold">
                <div>
                  <h3 className="text-sm font-black mb-3 text-emerald-500 uppercase tracking-wider">Fair Play and Competition</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Tournament results are based on player-reported scores and may not reflect actual gameplay</li>
                    <li>We do not guarantee the accuracy of match results or player statistics</li>
                    <li>Disputes between players must be resolved independently</li>
                    <li>We reserve the right to modify tournament rules and formats at any time</li>
                    <li>Participation in tournaments is voluntary and at your own risk</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-blue-500 uppercase tracking-wider">Technical Limitations</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Platform availability may be interrupted due to maintenance or technical issues</li>
                    <li>Data stored locally may be lost due to browser issues or device problems</li>
                    <li>We do not guarantee backup or recovery of tournament data</li>
                    <li>System performance may vary based on device and internet connection</li>
                    <li>Features may be added, modified, or removed without prior notice</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-purple-500 uppercase tracking-wider">User Responsibility</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Users are responsible for maintaining their own data backups</li>
                    <li>Players must ensure they have proper gaming equipment and internet connection</li>
                    <li>Users should verify all information before making tournament-related decisions</li>
                    <li>Compliance with local laws and regulations is the user's responsibility</li>
                    <li>Users must respect intellectual property rights of game publishers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data and Privacy Disclaimer */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  📝 Data and Privacy Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Local Data Storage</h3>
                  <p>
                    Our platform primarily uses local browser storage to maintain tournament data. While this 
                    provides privacy benefits, it also means that data may be lost if browser data is cleared, 
                    devices are replaced, or technical issues occur. We strongly recommend regular data exports 
                    for backup purposes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">User-Generated Content</h3>
                  <p>
                    Users may upload images, videos, and other content to the platform. We do not monitor or 
                    verify the accuracy, appropriateness, or legality of user-generated content. Users are 
                    solely responsible for the content they upload and must ensure they have proper rights 
                    and permissions.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Third-Party Content</h3>
                  <p>
                    Our platform may contain references to third-party games, teams, or other content. We do 
                    not endorse or take responsibility for third-party content, and such references are for 
                    informational purposes only.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Service Availability and Performance</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p className="mb-4">
                  While we strive to provide reliable service, we cannot guarantee continuous availability 
                  of the platform. The service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical difficulties or server issues</li>
                  <li>Internet connectivity problems</li>
                  <li>Force majeure events beyond our control</li>
                  <li>Security incidents or necessary protective measures</li>
                </ul>
                <p>
                  We will make reasonable efforts to minimize service disruptions but cannot be held liable 
                  for any inconvenience or losses resulting from service unavailability.
                </p>
              </CardContent>
            </Card>

            {/* Legal Disclaimer */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  ⚖️ Legal Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">No Legal Advice</h3>
                  <p>
                    Nothing on this platform constitutes legal advice. Users should consult with qualified 
                    legal professionals for any legal questions or concerns related to gaming, competitions, 
                    or intellectual property matters.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Jurisdiction and Governing Law</h3>
                  <p>
                    This disclaimer is governed by the laws of Zimbabwe. Any disputes arising from the use 
                    of this platform will be subject to the exclusive jurisdiction of Zimbabwean courts.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Limitation of Liability</h3>
                  <p>
                    To the fullest extent permitted by law, Kawerify Tech shall not be liable for any direct, 
                    indirect, incidental, special, consequential, or punitive damages arising from your use 
                    of the platform, even if we have been advised of the possibility of such damages.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Age Restrictions */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Age Restrictions and Parental Guidance</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p className="mb-4">
                  Our platform is designed for users of all ages, but we recommend parental guidance for 
                  users under 13 years of age. Parents and guardians should:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Monitor their children's use of the platform</li>
                  <li>Ensure appropriate gaming time limits</li>
                  <li>Review any content uploaded by their children</li>
                  <li>Understand the competitive nature of tournaments</li>
                  <li>Be aware of any costs associated with gaming</li>
                </ul>
              </CardContent>
            </Card>

            {/* Changes to Disclaimer */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Changes to This Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p>
                  We reserve the right to modify this disclaimer at any time without prior notice. Changes 
                  will be effective immediately upon posting on our website. Your continued use of the 
                  platform after any changes constitutes acceptance of the updated disclaimer.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-white/10 text-white rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  ✉️ Questions or Concerns?
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-semibold mt-1">
                  If you have any questions about this disclaimer, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-455 space-y-2 text-slate-400">
                <p><strong>Company:</strong> Kawerify Tech Tournaments</p>
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

export default Disclaimer;
