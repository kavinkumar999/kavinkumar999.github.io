"use client";

import { motion } from 'framer-motion'
import React from 'react';

type props = {
  children: React.ReactNode;
  xInitail?: number | string;
  delay?: number;
}

function transition({ children, xInitail, delay }: props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: xInitail }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}

    </motion.div>
  )
}

export default transition