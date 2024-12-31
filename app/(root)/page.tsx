import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard , {StartupTypeCard} from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/schemaTypes/queries";

export default async function Home({ searchParams } : { searchParams : Promise<{query? : string}>}) {
 const query =  (await searchParams).query ; 
 const params = { search : query || null } ;
 const { data : posts } = await sanityFetch({query : STARTUPS_QUERY , params}) ;
 console.log(JSON.stringify(posts,null,2)) ;  

 const session = await auth() ;    
 console.log(session?.id) ; 
 
 return (
    <>
    <section className="pink_container">
      <h1 className="heading">
        Pitch Your Startup, <br />
        Connect With Entrepreneurs
      </h1>

      <p className="sub-heading !max-w-3xl">
        Submit Ideas , Vote on Pitches , and Get Noticed in Virtual Competitions.
      </p>

      <SearchForm query={query}/>

    </section>


    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search Results for ${query} ` : 'All Startups' }
      </p>

      <ul className="mt-7 card_grid">
      {posts && (
        posts
         .filter(post => 
            query ? post?.title.toLowerCase().includes(query.toLowerCase()) : true
          )
         .sort((a, b) => Number(b._createdAt) - Number(a._createdAt))
         .map((post : StartupTypeCard) => (
            <StartupCard key={post._id} post={post}/>
          ))
      )}       
      </ul>
    </section>
    
    </>
   
  );
}