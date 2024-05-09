// import Markdown from 'markdown-to-jsx'
// import getPostMetadata from '@/utils/getPostMetadata'
// import React from 'react'
// import fs from 'fs'
// import matter from 'gray-matter'


// function getPostContent(slug){
//     const folder = 'recipes/'
//     const file = folder + `${slug}.md`
//     const content = fs.readFileSync(file, 'utf8')
//     const matterResult = matter(content)
//     return matterResult
// }

// // generator 
// export const generateStaticParams = async () =>{
//     const posts = getPostMetadata('recipes')
//     return posts.map((post) => ({slug: post.slug}))
// }

// export async function generateMetadata({ params, searchParams }) {
//     const id = params?.slug ? ' ⋅ ' + params?.slug : '' // Assuming you have a way to fetch additional metadata based on the slug
//     const title = `Kwatro Distrito Blog ${id.replaceAll('_', ' ')}`;

//     // Assuming you have a way to fetch additional metadata based on the slug
//     const ogImage = `https://example.com/images/.jpg`; // Example image URL
//     const ogDescription = `Read the latest updates on  at Kwatro Distrito Blog.`; // Example description


//     return {
//         title: title,
//         og: {
//             title: title,
//             description: ogDescription,
//             image: ogImage,
//             url: `https://yourdomain.com/blog/`
//         }
//     }
// }

// const RecipePage = (props) => {
//     const slug = props.params.slug
//     const post = getPostContent(slug)
//     console.log(post)
//     return (
//         <main>
//             <article>
//                 <Markdown>{post.content}</Markdown>
//             </article>
//         </main>
//     )
// }

// export default RecipePage



import Markdown from 'markdown-to-jsx';
import getPostMetadata from '@/utils/getPostMetadata';
import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import Head from 'next/head';

function getPostContent(slug){
    const folder = 'recipes/';
    const file = folder + `${slug}.md`;
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);
    return {
        content: matterResult.content,
        metadata: matterResult.data // This contains the front matter
    };
}

// generator
export const generateStaticParams = async () => {
    const posts = getPostMetadata('recipes');
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params, searchParams }) {
    const slug = params?.slug;
    const postContent = getPostContent(slug);

    const title = `Kwatro Distrito Blog ⋅ ${slug.replaceAll('_', ' ')}`;
    const ogImage = postContent.metadata.image || 'https://example.com/default-image.jpg'; // Default image if none specified
    const ogDescription = postContent.metadata.description || `Read the latest updates on ${slug.replaceAll('_', ' ')} at Kwatro Distrito Blog.`;
    const url = `https://yourdomain.com/blog/${slug}`;
    const author  = postContent.metadata.author
    console.log("this is autor", author)
    console.log("this is url", url)
    console.log("this is ogDescription", ogDescription)
    console.log("this is ogImage", ogImage)
    return {
        title: title,
        description: ogDescription,
        ogimage: ogImage,
        url: url,
        author: author
    }
}

const RecipePage = (props) => {
    const slug = props.params.slug;
    const post = getPostContent(slug);
    return (
        <main> 
                <Head>
                <title>{metaData.title}</title>
                <meta name="description" content={metaData.description}/>
                <meta property="og:title" content={metaData.title}/>
                <meta property="og:description" content={metaData.description}/>
                <meta property="og:image" content="https://photos.app.goo.gl/q82g6Kq3QBbPJSte9"/>
                <meta property="og:url" content={metaData.url}/>
                <meta property="og:type" content="article"/>
                <meta property="article:author" content={metaData.author}/>
            </Head>
            <article>
                <Markdown>{post.content}</Markdown>
            </article>
        </main>
    )
}

export default RecipePage;
