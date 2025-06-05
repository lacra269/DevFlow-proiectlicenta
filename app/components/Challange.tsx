import Image from 'next/image';
import Link from 'next/link'; 


const challenges = [
  {
    id: 1,
    title: "Proaspăt Lansat 🚀",
    description: "Provocarea Alibaba Cloud Web Game. Trimite-ți înscrierile devreme!",
    image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftdu7wtkzz67tqpzexnv1.png",
    link: "/challenges/1" 
  },
  {
    id: 2,
    title: "Provocare React",
    description: "Construiește o mică aplicație folosind React.js.",
    image: "https://media2.dev.to/dynamic/image/width=880%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fi7uzu7m51rl9yhs2yryr.png",
    link: "/challenges/2"
  },
  {
    id: 3,
    title: "Măiestrie CSS",
    description: "Stăpânește arta CSS cu această provocare.",
    image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9bh07jet1zpfwf7m3ll0.jpg",
    link: "/challenges/3"
  }
];

// Componenta Challenge
const Challenge = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <h1 className="text-2xl font-bold">Provocări propuse</h1>
      {/* Secțiune de provocări */}
      <div className="flex flex-col gap-6 w-full max-w-screen-xl mx-auto">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-4 shadow-md rounded-lg w-full">
            <Image
              src={challenge.image}
              alt="Challenge image"
              width={200}
              height={150}
              className="rounded-md object-cover"
            />
            <h3 className="font-medium mt-2">{challenge.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{challenge.description}</p>
            <Link href={challenge.link}>
              <button className="mt-3 text-blue-500 hover:underline">Alătură-te</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenge;
