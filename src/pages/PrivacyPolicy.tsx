import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how Kawerify Tech Tournaments collects, uses, and protects your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Player names and usernames</li>
                    <li>Email addresses for communication</li>
                    <li>Profile images and media uploads</li>
                    <li>Tournament participation data</li>
                    <li>Match statistics and performance data</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Browser type and version</li>
                    <li>Operating system information</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and preferences</li>
                    <li>Device information and identifiers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Local Storage Data</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To provide and maintain our tournament management services</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To manage player profiles, statistics, and tournament data</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To communicate with users about tournaments and updates</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To improve our services and user experience</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To ensure fair play and tournament integrity</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To comply with legal obligations and resolve disputes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Storage and Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  
                  Data Storage and Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Local Storage</h3>
                  <p className="text-muted-foreground">
                    Most of your tournament data is stored locally in your browser's storage. This means your data 
                    remains on your device and is not transmitted to external servers unless explicitly required 
                    for specific features.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Security Measures</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Encryption of sensitive data in transit</li>
                    <li>Secure authentication for admin access</li>
                    <li>Regular security updates and monitoring</li>
                    <li>Limited access to personal information</li>
                    <li>Secure backup and recovery procedures</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Data Retention</h3>
                  <p className="text-muted-foreground">
                    We retain your information only as long as necessary to provide our services and comply with 
                    legal obligations. You can request deletion of your data at any time by contacting us.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  
                  Your Privacy Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Access Rights</h3>
                    <p className="text-sm text-muted-foreground">
                      You have the right to access and review your personal information stored in our system.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Correction Rights</h3>
                    <p className="text-sm text-muted-foreground">
                      You can update or correct your personal information through your profile settings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Deletion Rights</h3>
                    <p className="text-sm text-muted-foreground">
                      You can request deletion of your personal data, subject to legal and operational requirements.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Portability Rights</h3>
                    <p className="text-sm text-muted-foreground">
                      You can export your tournament data using our data export functionality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Our service may contain links to third-party websites or services. We are not responsible for 
                  the privacy practices of these third parties. We encourage you to read their privacy policies.
                </p>
                <p className="text-muted-foreground">
                  We may use third-party services for analytics, hosting, or other operational purposes. These 
                  services have their own privacy policies and data handling practices.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe your 
                  child has provided us with personal information, please contact us to have it removed.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date. You are advised to 
                  review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardHeader>
                <CardTitle className="flex items-center">
                  
                  Contact Us
                </CardTitle>
                <CardDescription>
                  If you have any questions about this Privacy Policy, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
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

export default PrivacyPolicy;
