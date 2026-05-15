import helderPhoto from '../../Profile photos Helder.jpg';
import shayanPhoto from '../../Profile photos Shayan.jpg';

export interface InstructorData {
  photo: string;
  nickname: string;
  name: string;
  role: string;
  highlights: string[];
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
    'Background in Information Systems Security and Engineering',
    'PhD in Blockchain Technology and unforeseen consequences',
    'Blockchain Engineer at Bitcoin ATM startup',
    'Senior Smart Contract Security Engineer',
    'CTO at a publicly traded company',
  ],
};
