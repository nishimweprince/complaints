import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/containers/navigation/PublicNavbar";
import moment from "moment";

const LandingPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <PublicNavbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="flex flex-col md:flex-row md:justify-between items-center">
            <article className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Voice Matters. Make It Heard.
              </h2>
              <p className="text-xl mb-8">Trusted by Government Agencies:</p>
              <figure className="flex space-x-6">
                {/* Placeholder for company logos */}
                <figure className="w-24 h-8 bg-white/30 rounded"></figure>
                <figure className="w-24 h-8 bg-white/30 rounded"></figure>
                <figure className="w-24 h-8 bg-white/30 rounded"></figure>
              </figure>
            </article>
            <figure className="md:w-1/2">
              {/* Placeholder for hero image */}
              <figure className="bg-white/10 rounded-lg aspect-video"></figure>
            </figure>
          </article>
        </article>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-gray-50">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Empowering Citizen Engagement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A transparent platform connecting citizens with government agencies for effective complaint resolution.
            </p>
          </header>

          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Track Your Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor the status of your complaints in real-time, with transparent updates on resolution progress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Direct Agency Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect directly with relevant government agencies, ensuring your concerns reach the right department.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Multi-language Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Submit complaints in your preferred language, making the system accessible to all citizens.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Data-Driven Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access comprehensive analytics on complaint patterns and agency response times.
                </p>
              </CardContent>
            </Card>
          </article>
        </article>
      </section>

      {/* Visualization Section */}
      <section className="py-16 bg-white pb-4">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="flex flex-col gap-4 justify-between md:flex-row items-center">
            <article className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our platform makes it easy to submit and track complaints while ensuring government agencies respond effectively.
              </p>
              <menu className="space-y-6">
                <li className="flex items-start">
                  <figure className="bg-primary text-white font-bold rounded-full w-8 h-8 p-2 flex items-center justify-center mr-4">
                    01
                  </figure>
                  <p className="text-gray-800 font-medium">
                    Submit Your Complaint: Fill out a simple form with details about your concern.
                  </p>
                </li>
                <li className="flex items-start">
                  <figure className="bg-primary text-white font-bold rounded-full w-8 h-8 p-2 flex items-center justify-center mr-4">
                    02
                  </figure>
                  <p className="text-gray-800 font-medium">
                    Get Confirmation: Receive immediate acknowledgment and a tracking number.
                  </p>
                </li>
                <li className="flex items-start">
                  <figure className="bg-primary text-white font-bold rounded-full w-8 h-8 p-2 flex items-center justify-center mr-4">
                    03
                  </figure>
                  <p className="text-gray-800 font-medium">
                    Track Progress: Monitor your complaint's status through our user-friendly dashboard.
                  </p>
                </li>
                <li className="flex items-start">
                  <figure className="bg-primary text-white font-bold rounded-full w-8 h-8 p-2 flex items-center justify-center mr-4">
                    04
                  </figure>
                  <p className="text-gray-800 font-medium">
                    Receive Resolution: Get notified when your complaint is addressed by the relevant agency.
                  </p>
                </li>
              </menu>
              <aside className="mt-10">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Discover More
                </Button>
              </aside>
            </article>
            <figure className="md:w-1/2">
              {/* Placeholder for data visualization image */}
              <figure className="bg-gray-200 rounded-lg aspect-square"></figure>
            </figure>
          </article>
        </article>
      </section>

      {/* Agencies Section */}
      <section id="agencies" className="py-16 bg-white">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Government Agencies on Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with various government departments committed to addressing citizen concerns
            </p>
          </header>

          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <figure className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </figure>
                  Local Government
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Municipal services, urban planning, and local infrastructure management
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• City Planning Department</li>
                  <li>• Public Works</li>
                  <li>• Municipal Services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <figure className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </figure>
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Educational institutions and academic services management
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Public Schools</li>
                  <li>• Higher Education</li>
                  <li>• Educational Services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <figure className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </figure>
                  Healthcare
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Public health services and medical facilities management
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Public Hospitals</li>
                  <li>• Health Centers</li>
                  <li>• Medical Services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <figure className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </figure>
                  Public Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Law enforcement and emergency services management
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Police Department</li>
                  <li>• Fire Services</li>
                  <li>• Emergency Response</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <figure className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </figure>
                  Housing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Public housing and urban development services
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Public Housing</li>
                  <li>• Urban Development</li>
                  <li>• Property Services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <figure className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </figure>
                  Utilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Public utilities and essential services management
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Water Services</li>
                  <li>• Electricity</li>
                  <li>• Public Transport</li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <aside className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              More agencies are joining our platform to better serve citizens
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              View All Agencies
            </Button>
          </aside>
        </article>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="py-16 bg-gray-50 mb-4">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A citizen-centric approach to government engagement
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              We've built a platform that prioritizes transparency, efficiency, and citizen satisfaction in government-citizen communication.
            </p>
            <aside className="mt-8">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Discover More
              </Button>
            </aside>
          </header>

          <article className="overflow-hidden">
            <nav className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Our Platform</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Real-time complaint tracking</p>
                  <p>Direct agency communication</p>
                  <p>Multi-language support</p>
                  <p>Transparent resolution process</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Traditional Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-600">
                  <p>Manual complaint submission</p>
                  <p>Limited tracking capabilities</p>
                  <p>Language barriers</p>
                  <p>Delayed responses</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Other Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-600">
                  <p>Basic complaint forms</p>
                  <p>No real-time updates</p>
                  <p>Limited agency coverage</p>
                  <p>Poor user experience</p>
                </CardContent>
              </Card>
            </nav>
          </article>
        </article>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 mb-4">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our support team is here to help you navigate the complaint submission process.
            </p>
            <aside className="mt-8">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get in Touch
              </Button>
            </aside>
          </header>
        </article>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <section>
              <h3 className="text-lg font-medium mb-4">Citizen Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Submit Complaint
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Track Status
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    User Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Agency Directory
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Support Center
                  </a>
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-medium mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </section>
          </nav>
          <footer className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {moment().year()} Citizen Complaint & Engagement System. All rights reserved.</p>
            <nav className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </nav>
          </footer>
        </article>
      </footer>
    </main>
  );
};

export default LandingPage;
