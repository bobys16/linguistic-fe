// Landing Page
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const features = [
    {
      title: 'Working Memory',
      description: 'Explore cognitive processes through interactive digit span and reading span tasks.',
      icon: '🧠',
    },
    {
      title: 'Processing Speed',
      description: 'Test your lexical decision making and sentence verification abilities.',
      icon: '⚡',
    },
    {
      title: 'Noticing',
      description: 'Develop awareness through error correction and form-meaning mapping exercises.',
      icon: '👁️',
    },
    {
      title: 'Reflection',
      description: 'Build metacognitive skills through guided and free reflection activities.',
      icon: '💭',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Digital Psycholinguistics Workbook
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            An interactive platform designed for English Language Teaching students to explore
            psycholinguistic concepts through hands-on activities and reflective practice.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Key Psycholinguistic Concepts
            </h2>
            <p className="text-lg text-gray-600">
              Engage with interactive modules designed to enhance your understanding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover>
                <div className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Choose a Module
              </h3>
              <p className="text-gray-600">
                Select from various psycholinguistic topics aligned with your coursework
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Complete Tasks
              </h3>
              <p className="text-gray-600">
                Engage with interactive exercises and receive immediate feedback
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Reflect & Grow
              </h3>
              <p className="text-gray-600">
                Track your progress and reflect on your learning journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Begin Your Learning Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join students exploring the fascinating intersection of psychology and language
          </p>
          <Link href="/register">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Digital Psycholinguistics Workbook. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
