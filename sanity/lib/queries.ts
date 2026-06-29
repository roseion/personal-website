import { groq } from 'next-sanity'

export const postFields = groq`
  _id,
  _type,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  featured,
  categories[]->{ title, "slug": slug.current },
  tags[]->{ title, "slug": slug.current },
  author->{ name, "slug": slug.current, image }
`

export const projectFields = groq`
  _id,
  _type,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  gallery,
  technologies,
  liveUrl,
  sourceUrl,
  featured,
  publishedAt
`

export const settingsQuery = groq`*[_type == "siteSettings"][0]`

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postFields} }`

export const featuredPostsQuery = groq`*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...3] { ${postFields} }`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] { ${postFields}, body, seo }`

export const postsByCategoryQuery = groq`*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id) && defined(slug.current)] | order(publishedAt desc) { ${postFields} }`

export const postsByTagQuery = groq`*[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id) && defined(slug.current)] | order(publishedAt desc) { ${postFields} }`

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(publishedAt desc) { ${projectFields}, description }`

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...3] { ${projectFields} }`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] { ${projectFields}, description, seo }`

export const categoriesQuery = groq`*[_type == "category" && defined(slug.current)] | order(title asc)`

export const tagsQuery = groq`*[_type == "tag" && defined(slug.current)] | order(title asc)`

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0]`

export const tagBySlugQuery = groq`*[_type == "tag" && slug.current == $slug][0]`

export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]`

export const allSlugsQuery = groq`
  {
    "posts": *[_type == "post" && defined(slug.current)] { "slug": slug.current },
    "projects": *[_type == "project" && defined(slug.current)] { "slug": slug.current },
    "categories": *[_type == "category" && defined(slug.current)] { "slug": slug.current },
    "tags": *[_type == "tag" && defined(slug.current)] { "slug": slug.current }
  }
`

export const postsSitemapQuery = groq`*[_type == "post" && defined(slug.current)] { "slug": slug.current, publishedAt }`
export const projectsSitemapQuery = groq`*[_type == "project" && defined(slug.current)] { "slug": slug.current, publishedAt }`
export const categoriesSitemapQuery = groq`*[_type == "category" && defined(slug.current)] { "slug": slug.current }`
export const tagsSitemapQuery = groq`*[_type == "tag" && defined(slug.current)] { "slug": slug.current }`
export const pagesSitemapQuery = groq`*[_type == "page" && defined(slug.current)] { "slug": slug.current }`
