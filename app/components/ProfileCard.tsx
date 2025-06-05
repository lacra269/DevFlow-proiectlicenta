// import Image from "next/image";
// import Link from "next/link";

// type ProfileCardProps = {
//   userId: string;
// };

// export default function ProfileCard({ userId }: ProfileCardProps) {
//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md text-sm flex-col gap-8">
//       <div className="h-20 relative">
//         <Image
//           src={
//             "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600"
//           }
//           alt=" "
//           fill
//           className="rounded-md object-cover"
//         />
//         <Image
//           src={
//             "https://images.pexels.com/photos/19302811/pexels-photo-19302811/free-photo-of-om-munce-te-tehnologie-computer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//           }
//           alt=""
//           width={50}
//           height={50}
//           className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -buottom-6 ring-1 ring-white z-10 object-cover"
//         />
//       </div>
//       <div className="h-20 flex flex-col gap-2 items-center">
//         <span className="font-seemibold">Lorem</span>
//         <div className="flex items-center gap-4">
//           <div className="flex">
//             <Image
//               src={
//                 "https://images.pexels.com/photos/19302811/pexels-photo-19302811/free-photo-of-om-munce-te-tehnologie-computer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               }
//               alt=""
//               width={12}
//               height={12}
//               className="rounded-full w-3 h-3  object-cover"
//             />

//             <Image
//               src={
//                 "https://images.pexels.com/photos/19302811/pexels-photo-19302811/free-photo-of-om-munce-te-tehnologie-computer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               }
//               alt=""
//               width={12}
//               height={12}
//               className="rounded-full w-3 h-3  object-cover"
//             />

//             <Image
//               src={
//                 "https://images.pexels.com/photos/19302811/pexels-photo-19302811/free-photo-of-om-munce-te-tehnologie-computer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               }
//               alt=""
//               width={12}
//               height={12}
//               className="rounded-full w-3 h-3  object-cover"
//             />
//           </div>
//           <span className="text-xs text-gray-500 ">1. 2k Followers </span>
//         </div>

        
//         <Link href={`/profile/${userId}`} className="flex items-center gap-2">
//           <button className="bg-red-500 text-white text-xs rounded-md p-2">
//             My profile
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }
