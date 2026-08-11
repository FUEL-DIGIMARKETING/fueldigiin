'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Head from 'next/head'

interface MediaFile {
  _id: string
  filename: string
  url: string
  size: number
  type: string
  altText?: string
  uploadedAt: string
}

export default function MediaLibraryPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isDragActive, setIsDragActive] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) { setIsAuthenticated(true); fetchFiles() }
        else router.push('/admin-login')
      } catch { router.push('/admin-login') }
      finally { setAuthLoading(false) }
    }
    checkAuth()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/media', { credentials: 'include' })
      const data = await response.json()
      if (response.ok) setFiles(data.files || [])
      else toast.error(`Failed to fetch media files: ${data.error || 'Unknown error'}`)
    } catch { toast.error('Failed to fetch media files') }
    finally { setLoading(false) }
  }

  const uploadFiles = async (fileList: File[]) => {
    setUploading(true)
    try {
      const uploadPromises = fileList.map(async (file) => {
        const fd = new FormData()
        fd.append('file', file)
        const response = await fetch('/api/upload', { method: 'POST', body: fd })
        return response.json()
      })
      await Promise.all(uploadPromises)
      toast.success(`${fileList.length} file(s) uploaded successfully`)
      fetchFiles()
    } catch { toast.error('Upload failed') }
    finally { setUploading(false) }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (droppedFiles.length > 0) uploadFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    if (selected.length > 0) uploadFiles(selected)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return
    try {
      const response = await fetch(`/api/media/${id}`, { method: 'DELETE', credentials: 'include' })
      if (response.ok) { toast.success('File deleted successfully'); fetchFiles() }
      else { const err = await response.json(); toast.error(`Failed to delete: ${err.error || 'Unknown error'}`) }
    } catch { toast.error('Network error occurred') }
  }

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) { toast.error('Please select files first'); return }
    if (!confirm(`Delete ${selectedFiles.length} files?`)) return
    try {
      await Promise.all(selectedFiles.map(id => fetch(`/api/media/${id}`, { method: 'DELETE' })))
      toast.success('Files deleted successfully')
      setSelectedFiles([])
      fetchFiles()
    } catch { toast.error('Bulk delete failed') }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Media Library - Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button onClick={() => router.back()} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Media Library</h1>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button onClick={() => setViewMode('grid')} className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
                  <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  </button>
                </div>
                {selectedFiles.length > 0 && (
                  <button onClick={handleBulkDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Delete ({selectedFiles.length})</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragActive(true) }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-dashed transition-all cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileInput} className="hidden" />
            <div className="text-center">
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <span className="text-gray-600">Uploading files...</span>
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  <p className="text-lg font-medium text-gray-900 mb-2">{isDragActive ? 'Drop files here' : 'Drag & drop files here'}</p>
                  <p className="text-gray-600">or click to browse files</p>
                  <p className="text-sm text-gray-500 mt-2">Supports: JPG, PNG, WebP, AVIF</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading media files...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No media files</h3>
                <p className="text-gray-600">Upload your first file to get started.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {files.map((file) => (
                    <div key={file._id} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <img src={file.url} alt={file.altText || file.filename} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center p-4">
                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <p className="text-xs text-gray-600 truncate">{file.filename}</p>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex space-x-2">
                          <button onClick={() => copyToClipboard(file.url)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors" title="Copy URL">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          </button>
                          <button onClick={() => handleDelete(file._id)} className="p-2 bg-red-500/80 rounded-lg hover:bg-red-600/80 transition-colors" title="Delete">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                      <div className="absolute top-2 left-2">
                        <input type="checkbox" checked={selectedFiles.includes(file._id)} onChange={(e) => { if (e.target.checked) setSelectedFiles([...selectedFiles, file._id]); else setSelectedFiles(selectedFiles.filter(id => id !== file._id)) }} className="rounded border-gray-300 bg-white/80" />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate" title={file.filename}>{file.filename}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left"><input type="checkbox" onChange={(e) => { if (e.target.checked) setSelectedFiles(files.map(f => f._id)); else setSelectedFiles([]) }} className="rounded border-gray-300" /></th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {files.map((file) => (
                      <tr key={file._id} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4"><input type="checkbox" checked={selectedFiles.includes(file._id)} onChange={(e) => { if (e.target.checked) setSelectedFiles([...selectedFiles, file._id]); else setSelectedFiles(selectedFiles.filter(id => id !== file._id)) }} className="rounded border-gray-300" /></td>
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                            {file.type.startsWith('image/') ? <img src={file.url} alt={file.filename} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{file.filename}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatFileSize(file.size)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{file.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(file.uploadedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button onClick={() => copyToClipboard(file.url)} className="text-blue-600 hover:text-blue-900">Copy URL</button>
                          <button onClick={() => window.open(file.url, '_blank')} className="text-green-600 hover:text-green-900">View</button>
                          <button onClick={() => handleDelete(file._id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
