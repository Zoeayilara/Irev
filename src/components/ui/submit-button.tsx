'use client'

import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from '@/components/ui/button'

export default function SubmitButton({
  children,
  pendingText,
  ...props
}: ButtonProps & { pendingText?: string }) {
  const { pending } = useFormStatus()

  return (
    <Button {...props} type="submit" disabled={pending || props.disabled}>
      {pending ? pendingText || 'Loading...' : children}
    </Button>
  )
}
