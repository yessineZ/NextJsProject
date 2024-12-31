import React from 'react' ;
import Ping from './Ping' ;
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/schemaTypes/queries'
import { writeClient } from '@/sanity/lib/write-client';
import { unstable_after as after} from 'next/server' ; 
const View = async ({id} : {id : string}) => {
  const { views : totalViews } = await client.withConfig({useCdn : false }).fetch(STARTUP_BY_ID_QUERY,{id}) ;


  
   const update  =   async () =>   await writeClient.patch(id).set({views : totalViews + 1}).commit()  
   update() ;
  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
          <Ping/>
      </div>

      <p className='view-text'>
        <span className='font-black'>Views : {totalViews}</span>
      </p>
    </div>
  )
}

export default View
