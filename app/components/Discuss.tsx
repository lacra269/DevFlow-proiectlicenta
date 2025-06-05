'use client'; 
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
const trendingGuides = [
  { 
    id: 1, 
    title: "7 Cărți Tehnice Obligatorii pentru Developeri Experți și Lideri în 2025", 
    description: "Un ghid rapid pentru a începe " 
  },
  { 
    id: 2, 
    title: "Nou Cadru Web: Gland - Arhitectură Bazată pe Evenimente", 
    description: "Un ghid cuprinzător " 
  },
  { 
    id: 3, 
    title: "Introducere în Accesibilitatea Web",
    description: "De ce contează accesibilitatea web și cum să o îmbunătățești." 
  },

];

export default function Discuss() {
  return (
    <div className="p-4 bg-white shadow-sm rounded-lg border border-gray-100">
    
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Ghiduri & Resurse Populare</h2>

      <ul className="space-y-2">
        {trendingGuides.map((guide, index) => (
         
          <li key={guide.id} className={`border-gray-100 ${index < trendingGuides.length - 1 ? 'border-b pb-2' : ''}`}>
         
            <Link
                href={`/discussions/${guide.id}`}
                className="group flex items-start space-x-3 p-2 -m-2 rounded-md hover:bg-gray-50 transition-colors duration-150 ease-in-out" 
            >
      
                <div className="flex-shrink-0 pt-0.5"> 
                    <BookOpen className="h-4 w-4 text-purple-500 opacity-90 group-hover:text-purple-600 transition-colors" /> 
                </div>
            
                <div className="flex-1">
                
                    <h3 className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">{guide.title}</h3>
                   
                    <p className="text-xs text-gray-500 mt-0.5">{guide.description}</p>
                </div>
             
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out">
                    <ArrowRight className="h-3.5 w-3.5 text-purple-600" />
                </div>
            </Link>
          </li>
        ))}
      </ul>

  
    </div>
  );
}
