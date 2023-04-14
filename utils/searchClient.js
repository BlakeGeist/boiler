import algoliasearch from 'algoliasearch'

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_Key)
export const localEnPostsIndex = client.initIndex('local_en_posts')
export const petTipsNTricksPostsIndex = client.initIndex('pet-tips-n-tricks.com-en-posts')

