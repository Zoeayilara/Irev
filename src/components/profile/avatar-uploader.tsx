'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AvatarUploader({
  email,
  avatarUrl,
}: {
  email: string
  avatarUrl: string | null
}) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)

  const uploadsDisabled = process.env.NODE_ENV === 'production'

  const initials = useMemo(() => {
    const name = email.split('@')[0] || 'U'
    return name.slice(0, 2).toUpperCase()
  }, [email])

  const onFileChange = async (file: File | null) => {
    if (!file) return

    if (uploadsDisabled) {
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Upload failed')
      }

      router.refresh()
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-full border border-border bg-muted overflow-hidden flex items-center justify-center text-lg font-bold text-slate-600 dark:text-slate-200">
        {avatarUrl ? (
          <Image src={avatarUrl} alt="Avatar" width={64} height={64} className="h-full w-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">Profile photo</div>
        <div className="flex items-center gap-3">
          <label className="inline-flex">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              disabled={isUploading || uploadsDisabled}
            />
            <Button type="button" variant="outline" size="sm" disabled={isUploading || uploadsDisabled}>
              {uploadsDisabled ? 'Disabled' : isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </label>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-300">
          {uploadsDisabled ? 'Uploads are temporarily disabled in production.' : 'PNG/JPG up to ~2MB recommended.'}
        </div>
      </div>
    </div>
  )
}
