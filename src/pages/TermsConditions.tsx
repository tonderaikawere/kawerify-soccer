import { FileText, Scale, AlertTriangle, Users, Trophy, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <Scale className="h-16 w-16 text-green-600 mr-4" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using Kawerify Tech Tournaments platform.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Important Notice */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
              </AlertDescription>
            </Alert>

            {/* Acceptance of Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-blue-500" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                  Tournament Rules and Conduct
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Fair Play Policy</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>All participants must compete fairly and honestly</li>
                    <li>Cheating, exploitation, or unsportsmanlike conduct is prohibited</li>
                    <li>Match results must be reported accurately and promptly</li>
                    <li>Disputes should be resolved through proper channels</li>
                    <li>Respect for opponents and tournament officials is mandatory</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Participation Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Players must register with accurate information</li>
                    <li>Only one account per person is allowed</li>
                    <li>Players must be available for scheduled matches</li>
                    <li>Technical requirements must be met for online play</li>
                    <li>Age restrictions may apply to certain tournaments</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Tournament Format</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-purple-500" />
                  User Accounts and Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Account Creation</h3>
                  <p className="text-muted-foreground">
                    When you create an account with us, you must provide information that is accurate, complete, 
                    and current at all times. You are responsible for safeguarding the password and for all 
                    activities that occur under your account.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">User Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Ensure your profile information remains accurate and up-to-date</li>
                    <li>Use the service in compliance with all applicable laws</li>
                    <li>Respect the rights and privacy of other users</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Prohibited Activities</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-red-500" />
                  Intellectual Property Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Our Content</h3>
                  <p className="text-muted-foreground">
                    The Service and its original content, features, and functionality are and will remain the 
                    exclusive property of Kawerify Tech and its licensors. The Service is protected by copyright, 
                    trademark, and other laws.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">User Content</h3>
                  <p className="text-muted-foreground">
                    You retain ownership of any content you submit, post, or display on or through the Service. 
                    By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                    reproduce, and display such content in connection with the Service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Third-Party Content</h3>
                  <p className="text-muted-foreground">
                    The Service may contain content from third parties. We do not claim ownership of such content 
                    and respect the intellectual property rights of others.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                  your information when you use our Service. By using our Service, you agree to the collection 
                  and use of information in accordance with our Privacy Policy.
                </p>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Service Availability and Modifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Service Availability</h3>
                  <p className="text-muted-foreground">
                    We strive to provide continuous service availability but cannot guarantee uninterrupted access. 
                    The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Modifications to Service</h3>
                  <p className="text-muted-foreground">
                    We reserve the right to modify, suspend, or discontinue the Service at any time without notice. 
                    We may also update these Terms from time to time. Continued use of the Service after changes 
                    constitutes acceptance of the new Terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  In no event shall Kawerify Tech, its directors, employees, partners, agents, suppliers, or 
                  affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
                <p className="text-muted-foreground">
                  Our liability to you for any cause whatsoever and regardless of the form of the action, will at 
                  all times be limited to the amount paid, if any, by you to us for the Service.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior 
                  notice or liability, under our sole discretion, for any reason whatsoever, including without 
                  limitation if you breach the Terms.
                </p>
                <p className="text-muted-foreground">
                  If you wish to terminate your account, you may simply discontinue using the Service or contact 
                  us to request account deletion.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>Governing Law and Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These Terms shall be interpreted and governed by the laws of Zimbabwe, without regard to its 
                  conflict of law provisions. Any disputes arising from these Terms or the Service shall be 
                  subject to the exclusive jurisdiction of the courts of Zimbabwe.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-green-500" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  If you have any questions about these Terms and Conditions, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Company:</strong> Kawerify Tech Tournaments</p>
                  <p><strong>Email:</strong> info@kawerifytech.com</p>
                  <p><strong>Phone:</strong> +263 71 626 4988</p>
                  <p><strong>Address:</strong> KoMthombeni, Plot 2 Grampsway, Rangemore, Bulawayo, Zimbabwe</p>
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

export default TermsConditions;
