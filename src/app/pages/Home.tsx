import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import logo from '../../blockchainptlogo.jpeg';
import { TeacherCard } from '../components/shared/TeacherCard';
import { helder, shayan } from '../data/instructors';

const instructors = [helder, shayan];

const BASE = '/blockchain-fundamentals';

const sections = [
  {
    number: '🎯',
    title: 'Learning Objectives',
    description: 'What you will learn and be able to do by the end of this course',
    path: `${BASE}/learning-objectives`,
    gradient: 'from-[#ED1C24] to-[#6366f1]'
  },
  {
    number: '🗺️',
    title: 'Course Summary',
    description: 'Your roadmap through blockchain technology — four parts, one coherent journey',
    path: `${BASE}/course-summary`,
    gradient: 'from-[#39B54A] to-[#ED1C24]'
  },
  {
    number: '00',
    title: 'Prologue — The History of Blockchain',
    description: 'From the cypherpunk movement to the birth of Bitcoin',
    path: `${BASE}/prologue`,
    gradient: 'from-[#8b5cf6] to-[#6366f1]'
  },
  {
    number: '01',
    title: 'Introduction to Blockchain Technology',
    description: 'DLT, hashing, Merkle trees, blocks, wallets, transactions, and consensus mechanisms',
    path: `${BASE}/section-1`,
    gradient: 'from-[#ED1C24] to-[#39B54A]'
  },
  {
    number: '02',
    title: 'Bitcoin and Beyond',
    description: 'A deep dive into the world\'s first cryptocurrency and its network',
    path: `${BASE}/section-2`,
    gradient: 'from-[#f59e0b] to-[#ED1C24]'
  },
  {
    number: '03',
    title: 'What\'s Next for Blockchain?',
    description: 'Applications, Web3, ethics, and the future of decentralized technology',
    path: `${BASE}/section-3`,
    gradient: 'from-[#39B54A] to-[#22d3ee]'
  }
];

export function Home() {
  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <div className="min-h-screen snap-start flex items-center justify-center p-12 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(237,28,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(237,28,36,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 size-96 bg-gradient-to-br from-[#ED1C24] to-[#39B54A] opacity-20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gradient-to-br from-[#39B54A] to-[#ED1C24] opacity-20 blur-3xl rounded-full" />
        
        <div className="relative z-10 text-center max-w-5xl">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Blockchain.pt" className="h-36 object-contain" />
          </div>
          
          <p className="text-2xl text-muted-foreground mb-8">
            A comprehensive visual course on blockchain technology
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="px-4 py-2 bg-card rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">6 Parts</span>
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">45+ Slides</span>
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Interactive</span>
            </div>
          </div>
          
          <Link
            to={`${BASE}/learning-objectives`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ED1C24] to-[#39B54A] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#ED1C24]/30 transition-all"
          >
            Start Learning
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
      
      {/* Sections Overview */}
      <div className="min-h-screen snap-start max-w-7xl mx-auto px-12 py-16">
        <h2 className="text-4xl font-bold text-foreground mb-12">Course Sections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.number}
              to={section.path}
              className="group bg-card border border-border rounded-xl p-6 hover:border-[#ED1C24] transition-all hover:shadow-lg hover:shadow-[#ED1C24]/10"
            >
              <div className={`size-12 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold">{section.number}</span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#ED1C24] transition-colors">
                {section.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {section.description}
              </p>
              
              <div className="flex items-center gap-2 text-[#ED1C24] text-sm font-bold">
                Explore
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Meet the Instructors */}
      <div className="min-h-screen snap-start max-w-7xl mx-auto px-12 py-16 border-t border-border">
        <h2 className="text-4xl font-bold text-foreground mb-3">Meet the Instructor{instructors.length > 1 ? 's' : ''}</h2>
        <p className="text-muted-foreground mb-10">The people behind this course</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {instructors.map((instructor) => (
            <TeacherCard key={instructor.name} {...instructor} />
          ))}
        </div>
      </div>

    </div>
  );
}