'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Headers() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  })
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
              <li className='px-2'><Link href="/about">About</Link></li>
              <li className='px-2'><Link href="/blog">Blog</Link></li>
              <li className='px-2'><Link href="/projects">Projects</Link></li>
              { mounted && <button className="border p-2.5 rounded-lg text-foreground/60 hover:dark:bg-[#191919] hover:bg-gray-100 md:mx-4 outline-none" onClick={toggleTheme}>
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
              </button> }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

