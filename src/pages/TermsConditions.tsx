import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="text-4xl mr-4 animate-float">⚖️</span>
              <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-blue-550 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto uppercase tracking-wider leading-relaxed">
              Please read these terms and conditions carefully before using Kawerify Tech Tournaments platform.
            </p>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Important Notice */}
            <Alert className="border-white/10 rounded-xl bg-slate-900/40">
              <AlertDescription className="text-slate-400 font-bold text-xs">
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
              </AlertDescription>
            </Alert>

            {/* Acceptance of Terms */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  📝 Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-4">
                <p>
                  These Terms and Conditions ("Terms") govern your use of the Kawerify Tech Tournaments platform 
                  ("Service") operated by Kawerify Tech ("us", "we", or "our").
                </p>
                <p>
                  Your access to and use of the Service is conditioned on your acceptance of and compliance with 
                  these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
                <p>
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with 
                  any part of these terms, then you may not access the Service.
                </p>
              </CardContent>
            </Card>

            {/* Tournament Rules */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🏆 Tournament Rules and Conduct
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-emerald-500 uppercase tracking-wider">Fair Play Policy</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>All participants must compete fairly and honestly</li>
                    <li>Cheating, exploitation, or unsportsmanlike conduct is prohibited</li>
                    <li>Match results must be reported accurately and promptly</li>
                    <li>Disputes should be resolved through proper channels</li>
                    <li>Respect for opponents and tournament officials is mandatory</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-blue-500 uppercase tracking-wider">Participation Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Players must register with accurate information</li>
                    <li>Only one account per person is allowed</li>
                    <li>Players must be available for scheduled matches</li>
                    <li>Technical requirements must be met for online play</li>
                    <li>Age restrictions may apply to certain tournaments</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-purple-500 uppercase tracking-wider">Tournament Format</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Cup-style knockout tournament format</li>
                    <li>Regular matches on Saturdays, knockout stages on Sundays</li>
                    <li>Automatic fixture shuffling after each round</li>
                    <li>Points system: 3 points for win, 1 for draw, 0 for loss</li>
                    <li>Tournament progression based on performance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  👥 User Accounts and Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Account Creation</h3>
                  <p>
                    When you create an account with us, you must provide information that is accurate, complete, 
                    and current at all times. You are responsible for safeguarding the password and for all 
                    activities that occur under your account.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">User Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Ensure your profile information remains accurate and up-to-date</li>
                    <li>Use the service in compliance with all applicable laws</li>
                    <li>Respect the rights and privacy of other users</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Prohibited Activities</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Creating multiple accounts or fake profiles</li>
                    <li>Sharing accounts with other individuals</li>
                    <li>Using automated tools or bots</li>
                    <li>Attempting to hack or compromise the system</li>
                    <li>Harassment or abusive behavior toward other users</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  🛡️ Intellectual Property Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Our Content</h3>
                  <p>
                    The Service and its original content, features, and functionality are and will remain the 
                    exclusive property of Kawerify Tech and its licensors. The Service is protected by copyright, 
                    trademark, and other laws.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">User Content</h3>
                  <p>
                    You retain ownership of any content you submit, post, or display on or through the Service. 
                    By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                    reproduce, and display such content in connection with the Service.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Third-Party Content</h3>
                  <p>
                    The Service may contain content from third parties. We do not claim ownership of such content 
                    and respect the intellectual property rights of others.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-3">
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                  your information when you use our Service. By using our Service, you agree to the collection 
                  and use of information in accordance with our Privacy Policy.
                </p>
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Service Availability and Modifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-slate-500 font-semibold leading-relaxed">
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Service Availability</h3>
                  <p>
                    We strive to provide continuous service availability but cannot guarantee uninterrupted access. 
                    The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-black mb-3 text-slate-900 dark:text-white uppercase tracking-wider">Modifications to Service</h3>
                  <p>
                    We reserve the right to modify, suspend, or discontinue the Service at any time without notice. 
                    We may also update these Terms from time to time. Continued use of the Service after changes 
                    constitutes acceptance of the new Terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-3">
                <p>
                  In no event shall Kawerify Tech, its directors, employees, partners, agents, suppliers, or 
                  affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
                <p>
                  Our liability to you for any cause whatsoever and regardless of the form of the action, will at 
                  all times be limited to the amount paid, if any, by you to us for the Service.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Termination</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed space-y-3">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior 
                  notice or liability, under our sole discretion, for any reason whatsoever, including without 
                  limitation if you breach the Terms.
                </p>
                <p>
                  If you wish to terminate your account, you may simply discontinue using the Service or contact 
                  us to request account deletion.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="glass-panel border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-wider">Governing Law and Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-500 leading-relaxed">
                <p>
                  These Terms shall be interpreted and governed by the laws of Zimbabwe, without regard to its 
                  conflict of law provisions. Any disputes arising from these Terms or the Service shall be 
                  subject to the exclusive jurisdiction of the courts of Zimbabwe.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-white/10 text-white rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-black uppercase tracking-wider gap-3">
                  📝 Contact Information
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-semibold mt-1">
                  If you have any questions about these Terms and Conditions, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs font-semibold text-slate-400 space-y-2">
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

export default TermsConditions;
