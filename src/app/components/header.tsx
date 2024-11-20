'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border p-2.5">
        <div className="animate-pulse h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
    );
  }

  return (
    <button 
      className="border p-2.5 rounded-lg text-foreground/60 hover:dark:bg-[#191919] hover:bg-gray-100 transition-colors duration-200 ease-in-out"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  );
};

export default function Headers() {
  const pathname = usePathname();

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto md:px-16 px-6">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image src={"/png/logo.png"} alt="Logo" width={32} height={32} priority />
            </Link>
            <h1 className="text-2xl font-bold"><Link href="/">Kavin</Link></h1>
          </div>
          <nav>
            <ul className="flex items-center space-x-6 font-semibold">
              <li className='px-2'><Link className={pathname === '/about' ? 'text-primary' : ''} href="/about">About</Link></li>
              <li className='px-2'><Link className={pathname.startsWith('/archives') ? 'text-primary' : ''} href="/archives">Archives</Link></li>
              <li className='px-2'><Link className={pathname === '/projects' ? 'text-primary' : ''} href="/projects">Codes</Link></li>
              <ThemeButton></ThemeButton>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

