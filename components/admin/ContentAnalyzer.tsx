'use client'

import { useState, useEffect } from 'react'

interface ContentAnalyzerProps {
  content: string
  title: string
}

interface AnalysisResult {
  wordCount: number
  readingTime: number
  readabilityScore: number
  seoScore: number
  headings: { level: number; text: string }[]
  suggestions: string[]
}

export default function ContentAnalyzer({ content, title }: ContentAnalyzerProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    if (content || title) analyzeContent()
  }, [content, title])

  const analyzeContent = () => {
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const words = plainText.split(' ').filter(word => word.length > 0)
    const wordCount = words.length
    const readingTime = Math.ceil(wordCount / 200)

    const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi
    const headings: { level: number; text: string }[] = []
    let match
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({ level: parseInt(match[1]), text: match[2].replace(/<[^>]*>/g, '').trim() })
    }

    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0
    const avgSyllablesPerWord = calculateAvgSyllables(words)
    const readabilityScore = Math.max(0, Math.min(100,
      206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
    ))

    let seoScore = 0
    const suggestions: string[] = []

    if (title.length >= 30 && title.length <= 60) {
      seoScore += 20
    } else {
      suggestions.push(`Title should be 30-60 characters (currently ${title.length})`)
    }

    if (wordCount >= 300) {
      seoScore += 20
    } else {
      suggestions.push(`Content should be at least 300 words (currently ${wordCount})`)
    }

    if (headings.length > 0) {
      seoScore += 15
      if (headings.some(h => h.level === 1)) {
        seoScore += 10
      } else {
        suggestions.push('Add an H1 heading for better SEO')
      }
    } else {
      suggestions.push('Add headings (H1, H2, H3) to improve content structure')
    }

    if (readingTime >= 2 && readingTime <= 10) {
      seoScore += 15
    } else if (readingTime < 2) {
      suggestions.push('Consider adding more content for better engagement')
    }

    if (readabilityScore >= 60) {
      seoScore += 20
    } else {
      suggestions.push('Improve readability by using shorter sentences and simpler words')
    }

    if (suggestions.length === 0) suggestions.push('Great! Your content looks well-optimized.')

    setAnalysis({ wordCount, readingTime, readabilityScore: Math.round(readabilityScore), seoScore, headings, suggestions })
  }

  const calculateAvgSyllables = (words: string[]): number => {
    if (words.length === 0) return 0
    return words.reduce((total, word) => total + countSyllables(word), 0) / words.length
  }

  const countSyllables = (word: string): number => {
    word = word.toLowerCase()
    if (word.length <= 3) return 1
    const vowels = 'aeiouy'
    let count = 0
    let prevVowel = false
    for (const char of word) {
      const isVowel = vowels.includes(char)
      if (isVowel && !prevVowel) count++
      prevVowel = isVowel
    }
    if (word.endsWith('e')) count--
    return Math.max(1, count)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return 'Very Easy'
    if (score >= 80) return 'Easy'
    if (score >= 70) return 'Fairly Easy'
    if (score >= 60) return 'Standard'
    if (score >= 50) return 'Fairly Difficult'
    if (score >= 30) return 'Difficult'
    return 'Very Difficult'
  }

  if (!analysis) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Content Analysis</h3>
        <p className="text-gray-600">Start writing to see content analysis...</p>
      </div>
    )
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Content Analysis</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{analysis.wordCount}</div>
          <div className="text-sm text-gray-600">Words</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{analysis.readingTime}</div>
          <div className="text-sm text-gray-600">Min Read</div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-800">SEO Score</span>
            <span className={`text-sm font-bold ${getScoreColor(analysis.seoScore)}`}>{analysis.seoScore}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${analysis.seoScore}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-800">Readability</span>
            <span className={`text-sm font-bold ${getScoreColor(analysis.readabilityScore)}`}>
              {analysis.readabilityScore}/100 ({getReadabilityLevel(analysis.readabilityScore)})
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${analysis.readabilityScore}%` }} />
          </div>
        </div>
      </div>

      {analysis.headings.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2 text-gray-800">Content Structure</h4>
          <div className="space-y-1">
            {analysis.headings.map((heading, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className="text-gray-400 mr-2">{'  '.repeat(heading.level - 1)}H{heading.level}</span>
                <span className="text-gray-800 truncate">{heading.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-800">Suggestions</h4>
        <div className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
              <span className="text-gray-800">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
