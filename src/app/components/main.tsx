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
        <Slide delay={0.1}>
          <p className="text-sm mb-2">Hi, my name is</p>
        </Slide>
        <Slide delay={0.2}>
          <h1 className="text-5xl font-bold mb-4">Kavin Kumar</h1>
        </Slide>
        <Slide delay={0.3}>
          <h2 className="text-3xl text-gray-400 mb-6">I build things for web</h2>
        </Slide>
        <Slide delay={0.4}>
          <p className="text-lg mb-8">
            Hey! I'm a software engineer who specializes in creating high-scale wonders. Currently, I'm
            diving headfirst into the exciting world of AI and machine learning models. I'm also a big fan of
            open source and love contributing to the community. Let's continue this tech adventure
            together! 🚀
          </p>
        </Slide>
        <Slide delay={0.5}>
          <div className="flex space-x-6">
            <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <LinkedIn />
            </Link>
            <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Github />
            </Link>
            <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Twitter />
            </Link>
            <Link href="mailto:your.email@example.com" className="hover:opacity-80 transition-opacity">
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
