/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import LinkedIn from './svg/LinkedIn';
import Github from './svg/Github';
import Twitter from './svg/Twitter';
import Email from './svg/Email';
import { Slide } from './animations/slide';
import HeroSvg from './svg/HeroSvg';

const socialIcons = [
  { href: "https://linkedin.com/in/kavinkumar999", icon: LinkedIn },
  { href: "https://github.com/kavinkumar999", icon: Github },
  { href: "https://twitter.com/kavinkumar999", icon: Twitter },
  { href: "mailto:kavinkumarnkm007@gmail.com", icon: Email },
];

export default function Main() {
  return (
    <div className='flex justify-between'>
      <div className="max-w-2xl">
        <Slide delay={0.2}>
          <h1 className="text-5xl font-bold mb-8">
            Hey, I'm <span className='text-primary'>Kavin Kumar</span>
          </h1>
        </Slide>
        <Slide delay={0.3}>
          <h2 className="text-3xl dark:text-gray-400 text-gray-600 mb-6">I build things for web</h2>
        </Slide>
        <Slide delay={0.4}>
          <p className="text-lg dark:text-gray-400 text-gray-600 mb-8">
            A software engineer who crafts high-scale wonders 🌟. Currently, I'm diving headfirst into the world of AI and machine learning,
            transforming ideas 💡 into meaningful solutions and love to automate everything and anything 🚀
          </p>
        </Slide>
        <Slide delay={0.4}>
          <p className="text-xl mb-8">
            Making Impossible to Possible using{" "}
            <motion.span
              className='text-primary text-2xl mx-3 inline-block'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.span
                animate={{ rotateY: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                1's
              </motion.span>
            </motion.span>
            and{" "}
            <motion.span
              className='text-primary text-2xl mx-3 inline-block'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.span
                animate={{ rotateY: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.75 }}
              >
                0's
              </motion.span>
            </motion.span>
          </p>
        </Slide>
        <Slide delay={0.5}>
          <div className="flex space-x-12">
            {socialIcons.map((social, index) => (
              <motion.div
                key={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Link href={social.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <social.icon />
                </Link>
              </motion.div>
            ))}
          </div>
        </Slide>
      </div>
      <Slide delay={0.6}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSvg />
        </motion.div>
      </Slide>
    </div>
  );
}