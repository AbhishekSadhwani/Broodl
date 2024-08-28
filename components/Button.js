'use client';
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});


const Button = (props) => {
  const { dark, full, text, clickHandler} = props;
  return (
    <button onClick={clickHandler} className={`${dark ? ('text-white bg-indigo-600 border-2 border-indigo-600 hover:bg-violet-300 hover:border-violet-300 rounded-full') : 
                                 ('text-indigo-600 hover:text-violet-300 border-2 border-indigo-600 hover:border-violet-300 rounded-full ')} 
                        ${full ? 'w-full' : ''} ${fugaz.className}`}>
        <p className='px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base whitespace-nowrap'>
            {text}
        </p>
    </button>
  )
}

export default Button