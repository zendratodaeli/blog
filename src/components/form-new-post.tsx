"use client"

import { FormData } from "@/types/blog"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChangeEvent, SyntheticEvent, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"

const inputClass = "w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"

  export default function FormNewPost() {
    const [formData, setFormData] = useState<FormData>({
      title: '',
      content: ''
    })

    const {data} = useSession();
    const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    e.preventDefault();
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('api/posts', formData);

      if(response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`)
      }
    } catch (e) {
      console.error(e)
    }
  }
  
  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input 
          type="text" 
          className={inputClass}
          placeholder="Enter the Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <ReactTextareaAutosize
          minRows={5}
          name="content"
          className={inputClass}
          placeholder="Enter the content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-4">
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4
          rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400
          "
          disabled={!data?.user?.email}
          >
            Submit
        </button>
      </div>
    </form>
  )
}
