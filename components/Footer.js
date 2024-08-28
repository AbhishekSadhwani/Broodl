import { Fugaz_One} from 'next/font/google'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});


const Footer = () => {
  return (
    <footer className={`p-4 sm:p-8 md:p-12 text-indigo-500 flex items-center justify-center ${fugaz.className}`}>
      Built by AbhishekSadhwani.
    </footer>
  )
}

export default Footer