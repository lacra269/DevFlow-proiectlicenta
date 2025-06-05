"use client"; 

import { useState } from "react";

const faqData = [
  {
    question: "Prin ce se diferențiază DEVFLOW de platforme precum GitHub sau GitLab?", 
    answer:
      "În timp ce platforme precum GitHub excelează la găzduirea codului și controlul versiunilor, DEVFLOW integrează aceste aspecte cu instrumente robuste de management de proiect, funcționalități avansate de prezentare a portofoliilor și zone dedicate comunității, având ca scop furnizarea unui spațiu de lucru mai holistic pentru developeri.", 
  },
  {
    question: "Ce limbaje de programare și framework-uri sunt suportate pentru proiecte?",
    answer:
      "DEVFLOW este agnostic din punct de vedere al limbajului! Poți prezenta proiecte construite cu practic orice stivă tehnologică. Pur și simplu adaugă un link către repository-ul tău sau descrie proiectul, adaugă etichete relevante pentru limbaje și framework-uri și lasă comunitatea să-ți descopere munca.", 
  },
  {
    question: "Pot importa proiectele mele existente de pe alte platforme?", 
    answer:
      "Da! Oferim integrare fluidă pentru a lega repository-urile tale existente de pe GitHub, GitLab, Bitbucket și altele. În multe cazuri, DEVFLOW poate prelua automat detalii cheie ale proiectului, cum ar fi descrierea și limbajul principal utilizat.", 
  },
  {
    question: "Cum este gestionată vizibilitatea proiectelor (de ex., public vs. privat)?", 
    answer:
      "Ai control total. Proiectele din planul nostru gratuit sunt de obicei publice, făcându-le vizibile pe profilul tău și descoperibile de către comunitate. Planurile noastre premium deblochează abilitatea de a crea proiecte private, accesibile doar ție și colaboratorilor invitați.", 
  },
  {
    question: "Există limite privind colaborarea în planul gratuit?", 
    answer:
      "Planul gratuit este conceput pentru developeri individuali și colaborări mici. Îți permite să inviți un număr limitat de colaboratori (de ex., până la 3 per proiect) la proiectele tale publice. Pentru echipe mai mari sau nevoi de colaborare privată, planurile noastre premium oferă limite extinse.", 
  },
  {
    question: "Cum pot obține feedback pentru proiectele mele în cadrul DEVFLOW?", 
    answer:
      "Interacționează cu comunitatea! Împărtășește-ți proiectele publice și solicită feedback direct pe pagina proiectului prin comentarii. Poți, de asemenea, să postezi linkuri către proiectul tău în forumurile comunității DEVFLOW relevante sau în grupurile de discuții pentru a obține păreri de la alți developeri.", 
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); 
    } else {
      setOpenIndex(index); 
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">FAQ</h1>
      <div className="max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div
              className="p-5 cursor-pointer border-b border-gray-200 bg-gray-50"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{item.question}</h2>
            </div>
            {openIndex === index && (
              <div className="p-5 bg-gray-100">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
