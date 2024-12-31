import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/schemaTypes/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import markdownit from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View' ;

const page = async ({ params } : { params: { id: string } }) => {
  const { id } = params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const md = markdownit();
  const parsedContent = md.render(post.pitch || '');

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {post.image && (
          <img
            src={post.image}
            alt={`Thumbnail for ${post.title}`}
            className="w-full h-auto rounded-xl"
          />
        )}

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            {post.author && (
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <Image
                  src={post.author?.image || '/placeholder-avatar.jpg'}
                  alt={`Avatar of ${post.author?.username || 'Unknown User'}`}
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
                <div>
                  <p className="text-20-medium">{post.author?.username}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.author?.name}
                  </p>
                </div>
              </Link>
            )}

            {post.category && <p className="category-tag">{post.category}</p>}
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          <div>
            <View id={id}/>
          </div>
          
        </Suspense>

      </section>
    </>
  );
};

export default page;
