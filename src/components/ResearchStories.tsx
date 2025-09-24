import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BookOpen, Target, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResearchStory {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'planning' | 'active' | 'analysis' | 'completed';
  tags: string[];
  insights: string[];
  nextSteps: string[];
}

const researchStories: ResearchStory[] = [
  {
    id: '1',
    title: 'User Experience Optimization',
    description: 'Onderzoek naar gebruikersgedrag en interface-optimalisatie voor betere conversie.',
    progress: 75,
    status: 'analysis',
    tags: ['UX', 'Conversie', 'A/B Testing'],
    insights: [
      'Gebruikers verlaten de site vooral bij de checkout stap',
      'Mobile gebruikers hebben 40% lagere conversie',
      'Zoekfunctie wordt door 60% van bezoekers gebruikt'
    ],
    nextSteps: [
      'Checkout proces vereenvoudigen',
      'Mobile-first redesign implementeren',
      'Zoekresultaten verbeteren'
    ]
  },
  {
    id: '2',
    title: 'Market Research Q1 2024',
    description: 'Marktanalyse van concurrenten en identificatie van nieuwe kansen.',
    progress: 45,
    status: 'active',
    tags: ['Marktonderzoek', 'Concurrentie', 'Strategie'],
    insights: [
      'Nieuwe speler in de markt met innovatieve aanpak',
      'Prijsgevoeligheid neemt toe bij doelgroep',
      'Duurzaamheid wordt belangrijker criterium'
    ],
    nextSteps: [
      'Diepte-interviews met klanten plannen',
      'Prijsstrategie heroverwegen',
      'Duurzaamheidsinitiatieven ontwikkelen'
    ]
  },
  {
    id: '3',
    title: 'Customer Journey Mapping',
    description: 'In kaart brengen van de complete klantervaring van awareness tot loyaliteit.',
    progress: 90,
    status: 'completed',
    tags: ['Customer Journey', 'Touchpoints', 'Experience'],
    insights: [
      'Klanten hebben gemiddeld 7 touchpoints voor aankoop',
      'Social media speelt cruciale rol in awareness fase',
      'After-sales service bepaalt klantloyaliteit'
    ],
    nextSteps: [
      'Implementatie van verbeteringen starten',
      'KPI dashboard opzetten',
      'Team training organiseren'
    ]
  }
];

const getStatusColor = (status: ResearchStory['status']) => {
  switch (status) {
    case 'planning': return 'secondary';
    case 'active': return 'normal';
    case 'analysis': return 'important';
    case 'completed': return 'default';
    default: return 'secondary';
  }
};

const getStatusText = (status: ResearchStory['status']) => {
  switch (status) {
    case 'planning': return 'Planning';
    case 'active': return 'Actief';
    case 'analysis': return 'Analyse';
    case 'completed': return 'Afgerond';
    default: return 'Onbekend';
  }
};

export const ResearchStories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<string>('1');

  const currentStory = researchStories.find(story => story.id === selectedStory);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Research Stories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedStory} onValueChange={setSelectedStory}>
          <TabsList className="grid w-full grid-cols-3">
            {researchStories.map((story) => (
              <TabsTrigger key={story.id} value={story.id} className="text-xs">
                {story.title.split(' ').slice(0, 2).join(' ')}
              </TabsTrigger>
            ))}
          </TabsList>

          {researchStories.map((story) => (
            <TabsContent key={story.id} value={story.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Story Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{story.title}</h3>
                    <Badge variant={getStatusColor(story.status)}>
                      {getStatusText(story.status)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{story.description}</p>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Voortgang</span>
                      <span>{story.progress}%</span>
                    </div>
                    <Progress value={story.progress} className="h-2" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Insights & Next Steps */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Insights */}
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Key Insights
                    </h4>
                    <div className="space-y-2">
                      {story.insights.map((insight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg"
                        >
                          <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{insight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Volgende Stappen
                    </h4>
                    <div className="space-y-2">
                      {story.nextSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 p-3 bg-green-50 rounded-lg"
                        >
                          <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center text-xs font-medium text-green-800 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};