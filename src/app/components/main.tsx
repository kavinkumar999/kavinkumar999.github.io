import Link from 'next/link';
import LinkedIn from './svg/LinkedIn';
import Github from './svg/Github';
import Twitter from './svg/Twitter';
import Email from './svg/Email';
import { Slide } from './animations/slide';
import HeroSvg from './svg/HeroSvg';

export default function Main() {
  return (
    <div className='flex justify-between'>
      <div>
        <Slide delay={0.2}>
          <h1 className="text-5xl font-bold mb-8">Hey, I'm <span className='text-primary'>Kavin Kumar</span></h1>
        </Slide>
        <Slide delay={0.3}>
          <h2 className="text-3xl text-gray-400 mb-6">I build things for web</h2>
        </Slide>
        <Slide delay={0.4}>
          <p className="text-lg  text-gray-400 mb-8">
          A software engineer who crafts the high-scale wonders 🌟. Currently, I'm diving headfirst into the world of AI and machine learning,
          transforming ideas 💡 into meaningful solutions and love to automate everything and anything 🚀
          </p>
        </Slide>
        <Slide delay={0.4}>
          <p className="text-xl mb-8 ">
            Making Impossible to Possible using <span className='text-primary text-2xl mx-3'>1's</span> and <span className='text-primary text-2xl mx-3'>0's</span>
          </p>
        </Slide>
        <Slide delay={0.5}>
          <div className="flex space-x-12">
            <Link href="https://linkedin.com/in/kavinkumar999" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <LinkedIn />
            </Link>
            <Link href="https://github.com/kavinkumar999" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Github />
            </Link>
            <Link href="https://twitter.com/kavin999" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Twitter />
            </Link>
            <Link href="mailto:kavinkumarnkm007@gmail.com" className="hover:opacity-80 transition-opacity">
              <Email />
            </Link>
          </div>
        </Slide>
      </div>
      <Slide delay={0.6}>
        <div>
          <HeroSvg />
        </div>
      </Slide>
    </div>
  );
}
