import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { translateString, cleanSlug } from 'utils/helpers'
import { convertToHTML } from 'draft-convert'
import { EditorState, ContentState } from 'draft-js'

export default async function handler(req, res) {
    const { slug, host, lang } = req.query

    try {
        const docRef = doc(firebaseDb, `/sites/${host}/langs/en/posts`, slug)
        const postDoc = await getDoc(docRef)
        const post = postDoc.data()
    
        const categories = await Promise.all(post.categories.map(async (cat) => {
            return { slug: cleanSlug(await translateString(cat.slug, lang)), name: await translateString(cat.name, lang)}
        }))
    
        const listicleItems = await Promise.all(post.listicleItems.map(async (listitem) => {
            return translateString(listitem, lang)
        }))
    
        const faqs = await Promise.all(post.faqs.map(async (faq) => {
            return { question: await translateString(faq.question, lang), answer: await translateString(faq.answer, lang)}
        }))
    
        const translatedArticleText = await translateString(post.rawArticleResponse, lang)
        const content = ContentState.createFromText(translatedArticleText)
        const editorState = EditorState.createWithContent(content)
        const html = convertToHTML(editorState.getCurrentContent())

        const translatedSlug = post.slugs.filter(slu => slu.lang.code === lang)[0]

        const translatedPost = {
            slug: translatedSlug?.slug || post.slug,
            slugs: post.slugs,
            rawArticleResponse: await translateString(post.rawArticleResponse, lang),
            metaTitle: await translateString(post.metaTitle, lang),
            categories: categories,
            map: post.map,
            metaDescription: await translateString(post.metaDescription, lang),
            heading: await translateString(post.heading, lang),
            shortDescription: await translateString(post.shortDescription, lang),
            listicleHeading: await translateString(post.listicleHeading, lang),
            summary: await translateString(post.summary, lang),
            quote: await translateString(post.quote, lang),
            headerImageSrc: post.headerImageSrc,
            mediumImageSrc: post.mediumImageSrc,
            createdAt: post.createdAt,
            isTranslated: true,
            listicleItems,
            faqs,
            lang,
            articleHtml: html
        }
    
        await setDoc(doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, translatedSlug?.slug || post.slug), translatedPost)
        return res.status(200).json(translatedPost)
    } catch (e) {
        const errorMessage = 'there was an error while running the translatePost api, '
        console.error(errorMessage, e)
        res.status(500).json(errorMessage, e)
    }
}