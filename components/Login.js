'use client';
import { useState } from 'react';
import { Fugaz_One } from 'next/font/google';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';


const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(email,password);

  const [authenticating, setAuthenticating] = useState(false);

  const { signUp, login } = useAuth();

  async function handleSubmit(event){
    event.preventDefault();
    try{
      setAuthenticating(true);
      
      // we check if email and password are correctly provided
      if(!email || !password || password.length < 6){
        return 
      }

      if(isSignUp){
        await signUp(email,password);
      }

      if(!isSignUp){
        await login(email,password);
      }

    }catch(error){
      console.log(error.message);
    }finally{
      setAuthenticating(false);
    }
  }


  return (
    <section className='flex-1 flex flex-col gap-4 justify-center items-center'>
      <h1 className={`text-4xl sm-text-5xl md:text-6xl text-slate-800 ${fugaz.className}`}>{isSignUp ? 'Register' : 'Log In'}</h1>
      <p>You&apos;re one step away!</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto flex flex-col">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' className="mb-4 p-2 sm:p-3 border border-indigo-600 hover:border-violet-300 rounded-full" placeholder='Email' autoComplete='off'/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' className="mb-4 p-2 sm:p-3 w-full border border-indigo-600 hover:border-violet-300 rounded-full" placeholder='Password' autoComplete='off' />
        <Button text={authenticating ? 'Submitting' : "Submit"} full />
      </form>
      <p>{isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}<button onClick={() => setIsSignUp(!isSignUp)} className='text-indigo-600'>{isSignUp ? 'Sign in' : 'Sign up'}</button></p>
    </section>
  )
}

export default Login