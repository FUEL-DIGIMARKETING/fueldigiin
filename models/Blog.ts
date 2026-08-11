import mongoose from 'mongoose'

const BlogImageSchema = new mongoose.Schema({
  imageUrl: String,
  altText: String,
  caption: String,
  fileName: String,
  fileSize: Number,
})

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: String,
  featuredImage: String,
  featuredImageAlt: String,
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled', 'trash'],
    default: 'draft',
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  author: {
    type: String,
    default: ''
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  categories: [String],
  tags: [String],
  images: [BlogImageSchema],
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  canonical: String,
  publishedAt: Date,
  scheduledAt: Date,
  wordCount: Number,
  readTime: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

BlogSchema.pre('save', function (next) {
  if (this.content) {
    const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean)
    this.wordCount = words.length
    this.readTime = Math.ceil(this.wordCount / 200)
  }
  next()
})

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema)