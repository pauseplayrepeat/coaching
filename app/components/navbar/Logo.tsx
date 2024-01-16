'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    // <Image
    //   onClick={() => router.push('/')}
    //   className="hidden md:block cursor-pointer" 
    //   src="/images/logo.png" 
    //   height="100" 
    //   width="100" 
    //   alt="Logo" 
    // />
    <div className="font-bold text-lg">
      <Link href="/">Coaching</Link>
    </div>
   );
}
 
export default Logo;