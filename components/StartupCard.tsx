import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Startup , Author } from '@/sanity.types'
export type StartupTypeCard = Omit<Startup,"author">  & { author : Author } ;
const StartupCard = ({ post } : {post : StartupTypeCard }) => {
  const {_createdAt , views , author , category , _id , image , description , title } = post ; 
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
          <p className='startup_card_date'>
            {formatDate(_createdAt)}
          </p>
          <div className='flex gap-1.5'>
            <EyeIcon className='text-red-600'/>
            <span>{views}</span>
          </div>
        </div>

        <div className='flex-between mt-5 gap-5'>
          <div className='flex-1'>
            <Link href={`/user/${_id}`}>
             <p className='text-16-medium line-clamp-1'>
                {author?.name}
              </p> 
            </Link>

            <Link href={`/startup/${post._id}`}>
              <h2 className='text-26-semibold'>
                {title}
              </h2>
            </Link>
          </div>
            <Link href={`/user/${author._id}`}>
        <Image src={'https://res.cloudinary.com/dj8fq0bd0/image/upload/v1722108376/z3waw0jxerhrmqzzxsat.png'} alt='placeholder' height={48} width={48} className='rounded-full' />
        </Link>
        </div>

        <Link href={`/startup/${_id}`}>
          <p className='startup-card_desc'>
            {post.description}
          </p>

          <img src={post?.image} alt='placeholder' className='startup-card_img'/>
          
          <div className='flex-between gap-3 mt-5'>
            <Link href={`/query=${category?.toLowerCase()}`}>
            <p className='text-16-medium'>
              #{category}
            </p>

            </Link>
            <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${_id}`}>
                  Details
                </Link>
            </Button>
            

          </div>



        </Link>
        


    </li>
  )
}

export default StartupCard
