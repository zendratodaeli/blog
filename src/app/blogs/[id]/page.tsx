import Comments from '@/components/comments'
import FormComment from '@/components/form-comments'
import React from 'react'

export default function BlogDetailPage() {
  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold'>Post One</h1>
      <p>Written by: Johon</p>
      <div className='mt-4'>
        You are great
      </div>

      <Comments />
      <FormComment />
    </div>
  )
}
