import Image from 'next/image';
import Link from 'next/link';

export default function Headers() {
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto md:px-16 px-6">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image src={"/png/logo.png"} alt="Logo" width={32} height={32} priority />
            </Link>
            <h1 className="text-2xl font-bold text-white"><Link href="/">Kavin</Link></h1>
          </div>
          <nav>
            <ul className="flex items-center space-x-6 font-semibold text-white">
              <li className='px-2'><Link href="/about">About</Link></li>
              <li className='px-2'><Link href="/blog">Blog</Link></li>
              <li className='px-2'><Link href="/projects">Projects</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
