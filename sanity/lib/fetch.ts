import { client } from './client'

export async function sanityFetch<T>({ query, params = {}, tags }: {
  query: string
  params?: Record<string, string | number | boolean | string[]>
  tags?: string[]
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: 60,
        tags,
      },
    })
  } catch (e) {
    console.warn('Sanity fetch error (is your project configured?):', e)
    return (query.includes('order(publishedAt desc) [0...3]') ? [] : query.includes('order(publishedAt desc)') ? [] : query.includes('[0]') ? null : []) as T
  }
}

export async function sanityFetchAll<T>({ query, params = {}, tags }: {
  query: string
  params?: Record<string, string | number | boolean | string[]>
  tags?: string[]
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: false,
        tags,
      },
    })
  } catch (e) {
    console.warn('Sanity fetch error (is your project configured?):', e)
    return (query.includes('order(publishedAt desc) [0...3]') ? [] : query.includes('order(publishedAt desc)') ? [] : query.includes('[0]') ? null : []) as T
  }
}
