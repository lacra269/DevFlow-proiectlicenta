 'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Newspaper, Users, Briefcase, ArrowRight, Sparkles, ArrowUp, Code, Palette, MessageSquare } from 'lucide-react'; 
import { TypeAnimation } from 'react-type-animation'; 
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  animationType?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in'; 
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '', delay = 'delay-0', animationType = 'fade-up' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (cardRef.current) observer.unobserve(cardRef.current);
      }
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  const getAnimationClasses = () => {
    const baseTransition = `transition-all duration-700 ease-out ${delay}`;
    if (!isVisible) {
      switch (animationType) {
        case 'fade-up': return `${baseTransition} opacity-0 translate-y-8`;
        case 'fade-in': return `${baseTransition} opacity-0`;
        case 'slide-left': return `${baseTransition} opacity-0 -translate-x-10`;
        case 'slide-right': return `${baseTransition} opacity-0 translate-x-10`;
        case 'zoom-in': return `${baseTransition} opacity-0 scale-90`;
        default: return `${baseTransition} opacity-0 translate-y-8`;
      }
    }
  
    return `${baseTransition} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={cardRef} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};
const DynamicInteractiveHomepageEnhanced: React.FC = () => {
  const primaryColor = 'blue-600';
  const primaryLightBg = 'blue-50';
  const primaryHoverColor = 'blue-700';
  const primaryRingColor = 'blue-300';
  const primaryGlowColor = 'blue-500'; 

  const accentColor = 'pink-500';
  const accentLightBg = 'pink-50';
  const accentHoverColor = 'pink-600';
  const accentRingColor = 'pink-300';
  const accentGlowColor = 'pink-400'; 

  const secondaryAccentColor = 'purple-600';
  const secondaryAccentLightBg = 'purple-50';
  const secondaryAccentGlowColor = 'purple-500';

  const tertiaryColor = 'teal-500'; 
  const tertiaryLightBg = 'teal-50';
  const tertiaryHoverColor = 'teal-600';
  const tertiaryRingColor = 'teal-300';
  const tertiaryGlowColor = 'teal-400';

  const textColor = 'gray-900';
  const secondaryTextColor = 'gray-700';
  const lightBgColor = 'white'; 
  const subtleBgGradientFrom = primaryLightBg;
  const subtleBgGradientVia = accentLightBg;
  const subtleBgGradientTo = secondaryAccentLightBg;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (event.clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); };
  }, []);
  const parallaxFactorSilhouette = 7;
  const silhouetteStyle = {
    transform: `translate(${mousePosition.x * parallaxFactorSilhouette}%, ${mousePosition.y * parallaxFactorSilhouette}%)`,
    transition: 'transform 0.15s ease-out',
  };
  const backgroundStyle = {
      backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
       };

  return (
    <main className={`bg-${lightBgColor}`}> 
      <section className={`relative h-screen min-h-[800px] w-full flex items-center justify-center text-${textColor} overflow-hidden animated-gradient-background`}> 
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className={`absolute -top-20 -left-20 w-72 h-72 bg-${primaryColor}/10 rounded-full filter blur-3xl animate-blob-slow`}></div>
            <div className={`absolute -bottom-20 -right-10 w-80 h-80 bg-${accentColor}/10 rounded-full filter blur-3xl animate-blob-slow animation-delay-2000`}></div>
            <div className={`absolute top-1/3 right-1/4 w-60 h-60 bg-${secondaryAccentColor}/5 rounded-full filter blur-2xl animate-blob-slow animation-delay-4000`}></div>
             <div className={`absolute bottom-1/4 left-1/4 w-52 h-52 bg-${tertiaryColor}/5 rounded-full filter blur-2xl animate-blob-slow animation-delay-6000`}></div> 
        </div>

        <div className="absolute inset-0 z-10 opacity-40"> 
          <div className="absolute inset-0 bg-cover bg-center animate-kenburns-static opacity-100" style={backgroundStyle}></div> 
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={silhouetteStyle}>
          <svg className="w-[85%] h-[85%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-[50%] text-gray-400 opacity-25" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M100 5C73.49 5 52 26.49 52 53V68H45C36.716 68 30 74.716 30 83V137C30 145.284 36.716 152 45 152H60V185C60 190.523 64.477 195 70 195H130C135.523 195 140 190.523 140 185V152H155C163.284 152 170 145.284 170 137V83C170 74.716 163.284 68 155 68H148V53C148 26.49 126.51 5 100 5ZM100 25C115.464 25 128 37.536 128 53V68H72V53C72 37.536 84.536 25 100 25ZM150 88H130V132H150V88ZM70 88H50V132H70V88Z"/>
          </svg>
        </div>

        <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-${textColor} text-shadow-light animate-fade-in-slow`}>
              Conectează-te.&nbsp; 
            <TypeAnimation
              sequence={[
                'Creează.',
                2000, 
                'Colaborează.',
                2000, 
                 'Inovează.', 
                 2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className={`animated-gradient-text bg-gradient-to-r from-${accentColor} via-${secondaryAccentColor} to-${primaryColor}`}
            />
          </h1>
          <p className={`text-xl md:text-2xl text-${secondaryTextColor} max-w-4xl mx-auto mb-10 text-shadow-light-sm animate-fade-in-slow delay-200`}>
              DevFlow este ecosistemul vibrant unde pasiunea pentru cod întâlnește oportunitatea. Descoperă articole, găsește colaboratori sau lansează proiectul tău în comunitate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-6 mb-16 animate-fade-in-slow delay-400">
            <Link
              href="/blog"
              className={`animated-button-secondary px-8 py-4 text-lg font-semibold bg-${accentLightBg} text-${accentColor} border-2 border-${accentColor} rounded-lg hover:bg-pink-100 hover:border-${accentHoverColor} hover:text-${accentHoverColor} transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-${accentGlowColor}/50 focus:outline-none focus:ring-4 focus:ring-${accentRingColor} w-full sm:w-auto`}
            >
              <span>Explorează Blogul</span>
            </Link>
            <Link
              href="/freelancers"
              className={`animated-button-secondary px-8 py-4 text-lg font-semibold bg-${accentLightBg} text-${accentColor} border-2 border-${accentColor} rounded-lg hover:bg-pink-100 hover:border-${accentHoverColor} hover:text-${accentHoverColor} transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-${accentGlowColor}/50 focus:outline-none focus:ring-4 focus:ring-${accentRingColor} w-full sm:w-auto`}
            >
               <span>Găsește Freelanceri</span>
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-10 md:space-x-16 animate-fade-in-slow delay-600">
               <div title="Blog & Articole Tehnice" className="icon-feature-group flex flex-col items-center text-center group cursor-pointer transform transition-transform hover:-translate-y-1.5">
                   <Newspaper className={`w-10 h-10 text-${secondaryTextColor} group-hover:text-${primaryColor} transition-colors duration-300 mb-2 group-hover:animate-pulse-fast`}/>
                 <span className={`text-sm font-medium text-${secondaryTextColor} group-hover:text-${textColor} transition-colors duration-300`}>Blog</span>
               </div>
                <div title="Freelanceri Experți IT" className="icon-feature-group flex flex-col items-center text-center group cursor-pointer transform transition-transform hover:-translate-y-1.5">
                    <Users className={`w-10 h-10 text-${secondaryTextColor} group-hover:text-${accentColor} transition-colors duration-300 mb-2 group-hover:animate-pulse-fast`}/> 
                  <span className={`text-sm font-medium text-${secondaryTextColor} group-hover:text-${textColor} transition-colors duration-300`}>Freelanceri</span>
                </div>
                 <div title="Proiecte & Colaborări" className="icon-feature-group flex flex-col items-center text-center group cursor-pointer transform transition-transform hover:-translate-y-1.5">
                    <Briefcase className={`w-10 h-10 text-${secondaryTextColor} group-hover:text-${tertiaryColor} transition-colors duration-300 mb-2 group-hover:animate-pulse-fast`}/> 
                  <span className={`text-sm font-medium text-${secondaryTextColor} group-hover:text-${textColor} transition-colors duration-300`}>Proiecte</span>
                </div>
          </div>
        </div>
      </section>


       <div className="relative h-24 -mt-12 z-30">
         <div className={`absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-${subtleBgGradientFrom} via-${subtleBgGradientVia}/30 to-transparent`}></div>
       </div>
      <section id="features" className={`py-20 md:py-28 bg-gradient-to-b from-${subtleBgGradientFrom} to-${lightBgColor} relative`}>
         <div className={`absolute top-0 right-0 translate-x-1/3 -translate-y-1/2 w-96 h-96 bg-gradient-to-bl from-${accentColor}/10 to-transparent rounded-full filter blur-3xl opacity-60`}></div> 

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedCard animationType="fade-in" className="text-center mb-16">
                <h2 className={`text-4xl font-bold text-${textColor} mb-4 inline-flex items-center gap-3`}>Platforma ta Completă</h2>
                <p className={`text-lg text-${secondaryTextColor} max-w-3xl mx-auto`}>De la inspirație la implementare și colaborare, DevFlow îți oferă uneltele și comunitatea de care ai nevoie pentru a excela.</p>
            </AnimatedCard>
        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {/* Card 1 */}
                <AnimatedCard delay="delay-100" animationType='slide-right' className="tilt-card feature-interactive-card bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 flex flex-col items-center text-center hover:border-blue-200">
                    <div className={`feature-icon-wrapper flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-${primaryLightBg} to-blue-100 text-${primaryColor} mb-5 ring-8 ring-blue-100/50 transition-all duration-300`}> <Newspaper size={32} /> </div>
                    <h3 className={`text-2xl font-semibold text-${textColor} mb-3`}>Blog & Resurse</h3>
                    <p className={`text-${secondaryTextColor} text-base mb-5`}>Articole tehnice, tutoriale aprofundate, știri și discuții relevante. Împărtășește și acumulează cunoștințe.</p>
                    <Link href="/blog" className={`mt-auto text-base font-semibold text-${primaryColor} hover:text-${primaryHoverColor} transition-colors group inline-flex items-center animated-link-underline`}>Citește Articole <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform"/></Link>
                </AnimatedCard>
                  {/* Card 2 */}
                <AnimatedCard delay="delay-200" animationType='fade-up' className="tilt-card feature-interactive-card bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 flex flex-col items-center text-center hover:border-pink-200"> 
                    <div className={`feature-icon-wrapper flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-${accentLightBg} to-pink-100 text-${accentColor} mb-5 ring-8 ring-pink-100/50 transition-all duration-300`}> <Users size={32} /> </div>
                    <h3 className={`text-2xl font-semibold text-${textColor} mb-3`}>Găsește Experți</h3>
                    <p className={`text-${secondaryTextColor} text-base mb-5`}>Cauți un freelancer talentat pentru proiectul tău? Explorează profile detaliate, vezi portofolii și contactează direct specialiști IT.</p>
                    <Link href="/freelancers" className={`mt-auto text-base font-semibold text-${accentColor} hover:text-${accentHoverColor} transition-colors group inline-flex items-center animated-link-underline`}>Caută Specialiști <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform"/></Link>
                </AnimatedCard>
                  {/* Card 3 */}
                <AnimatedCard delay="delay-300" animationType='slide-left' className="tilt-card feature-interactive-card bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 flex flex-col items-center text-center hover:border-teal-200"> 
                     <div className={`feature-icon-wrapper flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-${tertiaryLightBg} to-teal-100 text-${tertiaryColor} mb-5 ring-8 ring-teal-100/50 transition-all duration-300`}> <Briefcase size={32} /> </div>
                    <h3 className={`text-2xl font-semibold text-${textColor} mb-3`}>Proiecte & Joburi</h3>
                    <p className={`text-${secondaryTextColor} text-base mb-5`}>Postează cerințele proiectului tău, găsește joburi full-time sau part-time, sau descoperă oportunități open-source.</p>
                    <Link href="/projects" className={`mt-auto text-base font-semibold text-${tertiaryColor} hover:text-${tertiaryHoverColor} transition-colors group inline-flex items-center animated-link-underline`}>Vezi Proiecte <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform"/></Link>
                </AnimatedCard>
            </div>
        </div>
      </section>


       {/* ===== Recent Blog Posts Section ===== */}
       <section id="blog-section" className={`py-20 md:py-28 bg-${lightBgColor}`}> 
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <AnimatedCard animationType="fade-up" className="text-center mb-16">
                     <h2 className={`text-4xl font-bold text-${textColor} mb-4`}>Noutăți din Lumea DevFlow</h2>
                     <p className={`text-lg text-${secondaryTextColor} max-w-2xl mx-auto`}>Cele mai recente articole, sfaturi, perspective și tendințe din comunitatea noastră activă.</p>
                 </AnimatedCard>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                   
                   <AnimatedCard delay="delay-100" animationType='zoom-in' className="tilt-card blog-card bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                         <div className="overflow-hidden h-56 relative">
                             <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80" alt="Imagine articol blog 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                             <div className={`absolute top-3 right-3 bg-${primaryColor}/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm`}>Backend</div>
                         </div>
                         <div className="p-6 flex flex-col flex-grow">
                             <h4 className={`text-xl font-semibold text-${textColor} mt-1 mb-3 transition-colors group-hover:text-${primaryColor}`}><Link href="#">Optimizarea Query-urilor SQL pentru Performanță</Link></h4>
                             <p className={`text-sm text-${secondaryTextColor} mb-4 line-clamp-3 flex-grow`}>Descoperă tehnici avansate de indexare, refactoring și analiză a planurilor de execuție pentru baze de date rapide.</p>
                             <div className="flex items-center text-xs text-gray-500 mt-5 border-t border-gray-100 pt-4">
                                 <img src="https://i.pravatar.cc/24?u=autorSQL" alt="Autor SQL" className="w-6 h-6 rounded-full mr-2 border border-gray-200"/>
                                 <span>de Radu Tehnologic • Acum 2 zile</span>
                             </div>
                         </div>
                   </AnimatedCard>
                   <AnimatedCard delay="delay-200" animationType='zoom-in' className="tilt-card blog-card bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                        <div className="overflow-hidden h-56 relative">
                             <img src="https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Imagine articol blog 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                             <div className={`absolute top-3 right-3 bg-${accentColor}/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm`}>Carieră</div>
                        </div>
                         <div className="p-6 flex flex-col flex-grow">
                             <h4 className={`text-xl font-semibold text-${textColor} mt-1 mb-3 transition-colors group-hover:text-${accentColor}`}><Link href="#">Cum să Negociezi Salariul ca Developer</Link></h4>
                             <p className={`text-sm text-${secondaryTextColor} mb-4 line-clamp-3 flex-grow`}>Sfaturi practice pentru a-ți evalua corect valoarea pe piață și a obține pachetul salarial pe care îl meriți.</p>
                             <div className="flex items-center text-xs text-gray-500 mt-5 border-t border-gray-100 pt-4">
                                 <img src="https://i.pravatar.cc/24?u=autorHR" alt="Autor HR" className="w-6 h-6 rounded-full mr-2 border border-gray-200"/>
                                 <span>de Elena Cariera • Acum 4 zile</span>
                             </div>
                         </div>
                   </AnimatedCard>
                   <AnimatedCard delay="delay-300" animationType='zoom-in' className="tilt-card blog-card bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                        <div className="overflow-hidden h-56 relative">
                             <img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Imagine articol blog 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                             <div className={`absolute top-3 right-3 bg-${tertiaryColor}/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm`}>Frontend</div>
                        </div>
                         <div className="p-6 flex flex-col flex-grow">
                             <h4 className={`text-xl font-semibold text-${textColor} mt-1 mb-3 transition-colors group-hover:text-${tertiaryColor}`}><Link href="#">State Management în React: Zustand vs Redux</Link></h4>
                             <p className={`text-sm text-${secondaryTextColor} mb-4 line-clamp-3 flex-grow`}>O comparație detaliată a două soluții populare de gestionare a stării globale în aplicațiile React moderne.</p>
                             <div className="flex items-center text-xs text-gray-500 mt-5 border-t border-gray-100 pt-4">
                                 <img src="https://i.pravatar.cc/24?u=autorReact" alt="Autor React" className="w-6 h-6 rounded-full mr-2 border border-gray-200"/>
                                 <span>de Andrei Frontend • Acum 1 săptămână</span>
                             </div>
                         </div>
                   </AnimatedCard>
                 </div>
                 <AnimatedCard animationType="fade-up" className="text-center mt-16">
                    <Link href="/blog" className={`animated-button-secondary px-7 py-3 text-base font-semibold bg-gray-100 text-${secondaryTextColor} rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg inline-flex items-center gap-2 group`}>
                         <span>Vezi toate articolele</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                 </AnimatedCard>
            </div>
       </section>

        {/* ===== Featured Freelancers Section (NEW) ===== */}
        <section id="featured-freelancers" className={`py-20 md:py-28 bg-gradient-to-b from-${lightBgColor} to-${tertiaryLightBg}/30`}> 
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <AnimatedCard animationType="fade-up" className="text-center mb-16">
                      <h2 className={`text-4xl font-bold text-${textColor} mb-4 inline-flex items-center gap-3`}><Users className={`text-${accentColor} w-8 h-8`} /> Freelanceri Recomandați</h2>
                      <p className={`text-lg text-${secondaryTextColor} max-w-2xl mx-auto`}>Descoperă câțiva dintre cei mai talentați și apreciați profesioniști din comunitatea DevFlow.</p>
                  </AnimatedCard>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                       {/* Freelancer Card 1 */}
                       <AnimatedCard delay="delay-100" animationType="fade-up" className="freelancer-card text-center bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group hover:-translate-y-1.5 transform">
                            <img src="https://i.pravatar.cc/100?u=freelancer1" alt="Freelancer 1" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md group-hover:scale-105 transition-transform"/>
                            <h4 className={`text-lg font-semibold text-${textColor} mb-1`}>Ana Popescu</h4>
                            <p className={`text-sm text-${primaryColor} font-medium mb-2`}>Senior Frontend Developer</p>
                            <p className={`text-xs text-${secondaryTextColor} mb-4 line-clamp-2`}>Expertiză React, Next.js & UI/UX Design. Pasionată de interfețe intuitive.</p>
                           <div className="flex justify-center space-x-2 mb-4">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">React</span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">Next.js</span>
                            </div>
                           <Link href="#" className={`text-xs font-semibold text-${primaryColor} hover:text-${primaryHoverColor} transition-colors group inline-flex items-center`}>Vezi Profil <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform"/></Link>
                       </AnimatedCard>
                       {/* Freelancer Card 2 */}
                       <AnimatedCard delay="delay-200" animationType="fade-up" className="freelancer-card text-center bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group hover:-translate-y-1.5 transform">
                            <img src="https://i.pravatar.cc/100?u=freelancer2" alt="Freelancer 2" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md group-hover:scale-105 transition-transform"/>
                            <h4 className={`text-lg font-semibold text-${textColor} mb-1`}>Mihai Ciobanu</h4>
                            <p className={`text-sm text-${accentColor} font-medium mb-2`}>Backend & DevOps Engineer</p>
                            <p className={`text-xs text-${secondaryTextColor} mb-4 line-clamp-2`}>Specializat în Node.js, Python, AWS și Docker. Construiește infrastructuri scalabile.</p>
                            <div className="flex justify-center space-x-2 mb-4">
                                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-medium">Node.js</span>
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">AWS</span>
                            </div>
                            <Link href="#" className={`text-xs font-semibold text-${accentColor} hover:text-${accentHoverColor} transition-colors group inline-flex items-center`}>Vezi Profil <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform"/></Link>
                       </AnimatedCard>
                        {/* Freelancer Card 3 */}
                        <AnimatedCard delay="delay-300" animationType="fade-up" className="freelancer-card text-center bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group hover:-translate-y-1.5 transform">
                            <img src="https://i.pravatar.cc/100?u=freelancer3" alt="Freelancer 3" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md group-hover:scale-105 transition-transform"/>
                            <h4 className={`text-lg font-semibold text-${textColor} mb-1`}>Cristian Design</h4>
                            <p className={`text-sm text-${secondaryAccentColor} font-medium mb-2`}>UI/UX Designer</p>
                            <p className={`text-xs text-${secondaryTextColor} mb-4 line-clamp-2`}>Creează experiențe digitale memorabile și ușor de utilizat, focus pe mobile-first.</p>
                            <div className="flex justify-center space-x-2 mb-4">
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Figma</span>
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">UX Research</span>
                            </div>
                            <Link href="#" className={`text-xs font-semibold text-${secondaryAccentColor} hover:text-purple-700 transition-colors group inline-flex items-center`}>Vezi Profil <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform"/></Link>
                        </AnimatedCard>
                         {/* Freelancer Card 4 */}
                         <AnimatedCard delay="delay-400" animationType="fade-up" className="freelancer-card text-center bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group hover:-translate-y-1.5 transform">
                            <img src="https://i.pravatar.cc/100?u=freelancer4" alt="Freelancer 4" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md group-hover:scale-105 transition-transform"/>
                            <h4 className={`text-lg font-semibold text-${textColor} mb-1`}>Iana Mobil</h4>
                            <p className={`text-sm text-${tertiaryColor} font-medium mb-2`}>Mobile Developer (iOS & Android)</p>
                            <p className={`text-xs text-${secondaryTextColor} mb-4 line-clamp-2`}>Dezvoltă aplicații native performante și cross-platform cu React Native.</p>
                             <div className="flex justify-center space-x-2 mb-4">
                                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">Swift</span>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Kotlin</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">React Native</span>
                             </div>
                            <Link href="#" className={`text-xs font-semibold text-${tertiaryColor} hover:text-${tertiaryHoverColor} transition-colors group inline-flex items-center`}>Vezi Profil <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform"/></Link>
                         </AnimatedCard>
                  </div>
                   <AnimatedCard animationType="fade-up" className="text-center mt-16">
                         <Link href="/freelancers" className={`animated-button-secondary px-7 py-3 text-base font-semibold bg-${accentLightBg} text-${accentColor} border-2 border-${accentColor} rounded-lg hover:bg-pink-100 hover:border-${accentHoverColor} hover:text-${accentHoverColor} transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-${accentGlowColor}/40 inline-flex items-center gap-2 group`}>
                              <span>Explorează toți freelancerii</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                         </Link>
                   </AnimatedCard>
             </div>
        </section>

       
       <div className="relative h-20">
            <div className={`absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-${accentLightBg}/50 to-transparent`}></div>
       </div>

      {/* ===== Call to Action Section ===== */}
      <section id="cta" className={`py-20 md:py-32 bg-gradient-to-br from-${accentLightBg} via-${secondaryAccentLightBg}/70 to-white relative overflow-hidden`}>
        
        <div className={`absolute -bottom-1/4 -left-10 w-80 h-80 bg-gradient-to-tr from-${accentColor}/20 to-transparent rounded-full filter blur-3xl animate-blob-slow animation-delay-1000`}></div>
        <div className={`absolute -top-1/4 -right-10 w-72 h-72 bg-gradient-to-bl from-${primaryColor}/15 to-transparent rounded-full filter blur-3xl animate-blob-slow animation-delay-3000`}></div>
         <div className={`absolute bottom-10 right-1/3 w-60 h-60 bg-gradient-to-tl from-${tertiaryColor}/10 to-transparent rounded-full filter blur-2xl animate-blob-slow animation-delay-5000`}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedCard animationType='zoom-in'>
              <h2 className={`text-4xl md:text-5xl font-bold text-${textColor} mb-5 text-shadow`}>Ești Gata să Faci Parte din Revoluție?</h2>
              <p className={`text-lg md:text-xl text-${secondaryTextColor} max-w-3xl mx-auto mb-10`}>Creează-ți cont gratuit acum și deblochează întregul potențial DevFlow. Postează proiecte, conectează-te cu experți, învață și colaborează!</p>

    <Link
  href="/login"

  className={
    "animated-button px-6 py-4 text-lg font-semibold " + 
    "bg-pink-600 text-white rounded-lg " + 
    "hover:bg-pink-700 transition-all duration-300 transform hover:scale-[1.05] " + 
    "shadow-xl hover:shadow-lg hover:shadow-pink-500/50 " + 
    "focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 " + 
    "inline-flex items-center group relative overflow-hidden" 
  }

>
 
  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg z-0"></span>

  <span className="relative z-10 flex items-center whitespace-nowrap">
    Alătură-te Comunității Acum!
    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block" />
  </span>

  <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-300 scale-110 group-hover:scale-100 opacity-0 group-hover:opacity-100 z-0"></span>
</Link>

          </AnimatedCard>
        </div>
      </section>
        <footer className={`bg-gray-50 border-t border-gray-200 text-${secondaryTextColor}`}>
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12"> 
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <Link href="/" className={`text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-1 hover:opacity-90 transition-opacity mb-2 inline-block`}>
                  DevFlow
                </Link>
                <p className="text-sm text-gray-500">Conectăm developeri, freelanceri și proiecte inovatoare.</p>
              </div>
              <div>
                <h5 className={`text-sm font-semibold text-${textColor} mb-3 uppercase tracking-wider`}>Platforma</h5>
                <nav className="flex flex-col space-y-2">
                  <Link href="/blog" className={`text-sm hover:text-${primaryColor} transition-colors`}>Blog</Link>
                  <Link href="/freelancers" className={`text-sm hover:text-${primaryColor} transition-colors`}>Freelanceri</Link>
                  <Link href="/projects" className={`text-sm hover:text-${primaryColor} transition-colors`}>Proiecte</Link>
                  <Link href="/register" className={`text-sm hover:text-${primaryColor} transition-colors`}>Înregistrare</Link>
                </nav>
              </div>
              <div>
                <h5 className={`text-sm font-semibold text-${textColor} mb-3 uppercase tracking-wider`}>Companie</h5>
                <nav className="flex flex-col space-y-2">
                  <Link href="/about" className={`text-sm hover:text-${primaryColor} transition-colors`}>Despre Noi</Link>
                  <Link href="/contact" className={`text-sm hover:text-${primaryColor} transition-colors`}>Contact</Link>
                  <Link href="/careers" className={`text-sm hover:text-${primaryColor} transition-colors`}>Cariere</Link>
                </nav>
              </div>
              <div>
                <h5 className={`text-sm font-semibold text-${textColor} mb-3 uppercase tracking-wider`}>Legal</h5>
                <nav className="flex flex-col space-y-2">
                  <Link href="/terms" className={`text-sm hover:text-${primaryColor} transition-colors`}>Termeni și Condiții</Link>
                  <Link href="/privacy" className={`text-sm hover:text-${primaryColor} transition-colors`}>Politica de Confidențialitate</Link>
                  <Link href="/cookies" className={`text-sm hover:text-${primaryColor} transition-colors`}>Politica Cookies</Link>
                </nav>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} DEVFLOW. Toate drepturile rezervate.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`hover:text-${textColor} transition-colors`}><Code size={18}/></a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className={`hover:text-${textColor} transition-colors`}> <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028nh1.36L4.323 2.145H2.865l8.875 11.633Z"/></svg></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`hover:text-${textColor} transition-colors`}><svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg></a>
              </div>
            </div>
          </div>
        </footer>

      

      {/* Stiluri Globale */}
      <style jsx global>{`
        /* Animație Ken Burns (neschimbată) */
        @keyframes kenburns-static { 0%, 100% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.05) translate(-2%, 1%); } }
        .animate-kenburns-static { animation: kenburns-static 25s ease-in-out infinite; }

        /* Animații Fade In & Delays (neschimbate) */
        @keyframes fadeInSlow { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-slow { animation: fadeInSlow 1.3s ease-out forwards; opacity: 0; }
        .delay-0 { animation-delay: 0s; } .delay-100 { animation-delay: 0.1s; } .delay-200 { animation-delay: 0.2s; } .delay-300 { animation-delay: 0.3s; } .delay-400 { animation-delay: 0.4s; } .delay-600 { animation-delay: 0.6s; }

        /* Animație puls rapid (neschimbată) */
        @keyframes pulse-fast { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .animate-pulse-fast { animation: pulse-fast 0.6s ease-in-out; }

        /* Animație puls lent (nou) */
        @keyframes pulse-slow { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        .animate-pulse-slow { animation: pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        /* Animație blob (neschimbată) */
        @keyframes blob-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-10px, 15px) scale(0.9); }
          75% { transform: translate(15px, 5px) scale(1.05); }
        }
        .animate-blob-slow { animation: blob-slow 18s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
        .animation-delay-2000 { animation-delay: -3s; }
        .animation-delay-4000 { animation-delay: -6s; }
        .animation-delay-6000 { animation-delay: -9s; } /* Delay nou */
        .animation-delay-1000 { animation-delay: -1.5s; } /* Ajustat pt CTA */
        .animation-delay-3000 { animation-delay: -4.5s; } /* Ajustat pt CTA */
        .animation-delay-5000 { animation-delay: -7.5s; } /* Ajustat pt CTA */


        /* Gradient animat text (neschimbat) */
        .animated-gradient-text {
            background-size: 250% auto; /* Mărit pentru mișcare mai amplă */
            color: #000;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: text-gradient-animation 5s linear infinite;
        }
        @keyframes text-gradient-animation {
            to { background-position: 250% center; }
        }

         /* NOU: Gradient animat pentru fundal Hero */
        .animated-gradient-background {
          background: linear-gradient(135deg, var(--color-blue-50) 0%, var(--color-white) 50%, var(--color-pink-50) 100%); /* Am ajustat culorile puțin */
          background-size: 400% 400%;
          animation: gradient-bg-animation 20s ease infinite;
        }
        @keyframes gradient-bg-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
         /* Hack pt a folosi culorile Tailwind in CSS; defineste culorile ca variabile CSS */
        :root {
          --color-blue-50: #eff6ff;
          --color-pink-50: #fdf2f8;
          --color-purple-50: #faf5ff;
          --color-teal-50: #f0fdfa;
          --color-white: #ffffff;
          /* Adaugă și alte culori dacă le folosești în gradientul animat */
        }


        /* Efecte hover butoane (neschimbate) */
        .animated-button span, .animated-button-secondary span {
            position: relative; z-index: 1;
        }
        .animated-button::before, .animated-button-secondary::before {
            content: ''; position: absolute; top: 0; left: 0; width: 0; height: 100%;
            background: rgba(255, 255, 255, 0.15); border-radius: inherit;
            transition: width 0.35s ease-out; z-index: 0;
        }
        .animated-button:hover::before, .animated-button-secondary:hover::before { width: 100%; }

        /* NOU: Stil pentru subliniere animată la linkuri */
        .animated-link-underline {
          position: relative;
          text-decoration: none;
          display: inline-block; /* Necesar pt ::after */
        }
        .animated-link-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px; /* Poziționare sub text */
          left: 0;
          background-color: currentColor; /* Folosește culoarea textului linkului */
          transition: width 0.3s ease-out;
        }
        .animated-link-underline:hover::after {
          width: 100%;
        }


        /* Stil carduri features interactive (neschimbate, dar se aplică și la tilt) */
        .feature-interactive-card:hover .feature-icon-wrapper { transform: scale(1.1) rotate(-8deg); box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15); }
        .feature-interactive-card { position: relative; overflow: hidden; }
        .feature-interactive-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(236, 72, 153, 0.06) 0%, transparent 60%); opacity: 0; transition: opacity 0.4s ease-out; z-index: 0; pointer-events: none; }
        .feature-interactive-card:hover::after { opacity: 1; }
        .feature-interactive-card > * { position: relative; z-index: 1; }

         /* NOU: Efect Tilt pentru carduri */
        .tilt-card {
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1); /* Tranziție mai smooth */
        }
        .tilt-card:hover {
           transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale3d(1.03, 1.03, 1.03);
           /* Valorile default sunt 0, JS le va actualiza */
        }

        /* Stil carduri blog (ușor ajustat) */
        .blog-card:hover img { transform: scale(1.05) rotate(1deg); } /* Rotație subtilă */
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
        .line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }

        /* Stil fundă (neschimbat) */
        .corner-ribbon { width: 150px; height: 150px; overflow: hidden; position: absolute; top: -10px; right: -10px; z-index: 30; }
        .corner-ribbon::before, .corner-ribbon::after { position: absolute; z-index: -1; content: ''; display: block; border: 5px solid #ec4899; border-top-color: transparent; border-right-color: transparent; }
        .corner-ribbon::before { top: 0; left: 10px; } .corner-ribbon::after { bottom: 10px; right: 0; }
        .corner-ribbon span { position: absolute; display: block; width: 225px; padding: 8px 0; background-color: #ec4899; box-shadow: 0 5px 10px rgba(0,0,0,.1); color: #fff; font: 700 13px/1 'Inter', sans-serif; text-shadow: 0 1px 1px rgba(0,0,0,.2); text-transform: uppercase; text-align: center; left: -25px; top: 35px; transform: rotate(45deg); }
        .corner-ribbon span:empty { padding: 0; }

         /* Text Shadow Utilities */
        .text-shadow { text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .text-shadow-light { text-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); }
        .text-shadow-light-sm { text-shadow: 0 1px 2px rgba(0, 0, 0, 0.06); }

        /* Stil specific pt card freelancer */
        .freelancer-card { transition: all 0.3s ease; }
        .freelancer-card:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); } /* Tailwind shadow-xl */

      `}</style>

      
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const tiltCards = document.querySelectorAll('.tilt-card');
              const featureCards = document.querySelectorAll('.feature-interactive-card'); // Pt efectul radial

              tiltCards.forEach(card => {
                const maxTilt = 8; // Grade de înclinare maximă

                const handleMouseMove = (e) => {
                  if (!card) return; // Verificare suplimentară
                  const rect = card.getBoundingClientRect();
                  const cardWidth = card.offsetWidth;
                  const cardHeight = card.offsetHeight;
                  const centerX = rect.left + cardWidth / 2;
                  const centerY = rect.top + cardHeight / 2;
                  const mouseX = e.clientX - centerX;
                  const mouseY = e.clientY - centerY;

                  const rotateY = (mouseX / (cardWidth / 2)) * maxTilt;
                  const rotateX = (-1 * (mouseY / (cardHeight / 2))) * maxTilt; // Inversat pt direcție naturală

                  card.style.setProperty('--tilt-x', rotateX + 'deg');
                  card.style.setProperty('--tilt-y', rotateY + 'deg');
                };

                const handleMouseLeave = () => {
                   if (!card) return; // Verificare suplimentară
                  card.style.setProperty('--tilt-x', '0deg');
                  card.style.setProperty('--tilt-y', '0deg');
                };

                // Stocare referințe funcții pentru removeEventListener
                card._handleMouseMove = handleMouseMove;
                card._handleMouseLeave = handleMouseLeave;

                card.addEventListener('mousemove', card._handleMouseMove);
                card.addEventListener('mouseleave', card._handleMouseLeave);

              });

               // Efect radial pe cardurile Features
               featureCards.forEach(card => {
                  const handleMouseMoveRadial = (e) => {
                     if (!card) return; // Verificare suplimentară
                     const rect = card.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     const y = e.clientY - rect.top;
                     card.style.setProperty('--mouse-x', x + 'px');
                     card.style.setProperty('--mouse-y', y + 'px');
                   };

                  // Stocare referință funcție
                  card._handleMouseMoveRadial = handleMouseMoveRadial;
                   card.addEventListener('mousemove', card._handleMouseMoveRadial);

                   // Nu este necesar un listener de mouseleave specific pt resetarea --mouse-x/y
                   // deoarece opacitatea ::after este controlată de :hover
               });

              // Cleanup function (simulare pentru contextul scriptului inline)
              // Într-un useEffect, am apela removeEventListener folosind referințele stocate
              // window.addEventListener('beforeunload', () => {
              //    tiltCards.forEach(card => {
              //       if (card && card._handleMouseMove) card.removeEventListener('mousemove', card._handleMouseMove);
              //       if (card && card._handleMouseLeave) card.removeEventListener('mouseleave', card._handleMouseLeave);
              //    });
              //    featureCards.forEach(card => {
              //       if (card && card._handleMouseMoveRadial) card.removeEventListener('mousemove', card._handleMouseMoveRadial);
              //    });
              // });
            `,
          }}
        />
    </main>
  );
};

export default DynamicInteractiveHomepageEnhanced;