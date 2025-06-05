// components/LeftMenu.tsx
'use client';

import Link from "next/link";
import Image from "next/image"; // Folosim Image din next/image

// Definește tipul pentru props
interface LeftMenuProps {
  type: "home" | "profile"; // Tipul paginii poate influența ce se afișează
}

export default function LeftMenu({ type }: LeftMenuProps) {
  return (
    // Container principal
    <div className="flex flex-col gap-6">

      {/* Div pentru Logo-ul tău - Am eliminat padding (p-4) */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 flex items-center justify-center overflow-hidden"> {/* Adăugat overflow-hidden */}
        {/* Folosim componenta Image din Next.js pentru logo-ul tău */}
        {/* Am eliminat width și height fixe, am adăugat w-full și h-auto */}
        <Image
            src={'/image/logo.png'} // Calea către logo-ul tău
            alt="DevFlow Logo"
            width={0} // Necesar pentru layout='responsive' sau 'fill', dar setat la 0
            height={0}// Necesar pentru layout='responsive' sau 'fill', dar setat la 0
            sizes="100vw" // Indică browserului că imaginea poate ocupa lățimea viewportului
            className="w-full h-auto object-contain" // Ocupă lățimea, înălțime automată, păstrează aspect ratio
            priority
        />
      </div>
      {/* Sfârșit Div Logo */}


      {/* Container pentru linkuri - păstrăm structura și imaginile tale */}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2 border border-gray-100">
        <Link href={"/app"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/homes.png'} width={20} height={20} alt="Home Icon" />
          <span className="font-medium text-gray-700">Acasă</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

         <Link href={"/projects"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/projects.png'} width={20} height={20} alt="Home Icon" />
          <span className="font-medium text-gray-700">Proiecte</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

         <Link href={"/developeri"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/developer.png'} width={20} height={20} alt="Home Icon" />
          <span className="font-medium text-gray-700">Developeri</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>


        <Link href={"/videodev"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/video.png'} width={20} height={20} alt="VideoDev Icon" />
          <span className="font-medium text-gray-700">VideoDev</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

        <Link href={"/courses"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/game.png'} width={20} height={20} alt="Courses Icon" />
          <span className="font-medium text-gray-700">Cursuri și promoții</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

        <Link href={"/tags"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/tag.png'} width={20} height={20} alt="Tags Icon" />
          <span className="font-medium text-gray-700">Tags</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

        <Link href={"/faq"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/faq.png'} width={20} height={20} alt="Faq Icon" />
          <span className="font-medium text-gray-700">FAQ</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

        <Link href={"/team"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/work-team.png'} width={20} height={20} alt="Team Icon" />
          <span className="font-medium text-gray-700">Echipa</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

        <Link href={"/contact"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/ambulance.png'} width={20} height={20} alt="Contact Icon" />
          <span className="font-medium text-gray-700">Contact</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center "/>

        <Link href={"/settings"} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
          <Image src={'/image/process.png'} width={20} height={20} alt="Settings Icon" />
          <span className="font-medium text-gray-700">Setări</span>
        </Link>
      </div>

    </div>
  )
}
