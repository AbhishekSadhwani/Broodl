import { Fugaz_One} from 'next/font/google'
import Link from 'next/link';
import Button from './Button';
import CallToAction from './CallToAction';

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});

const Hero = () => {

  return (
    <section className='flex flex-col gap-8 md:gap-10 py-4 md:py-10 text-center max-w-4xl mx-auto'>
        <h1 className={`text-slate-800 text-5xl sm:text-6xl md:text-7xl ${fugaz.className}`}>
          <span className='textgradient'>Broodl </span>
          helps you track your 
          <span className='textgradient'> daily</span> mood!
           </h1>
        <p className={`text-slate-800 text-lg sm:text-xl md:text-2xl max-w-[600px] mx-auto`}>
          Create your mood record and see how you feel on
          <span className='font-semibold'> every day of every year.</span>
        </p>
        <CallToAction />

    </section>
  )
}

export default Hero