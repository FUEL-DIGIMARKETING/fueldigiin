import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  color: { type: String, default: '#3B82F6' }
}, {
  timestamps: true
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)