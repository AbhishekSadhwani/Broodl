'use client';
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from './Button';
import Link from "next/link";

const Logout = () => {
    const { logout, currentUser } = useAuth();
    const pathname = usePathname();
    
    if(!currentUser){
        return null
    }

    if (pathname === '/'){
        
        return (
            <Link href={'/dashboard'}>
                <Button text="Go to dashboard" />
            </Link>        
        )
    }
    return (
    <Button text="Logout" clickHandler={logout} />
  )
}

export default Logout