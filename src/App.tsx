import React from 'react';
import { User, MapPin, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { DeadlinesBoard } from './components/DeadlinesBoard';
import { ResearchStories } from './components/ResearchStories';
import { ChatDock } from './components/ChatDock';
import { motion } from 'framer-motion';

function App() {
  // Check if chatbot is enabled
  const isChatbotEnabled = !!(import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_ASSISTANT_ID);

  const skills = [
    { name: 'React & TypeScript', level: 90 },
    { name: 'UX Research', level: 85 },
    { name: 'Data Analysis', level: 80 },
    { name: 'Project Management', level: 75 },
    { name: 'Design Thinking', level: 85 },
    { name: 'Python', level: 70 }
  ];

  const projects = [
    {
      title: 'E-commerce Platform Redesign',
      description: 'Complete UX overhaul resulting in 40% increase in conversion rate',
      status: 'Completed',
      tags: ['UX Design', 'A/B Testing', 'Analytics']
    },
    {
      title: 'Mobile App User Research',
      description: 'Comprehensive user research for fintech mobile application',
      status: 'In Progress',
      tags: ['User Research', 'Mobile', 'Fintech']
    },
    {
      title: 'Dashboard Analytics Tool',
      description: 'React-based analytics dashboard for business intelligence',
      status: 'Planning',
      tags: ['React', 'Data Viz', 'TypeScript']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/bram.jpg" 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`;
                }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bram van der Meer</h1>
                <p className="text-lg text-gray-600">UX Researcher & Frontend Developer</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Amsterdam, Nederland
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    bram@example.com
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
                <Linkedin className="w-5 h-5 text-blue-600" />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Over Mij</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base leading-relaxed text-gray-700">
                    Gepassioneerde UX researcher en frontend developer met 5+ jaar ervaring 
                    in het creëren van gebruiksvriendelijke digitale ervaringen. Specialist 
                    in gebruikersonderzoek, data-analyse en moderne web technologieën.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">UX Research</Badge>
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Data Analysis</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Vaardigheden</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Recente Projecten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{project.title}</h4>
                        <Badge 
                          variant={project.status === 'Completed' ? 'default' : 
                                 project.status === 'In Progress' ? 'normal' : 'secondary'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Research Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ResearchStories />
            </motion.div>

            {/* Deadlines Board */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DeadlinesBoard />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Chat Dock */}
      <ChatDock isEnabled={isChatbotEnabled} />

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white !important;
          }
          
          .bg-gradient-to-br {
            background: white !important;
          }
          
          .shadow-lg, .shadow-sm {
            box-shadow: none !important;
          }
          
          .backdrop-blur-sm {
            backdrop-filter: none !important;
          }
          
          .bg-white\/80 {
            background: white !important;
          }
          
          .sticky {
            position: static !important;
          }
          
          .fixed {
            position: static !important;
          }
          
          .grid {
            display: block !important;
          }
          
          .lg\\:col-span-1, .lg\\:col-span-2 {
            width: 100% !important;
            margin-bottom: 2rem;
          }
          
          .space-y-8 > * + * {
            margin-top: 1rem !important;
          }
          
          .space-y-6 > * + * {
            margin-top: 1rem !important;
          }
          
          .text-3xl {
            font-size: 1.5rem !important;
          }
          
          .text-2xl {
            font-size: 1.25rem !important;
          }
          
          .text-xl {
            font-size: 1.125rem !important;
          }
          
          .p-8, .p-6 {
            padding: 1rem !important;
          }
          
          .py-8, .py-6 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          
          .px-4 {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          
          .gap-8, .gap-6 {
            gap: 1rem !important;
          }
          
          .rounded-lg, .rounded-full {
            border-radius: 0.25rem !important;
          }
          
          .border {
            border: 1px solid #e5e7eb !important;
          }
          
          .bg-blue-50, .bg-indigo-50, .bg-purple-50, .bg-gray-50 {
            background-color: #f9fafb !important;
          }
          
          .text-blue-600, .text-indigo-600, .text-purple-600 {
            color: #374151 !important;
          }
          
          .bg-blue-100, .bg-indigo-100, .bg-purple-100 {
            background-color: #f3f4f6 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;