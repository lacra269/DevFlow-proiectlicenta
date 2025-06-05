'use client'; // Marcare componentă clientă
import Link from 'next/link';
// Importează iconițe
import { BookOpen, ArrowRight } from 'lucide-react';

// Lista de ghiduri/discuții (păstrăm datele existente)
const trendingGuides = [
  { 
    id: 1, 
    title: "7 Cărți Tehnice Obligatorii pentru Developeri Experți și Lideri în 2025", // Tradus
    description: "Un ghid rapid pentru a începe " // Tradus
  },
  { 
    id: 2, 
    title: "Nou Cadru Web: Gland - Arhitectură Bazată pe Evenimente", // Tradus
    description: "Un ghid cuprinzător " // Tradus
  },
  { 
    id: 3, 
    title: "Introducere în Accesibilitatea Web", // Tradus
    description: "De ce contează accesibilitatea web și cum să o îmbunătățești." // Tradus
  },
  // Poți adăuga mai multe aici...
];

export default function Discuss() {
  return (
    // Card principal - redus padding (p-4), umbra (shadow-sm)
    <div className="p-4 bg-white shadow-sm rounded-lg border border-gray-100">
      {/* Titlu secțiune - redus dimensiune text (text-lg) și margine inferioară (mb-4) */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Ghiduri & Resurse Populare</h2>

      {/* Lista de ghiduri/discuții - redus spațierea (space-y-2) */}
      <ul className="space-y-2">
        {trendingGuides.map((guide, index) => (
          // Element listă - redus padding-ul inferior (pb-2)
          <li key={guide.id} className={`border-gray-100 ${index < trendingGuides.length - 1 ? 'border-b pb-2' : ''}`}>
            {/* Link - redus padding (p-2), spațiere (space-x-3) */}
            <Link
                href={`/discussions/${guide.id}`}
                className="group flex items-start space-x-3 p-2 -m-2 rounded-md hover:bg-gray-50 transition-colors duration-150 ease-in-out" // Schimbat hover:bg-purple-50 în hover:bg-gray-50
            >
                {/* Iconiță - redus dimensiune (h-4 w-4), eliminat mt-1 */}
                <div className="flex-shrink-0 pt-0.5"> {/* Adăugat pt-0.5 pentru aliniere fină */}
                    <BookOpen className="h-4 w-4 text-purple-500 opacity-90 group-hover:text-purple-600 transition-colors" /> {/* Simplificat tranziția */}
                </div>
                {/* Detalii ghid */}
                <div className="flex-1">
                    {/* Titlu - redus dimensiune (text-sm) */}
                    <h3 className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">{guide.title}</h3>
                    {/* Descriere - redus dimensiune (text-xs), margine (mt-0.5) */}
                    <p className="text-xs text-gray-500 mt-0.5">{guide.description}</p>
                </div>
                {/* Iconiță săgeată - redus dimensiune (h-3.5 w-3.5) */}
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out">
                    <ArrowRight className="h-3.5 w-3.5 text-purple-600" />
                </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Buton "Vezi mai mult" (opțional, păstrat comentat) */}
      {/*
      <div className="mt-4 text-center"> // Redus mt-6 la mt-4
          <Link href="/discussions">
              <span className="text-xs font-medium text-purple-600 hover:text-purple-800 hover:underline cursor-pointer"> // Redus text-sm la text-xs
                  Vezi toate discuțiile
              </span>
          </Link>
      </div>
      */}
    </div>
  );
}
