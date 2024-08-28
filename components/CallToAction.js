'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import React from 'react'
import Button from './Button';

const CallToAction = () => {
    const { currentUser } = useAuth(); 
    
    if (currentUser){
        return (
            <div className='max-w-[600px] w-full mx-auto'>
                <Link href="/dashboard">
                    <Button full dark text="Go to dashboard" />
                </Link>
            </div>
        )
    }

    return (
        
        <div className='flex justify-center gap-4 mr-4'>
            
            <Link href="/dashboard">
                <Button text="Sign Up" />
            </Link>

            <Link href="/dashboard">
                <Button text="Login" dark />
            </Link>
        </div>
    )
}

export default CallToAction