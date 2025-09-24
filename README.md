# Personal Dashboard - Bram van der Meer

+Een moderne, interactieve personal dashboard gebouwd met React, TypeScript en Tailwind CSS. Bevat research stories, deadline management en een AI-powered chatbot.

+## ✨ Features

+- **📊 Research Stories**: Tabbed interface met onderzoeksprojecten, voortgang en insights
+- **📅 Deadlines Board**: Volledig functioneel deadline management systeem
+- **🤖 AI Chatbot**: Floating chat interface met OpenAI Assistant integratie
+- **📱 Responsive Design**: Optimaal voor desktop, tablet en mobile
+- **🎨 Modern UI**: Calm blue/indigo palette met subtiele gradients
+- **📄 Print-friendly**: Geoptimaliseerd voor het printen van secties
+- **⚡ Smooth Animations**: Framer Motion animaties voor betere UX

+## 🚀 Quick Start

+### Installatie
+```bash
+npm install
+npm run dev
+```

+### Development
+```bash
+npm run dev          # Start development server
+npm run build        # Build for production  
+npm run preview      # Preview production build
+npm run lint         # Run ESLint
+```

+## 📝 Configuratie Gids

+### 1. Profielfoto Vervangen
+Vervang `/public/bram.jpg` met je eigen foto:
+- **Aanbevolen formaat**: 150x150px of groter
+- **Aspect ratio**: Vierkant (1:1)
+- **Bestandsformaten**: JPG, PNG, WebP
+- **Bestandsnaam**: Behoud `bram.jpg` of update de referentie in `App.tsx`

+### 2. Content Bewerken
+Alle content staat in markdown bestanden in `/content/`:

+#### `/content/about.md`
+- Persoonlijke informatie
+- Achtergrond en expertise
+- Contact gegevens
+- Missie statement

+#### `/content/research-focus.md`
+- Huidige onderzoeksfocus
+- Methodieken en doelstellingen
+- Timeline en deliverables
+- Stakeholder informatie

+### 3. Data Persistentie
+
+#### Deadlines
+- **Opslag**: localStorage onder key `'deadlines-board'`
+- **Reset**: Open browser DevTools → Application → Local Storage → verwijder key
+- **Backup**: Data wordt automatisch opgeslagen bij elke wijziging

+#### Skills & Projecten
+- **Locatie**: Hardcoded in `App.tsx` 
+- **Aanpassen**: Bewerk de `skills` en `projects` arrays in de component
+- **Percentages**: Worden gebruikt voor Progress bars

+### 4. Chatbot Configuratie
+
+#### Vereisten
+1. OpenAI API account met credits
+2. Een geconfigureerde OpenAI Assistant
+
+#### Setup Stappen
+1. **Maak `.env.local` bestand** in project root:
+```env
+VITE_OPENAI_API_KEY=sk-your-api-key-here
+VITE_OPENAI_ASSISTANT_ID=asst_your-assistant-id-here
+```

+2. **OpenAI Assistant maken**:
+   - Ga naar [OpenAI Platform](https://platform.openai.com/assistants)
+   - Klik "Create Assistant"
+   - Configureer naam, instructies en model
+   - Kopieer de Assistant ID

+3. **API Key verkrijgen**:
+   - Ga naar [API Keys](https://platform.openai.com/api-keys)
+   - Klik "Create new secret key"
+   - Kopieer de key (bewaar veilig!)

+4. **Herstart development server**:
+```bash
+npm run dev
+```

+#### Chatbot Features
+- **Persistent conversations**: ThreadID wordt opgeslagen in localStorage
+- **File uploads**: Ondersteunt .pdf, .docx, .md, .txt bestanden
+- **Real-time responses**: Streaming responses van OpenAI
+- **Error handling**: Graceful fallbacks bij API problemen

+#### Troubleshooting
+- **Chatbot knop grijs**: Controleer of beide environment variables zijn ingesteld
+- **API errors**: Controleer API key geldigheid en credits
+- **File upload fails**: Controleer bestandsformaat en grootte (<20MB)

+## 🎨 Styling & Theming

+### Color Palette
+- **Primary**: Blue/Indigo tones (#3B82F6, #6366F1)
+- **Secondary**: Neutral grays (#6B7280, #9CA3AF)
+- **Accents**: Success green, Warning orange, Error red
+- **Background**: Subtle gradients (blue-50 → indigo-50 → purple-50)

+### Typography Scale
+- **H1**: 3xl (1.875rem) - Page title
+- **H2**: 2xl (1.5rem) - Section headers  
+- **H3**: xl (1.25rem) - Card titles
+- **Body**: base (1rem) with leading-relaxed

+### Components
+Gebruikt shadcn/ui componenten:
+- `Card`, `CardHeader`, `CardTitle`, `CardContent`
+- `Button`, `Input`, `Textarea`
+- `Badge`, `Progress`, `Dialog`
+- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

+## 📱 Responsive Breakpoints
+- **Mobile**: < 768px
+- **Tablet**: 768px - 1024px  
+- **Desktop**: > 1024px

+Layout past automatisch aan met CSS Grid en Flexbox.

+## 🖨️ Print Styling
+Geoptimaliseerd voor printen:
+- Verwijdert achtergrond gradients
+- Vereenvoudigt shadows en effects
+- Maakt layout single-column
+- Verbergt interactieve elementen
+- Optimaliseert font sizes

+## 🔧 Tech Stack
+- **Framework**: React 18 + TypeScript
+- **Styling**: Tailwind CSS
+- **UI Components**: Radix UI + shadcn/ui
+- **Animations**: Framer Motion
+- **Icons**: Lucide React
+- **Date Handling**: date-fns
+- **Build Tool**: Vite
+- **Linting**: ESLint + TypeScript ESLint

+## 📦 Project Structure
+```
+src/
+├── components/
+│   ├── ui/              # shadcn/ui components
+│   ├── DeadlinesBoard.tsx
+│   ├── ResearchStories.tsx
+│   └── ChatDock.tsx
+├── lib/
+│   └── utils.ts         # Utility functions
+├── App.tsx              # Main application
+└── main.tsx            # Entry point
+
+content/                 # Markdown content
+├── about.md
+└── research-focus.md
+
+public/
+└── bram.jpg            # Profile photo
+```

+## 🤝 Contributing
+1. Fork het project
+2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
+3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
+4. Push naar de branch (`git push origin feature/AmazingFeature`)
+5. Open een Pull Request

+## 📄 License
+Dit project is gelicenseerd onder de MIT License.

+## 🆘 Support
+Voor vragen of problemen:
+- Open een [GitHub Issue](https://github.com/username/repo/issues)
+- Email: bram@example.com
+- LinkedIn: [Bram van der Meer](https://linkedin.com/in/bramvandermeer)