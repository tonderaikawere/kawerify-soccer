import { AlertTriangle, Shield, Info, Scale, FileText, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-red-600 mr-4" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Disclaimer
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Important information about the use of Kawerify Tech Tournaments platform and limitations of liability.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Important Notice */}
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                Please read this disclaimer carefully before using our services. Your use of the platform constitutes acceptance of these terms.
              </AlertDescription>
            </Alert>

            {/* General Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-6 w-6 mr-2 text-blue-500" />
                  General Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-green-500" />
                  Tournament and Gaming Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Fair Play and Competition</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Tournament results are based on player-reported scores and may not reflect actual gameplay</li>
                    <li>We do not guarantee the accuracy of match results or player statistics</li>
                    <li>Disputes between players must be resolved independently</li>
                    <li>We reserve the right to modify tournament rules and formats at any time</li>
                    <li>Participation in tournaments is voluntary and at your own risk</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technical Limitations</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Platform availability may be interrupted due to maintenance or technical issues</li>
                    <li>Data stored locally may be lost due to browser issues or device problems</li>
                    <li>We do not guarantee backup or recovery of tournament data</li>
                    <li>System performance may vary based on device and internet connection</li>
                    <li>Features may be added, modified, or removed without prior notice</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">User Responsibility</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-purple-500" />
                  Data and Privacy Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Local Data Storage</h3>
                  <p className="text-muted-foreground">
                    Our platform primarily uses local browser storage to maintain tournament data. While this 
                    provides privacy benefits, it also means that data may be lost if browser data is cleared, 
                    devices are replaced, or technical issues occur. We strongly recommend regular data exports 
                    for backup purposes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">User-Generated Content</h3>
                  <p className="text-muted-foreground">
                    Users may upload images, videos, and other content to the platform. We do not monitor or 
                    verify the accuracy, appropriateness, or legality of user-generated content. Users are 
                    solely responsible for the content they upload and must ensure they have proper rights 
                    and permissions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Third-Party Content</h3>
                  <p className="text-muted-foreground">
                    Our platform may contain references to third-party games, teams, or other content. We do 
                    not endorse or take responsibility for third-party content, and such references are for 
                    informational purposes only.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Service Availability and Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  While we strive to provide reliable service, we cannot guarantee continuous availability 
                  of the platform. The service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical difficulties or server issues</li>
                  <li>Internet connectivity problems</li>
                  <li>Force majeure events beyond our control</li>
                  <li>Security incidents or necessary protective measures</li>
                </ul>
                <p className="text-muted-foreground">
                  We will make reasonable efforts to minimize service disruptions but cannot be held liable 
                  for any inconvenience or losses resulting from service unavailability.
                </p>
              </CardContent>
            </Card>

            {/* Legal Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="h-6 w-6 mr-2 text-yellow-500" />
                  Legal Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">No Legal Advice</h3>
                  <p className="text-muted-foreground">
                    Nothing on this platform constitutes legal advice. Users should consult with qualified 
                    legal professionals for any legal questions or concerns related to gaming, competitions, 
                    or intellectual property matters.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Jurisdiction and Governing Law</h3>
                  <p className="text-muted-foreground">
                    This disclaimer is governed by the laws of Zimbabwe. Any disputes arising from the use 
                    of this platform will be subject to the exclusive jurisdiction of Zimbabwean courts.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    To the fullest extent permitted by law, Kawerify Tech shall not be liable for any direct, 
                    indirect, incidental, special, consequential, or punitive damages arising from your use 
                    of the platform, even if we have been advised of the possibility of such damages.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Age Restrictions */}
            <Card>
              <CardHeader>
                <CardTitle>Age Restrictions and Parental Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Our platform is designed for users of all ages, but we recommend parental guidance for 
                  users under 13 years of age. Parents and guardians should:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Monitor their children's use of the platform</li>
                  <li>Ensure appropriate gaming time limits</li>
                  <li>Review any content uploaded by their children</li>
                  <li>Understand the competitive nature of tournaments</li>
                  <li>Be aware of any costs associated with gaming</li>
                </ul>
              </CardContent>
            </Card>

            {/* Changes to Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right to modify this disclaimer at any time without prior notice. Changes 
                  will be effective immediately upon posting on our website. Your continued use of the 
                  platform after any changes constitutes acceptance of the updated disclaimer.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-6 w-6 mr-2 text-red-500" />
                  Questions or Concerns?
                </CardTitle>
                <CardDescription>
                  If you have any questions about this disclaimer, please contact us:
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

export default Disclaimer;
