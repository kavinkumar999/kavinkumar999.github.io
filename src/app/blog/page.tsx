'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, Search } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: "Exploring the Future of AI",
    category: "AI",
    date: "2024-03-01",
    readTime: '5 min read',
    description: "Dive into the latest advancements in artificial intelligence and their potential impact on various industries.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBmdXR1cmV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 2,
    title: "Web Development Trends 2024",
    category: "Web Dev",
    date: "2024-02-28",
    readTime: '5 min read',
    description: "Explore the cutting-edge trends shaping the world of web development in 2024.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    title: "Machine Learning in Healthcare",
    category: "AI",
    date: "2024-02-25",
    readTime: '5 min read',
    description: "Discover how machine learning is revolutionizing healthcare diagnostics and treatment.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjaGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww"
  },
  {
    id: 4,
    title: "The Rise of Quantum Computing",
    category: "Quantum",
    date: "2024-02-20",
    readTime: '5 min read',
    description: "Explore the potential of quantum computing and its implications for future technology.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVhbnR1bSUyMGNvbXB1dGluZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    title: "Blockchain Beyond Cryptocurrency",
    category: "Blockchain",
    date: "2024-02-15",
    readTime: '5 min read',
    description: "Uncover the diverse applications of blockchain technology beyond digital currencies.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvY2tjaGFpbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    title: "Sustainable Software Practices",
    category: "Web Dev",
    date: "2024-02-10",
    readTime: '5 min read',
    description: "Learn about eco-friendly software development practices and their environmental impact.",
    image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VzdGFpbmFibGUlMjBzb2Z0d2FyZXxlbnwwfHwwfHx8MA%3D%3D"
  },
]
const categories = ["All", ...new Set(articles.map(article => article.category))]

export default function BlogSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredArticles, setFilteredArticles] = useState(articles)

  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || article.category === selectedCategory)
    )
    setFilteredArticles(results)
  }, [searchTerm, selectedCategory])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-left">Blog</h1>

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
                <Link href={`/blog/${article.id}`} passHref>
                  <motion.div
                    className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl dark:hover:shadow-lg-dark group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {/* <Image
                        src={article.image}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                      /> */}
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
