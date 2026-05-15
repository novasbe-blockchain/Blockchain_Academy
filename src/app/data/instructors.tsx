import type { ReactNode } from 'react';
import helderPhoto from '../../Profile photos Helder.jpg';
import shayanPhoto from '../../Profile photos Shayan.jpg';

export interface InstructorData {
  photo: string;
  nickname: string;
  name: string;
  role: string;
  highlights: ReactNode[];
  gradient: string;
  accentColor: string;
}

export const helder: InstructorData = {
  photo: helderPhoto,
  nickname: 'The Crypto "Jack of all trades"',
  name: 'Helder SALVADOR',
  role: 'Blockchain Engineer & Teacher',
  gradient: 'from-[#ED1C24] to-[#39B54A]',
  accentColor: '#ED1C24',
  highlights: [
    'Started in blockchain in 2017 / 2018, drawn in by the finance side of things',
    'Now focused on user-centered use cases and real-world adoption',
    'Directed a blockchain master programme in Paris',
    'Explored the full stack — product owner, infrastructure, smart contracts',
    'Won a hackathon prize at Hacking Paris 2025 by Chiliz (Content creation & interaction track)',
    'Currently Blockchain Specialist @ NovaSBE',
  ],
};

export const shayan: InstructorData = {
  photo: shayanPhoto,
  nickname: 'Post Doc at NovaSBE',
  name: 'Shayan Eskandari',
  role: 'Smart Contract Security Engineer',
  gradient: 'from-[#6366f1] to-[#8b5cf6]',
  accentColor: '#6366f1',
  highlights: [
    <div className="flex items-start gap-3">
      <span className="font-bold text-foreground w-24 shrink-0">Background</span>
      <span className="flex-1">Information Systems Security and Engineering</span>
    </div>,
    <div className="flex items-start gap-3">
      <span className="font-bold text-foreground w-24 shrink-0">PhD</span>
      <span className="flex-1">Blockchain Technology and unforeseen consequences</span>
    </div>,
    <div className="flex items-start gap-3">
      <span className="font-bold text-foreground w-24 shrink-0">Roles</span>
      <ul className="flex-1 space-y-1.5">
        {[
          'Blockchain Engineer at Bitcoin ATM startup',
          'Senior Smart Contract Security Engineer',
          'CTO at a publicly traded company',
        ].map(r => (
          <li key={r} className="flex items-start gap-2">
            <span className="mt-1.5 size-1 rounded-full shrink-0" style={{ background: '#6366f1' }} />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>,
  ],
};
