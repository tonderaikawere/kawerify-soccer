import { Cookie, Settings, Shield, Eye, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <Cookie className="h-16 w-16 text-orange-600 mr-4" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how Kawerify Tech Tournaments uses cookies and similar technologies to enhance your experience.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Important Notice */}
            <Alert>
              <Cookie className="h-4 w-4" />
              <AlertDescription>
                By continuing to use our website, you consent to our use of cookies as described in this policy.
              </AlertDescription>
            </Alert>

            {/* What Are Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-6 w-6 mr-2 text-blue-500" />
                  What Are Cookies?
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-6 w-6 mr-2 text-green-500" />
                  Types of Cookies We Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Essential Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Authentication and security cookies</li>
                    <li>Session management cookies</li>
                    <li>Load balancing cookies</li>
                    <li>User interface customization cookies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Functional Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies enable enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Language and region preferences</li>
                    <li>User interface preferences</li>
                    <li>Tournament data storage</li>
                    <li>Player profile settings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-600">Analytics Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Page view tracking</li>
                    <li>User behavior analysis</li>
                    <li>Performance monitoring</li>
                    <li>Error tracking and reporting</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-orange-600">Local Storage</h3>
                  <p className="text-muted-foreground mb-2">
                    We use browser local storage to enhance your tournament experience.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Tournament data and statistics</li>
                    <li>Player profiles and media</li>
                    <li>Match history and results</li>
                    <li>User preferences and settings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-6 w-6 mr-2 text-purple-500" />
                  How We Use Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To provide essential website functionality and security</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To remember your preferences and settings</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To store tournament data locally on your device</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To analyze website usage and improve our services</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>To ensure optimal performance and user experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-red-500" />
                  Managing Your Cookie Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Browser Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete existing cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies (may affect website functionality)</li>
                    <li>Set preferences for third-party cookies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Local Storage</h3>
                  <p className="text-muted-foreground">
                    Our tournament platform primarily uses local storage to keep your data on your device. 
                    You can clear this data through your browser's developer tools or by using our data 
                    export/clear functions in the admin panel.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Impact of Disabling Cookies</h3>
                  <p className="text-muted-foreground">
                    Please note that disabling cookies may affect the functionality of our website. Some 
                    features may not work properly, and you may need to re-enter information each time 
                    you visit.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may use third-party services that set their own cookies. These services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Analytics providers for website usage statistics</li>
                  <li>Content delivery networks for improved performance</li>
                  <li>Security services for protection against threats</li>
                  <li>Social media platforms for sharing functionality</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  These third parties have their own privacy policies and cookie practices, which we 
                  encourage you to review.
                </p>
              </CardContent>
            </Card>

            {/* Updates to Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Updates to This Cookie Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any 
                  material changes by posting the updated policy on our website.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cookie className="h-6 w-6 mr-2 text-orange-500" />
                  Questions About Cookies?
                </CardTitle>
                <CardDescription>
                  If you have any questions about our use of cookies, please contact us:
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

export default CookiePolicy;
