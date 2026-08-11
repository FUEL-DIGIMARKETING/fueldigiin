# 🚀 Fuel Digi Blog Admin Panel

A comprehensive blog management system built with Next.js 14, MongoDB, and TinyMCE rich text editor.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login with bcrypt password hashing
- **📝 Rich Text Editor**: TinyMCE integration with your API key
- **📊 Dashboard Analytics**: Blog statistics and quick actions
- **🎨 Modern UI**: Glassmorphism design with animations
- **🔍 Search & Filter**: Advanced blog management tools
- **📱 Mobile Responsive**: Works perfectly on all devices
- **🎯 SEO Optimized**: Meta fields for better search ranking

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT tokens, HTTP-only cookies
- **Editor**: TinyMCE Rich Text Editor
- **UI**: React Hot Toast, GSAP animations

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Your `.env` file is already configured with:
```env
MONGO_URL=mongodb+srv://fueldigi_in:Fdm2026blog@fueldigiin.qxeu20b.mongodb.net/?appName=fueldigiin
DB_NAME=fueldigiin_blog
JWT_SECRET=fueldigi_jwt_secret_key_2026
TINYMCE_API_KEY=356gpzf12l9p7nksg2yf4yf2v3zbuohbmxbldke6v6679011
NEXT_PUBLIC_TINYMCE_API_KEY=356gpzf12l9p7nksg2yf4yf2v3zbuohbmxbldke6v6679011
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔑 Admin Access

**Login Credentials:**
- **URL**: `http://localhost:3000/admin-login`
- **Username**: `fueldigi`
- **Password**: `Fdm@2026blog`

## 📁 Project Structure

```
├── app/
│   ├── admin-login/          # Animated login page
│   ├── admin-dashboard/      # Main admin dashboard
│   │   ├── blog/            # Blog management
│   │   │   ├── create/      # Create new posts
│   │   │   └── page.tsx     # Blog listing
│   │   └── page.tsx         # Dashboard home
│   └── api/                 # API routes
│       ├── auth/            # Authentication
│       ├── blog/            # Blog operations
│       └── admin/           # Admin utilities
├── components/
│   └── admin/               # Admin components
│       ├── AdminDashboard.tsx
│       └── RichTextEditor.tsx
├── lib/
│   ├── mongodb.ts           # Database connection
│   └── auth.ts              # Authentication helpers
├── models/
│   ├── User.ts              # User schema
│   ├── Blog.ts              # Blog schema
│   └── Category.ts          # Category schema
└── types/
    └── global.d.ts          # TypeScript definitions
```

## 🎯 Key Features

### 🔐 Authentication System
- Secure JWT-based authentication
- HTTP-only cookies for session management
- Bcrypt password hashing
- Route protection middleware

### 📝 Blog Management
- Rich text editor with TinyMCE
- Auto-slug generation from titles
- Featured image support
- Categories and tags system
- SEO meta fields
- Draft/Publish workflow
- Word count & reading time calculation

### 📊 Dashboard Analytics
- Total posts count
- Published vs draft statistics
- Last published date
- Quick action buttons

### 🎨 User Interface
- Modern glassmorphism design
- GSAP-powered animations
- Interactive lamp login animation
- Mobile-responsive layout
- Toast notifications

## 🚀 Usage Guide

### Creating a Blog Post
1. Navigate to `/admin-dashboard`
2. Click "Create New Post"
3. Fill in title, content, and metadata
4. Use the rich text editor for formatting
5. Add categories, tags, and SEO fields
6. Save as draft or publish immediately

### Managing Posts
1. Go to "Manage Posts" from dashboard
2. Search and filter posts by status
3. Edit existing posts
4. View published posts on frontend

### Dashboard Features
- **Stats Overview**: View blog statistics
- **Quick Actions**: Fast access to common tasks
- **Search**: Global search across content
- **User Management**: Secure logout functionality

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout  
- `GET /api/auth/me` - Get current user

### Blog Management
- `POST /api/blog/create` - Create new blog post
- `GET /api/blog` - List blogs with pagination
- `GET /api/admin/stats` - Dashboard statistics

## 📱 Database Schema

### User Model
```typescript
{
  username: String (unique)
  password: String (hashed)
  role: 'admin' | 'editor'
  createdAt: Date
}
```

### Blog Model
```typescript
{
  title: String
  slug: String (unique, auto-generated)
  content: String
  excerpt: String
  status: 'draft' | 'published' | 'scheduled' | 'trash'
  featuredImage: String
  categories: [String]
  tags: [String]
  metaTitle: String
  metaDescription: String
  authorId: ObjectId
  wordCount: Number (auto-calculated)
  readTime: Number (auto-calculated)
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

## 🎨 Customization

### Changing Brand Name
Update references from "Fuel Digi" to your brand in:
- `app/admin-login/page.tsx`
- `components/admin/AdminDashboard.tsx`
- `app/admin-dashboard/layout.tsx`

### TinyMCE Configuration
Modify editor settings in `components/admin/RichTextEditor.tsx`:
- Toolbar options
- Plugin configuration  
- Height and appearance
- Upload handlers

### Styling
- Update Tailwind classes for design changes
- Modify GSAP animations in login page
- Customize color schemes in CSS variables

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **HTTP-Only Cookies**: XSS protection
- **Password Hashing**: Bcrypt with salt rounds
- **Route Protection**: Middleware guards
- **Input Validation**: Server-side validation
- **CORS Headers**: Cross-origin protection

## 🚀 Deployment

### Environment Variables
Ensure all environment variables are set in production:
- Database connection string
- JWT secret key
- TinyMCE API key

### Build Commands
```bash
npm run build
npm start
```

## 📞 Support

For any issues or questions:
- Check the logs in browser console
- Verify database connection
- Ensure environment variables are correct
- Test API endpoints individually

## 🎉 Ready to Use!

Your blog admin panel is now ready! Access it at `/admin-login` and start creating amazing content with the rich text editor and comprehensive management tools.