import algoliasearch from 'algoliasearch'

const client = algoliasearch(process.env.ALGOLIA_SEARCH_ID, process.env.ALGOLIA_SEARCH_Key);
export const localEnPostsIndex = client.initIndex('local_en_posts');