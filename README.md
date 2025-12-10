# Digital Psycholinguistics Workbook - Frontend

A comprehensive digital workbook application designed for Master's degree students in English Language Teaching (ELT) and Applied Linguistics programs. This interactive platform provides structured psycholinguistic tasks to help students understand and explore cognitive aspects of language processing, including working memory, processing speed, noticing, and reflective practice.

## 🎓 About This Project

This application serves as a practical learning tool for linguistics students to:
- Explore working memory's role in language processing through interactive tasks
- Measure and understand language processing speed with real-time reaction time tracking
- Develop awareness of linguistic forms and patterns through noticing activities
- Engage in reflective practice to consolidate learning experiences
- Track progress and analyze performance across multiple psycholinguistic modules

**Target Audience:** Master's degree students in ELT (English Language Teaching), Applied Linguistics, and related fields studying psycholinguistics and second language acquisition.

## 🔗 Backend Repository

This frontend application requires the backend API to function properly:
- **Backend Repository:** [https://github.com/bobys16/linguistic-be](https://github.com/bobys16/linguistic-be)
- Make sure to set up and run the backend server before using this frontend application

## ✨ Features

### Psycholinguistic Task Modules

#### 1. **Working Memory Module**
- **Digit Span Task:** Remember and recall sequences of digits
- **Reading Span Task:** Read sentences and recall the last word of each

#### 2. **Processing Speed Module**
- **Lexical Decision Task:** Quickly identify real vs. non-words with reaction time tracking
- **Sentence Verification Task:** Rapidly determine if sentences are true or false

#### 3. **Noticing Module**
- **Form-Meaning Mapping:** Match grammatical forms with their meanings/functions
- **Error Correction:** Identify and correct grammatical errors in sentences

#### 4. **Reflective Practice Module**
- **Guided Reflection:** Structured reflection prompts on module performance
- **Free Reflection:** Open-ended journaling for learning experiences
- **Reflection Journal:** Track and review all reflections with tags

### Additional Features
- 📊 **Progress Tracking:** Monitor completion rates, accuracy scores, and performance metrics
- 🎯 **Performance Analytics:** View detailed statistics for each module and task
- 📈 **Dashboard:** Visualize learning progress with comprehensive statistics
- 🔐 **User Authentication:** Secure login and registration system
- 💾 **Data Persistence:** All attempts and reflections are saved for future review
- 📱 **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Backend API** running (see [linguistic-be](https://github.com/bobys16/linguistic-be))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bobys16/linguistic-fe.git
   cd linguistic-fe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   NEXT_PUBLIC_API_TIMEOUT=10000
   NEXT_PUBLIC_ENV=development
   ```

4. **Make sure the backend is running:**
   
   Follow the setup instructions at [https://github.com/bobys16/linguistic-be](https://github.com/bobys16/linguistic-be)

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### First-Time Usage

**Demo Account:**
- Email: `demo@example.com`
- Password: `password123`

Or create your own account by clicking "Sign Up" in the navigation.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **UI Styling:** Tailwind CSS
- **State Management:** React Context API
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Authentication:** JWT with cookie-based storage

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # User dashboard with progress overview
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── modules/           # Module listing and detail pages
│   ├── tasks/             # Task execution pages
│   └── journal/           # Reflection journal
├── components/            # React components
│   ├── tasks/            # Task-specific components
│   ├── ui/               # Reusable UI components
│   └── layout/           # Layout components (Navbar, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
│   ├── apiClient.ts      # Axios API client
│   ├── auth.ts           # Authentication utilities
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Helper functions
├── context/               # React context providers
└── middleware.ts          # Next.js middleware for route protection
```

## 📚 Documentation

For more detailed documentation, see:
- [START_HERE.md](START_HERE.md) - New user onboarding guide
- [QUICKSTART.md](QUICKSTART.md) - Quick setup instructions
- [API_EXAMPLES.md](API_EXAMPLES.md) - API integration examples
- [FILE_STRUCTURE.md](FILE_STRUCTURE.md) - Detailed project structure
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions

## 🔧 Development

### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

### Code Quality

```bash
# Run linting
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

This project is part of an academic program for Master's degree studies in ELT and Applied Linguistics.

## 🐛 Issues & Support

If you encounter any issues or have questions, please open an issue on GitHub:
- Frontend Issues: [https://github.com/bobys16/linguistic-fe/issues](https://github.com/bobys16/linguistic-fe/issues)
- Backend Issues: [https://github.com/bobys16/linguistic-be/issues](https://github.com/bobys16/linguistic-be/issues)

## Author

**Bondan Charisnanda**  
Master's degree student in English Language Teaching

## 🙏 Acknowledgments

Designed for educational purposes in psycholinguistics and second language acquisition courses for Master's degree programs in ELT and Applied Linguistics.
