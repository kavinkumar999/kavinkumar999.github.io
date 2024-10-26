/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, Search } from 'lucide-react'
import { Article } from '@/app/utils/type-d'
import { articles, categories } from '@/app/utils/article-util'


export default function BlogSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredArticles, setFilteredArticles] = useState(articles)

  useEffect(() => {
    const results: Article[] = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || article.category === selectedCategory)
    );
    setFilteredArticles(results)
  }, [searchTerm, selectedCategory])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-left">Articles</h1>

        <div className="mb-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-lg rounded-full border-2 border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full transition-all duration-300 ease-in-out hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>

        <AnimatePresence>
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/articles/${article.id}`} passHref>
                  <motion.div
                    className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl dark:hover:shadow-lg-dark group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2 transition-colors duration-300 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground">
                        {article.category}
                      </Badge>
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2 transition-colors duration-300 ease-in-out group-hover:text-primary">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {article.date}
                        </span>
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-muted-foreground mt-8"
          >
            No articles found. Try a different search or category.
          </motion.p>
        )}
      </div>
    </div>
  )
}
