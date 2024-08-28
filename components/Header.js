import { Fugaz_One } from 'next/font/google';
import Link from 'next/link';
import Button from './Button';
import Logout from './Logout';

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});

const Header = () => {
  return (
    <header className={`p-4 sm:p-8 flex items-center justify-between textgradient ${fugaz.className}`}>
      <Link href="/">
        <h1 className='text-md sm:text-xl '>Broodl</h1>
      </Link>
      <Logout /> 
    </header>
  )
}

export default Header