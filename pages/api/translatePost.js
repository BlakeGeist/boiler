import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { translateString, cleanSug, getContentFromText } from 'utils/helpers'

export default async function handler(req, res) {
    const { slug, host, lang } = req.query

    const docRef = doc(firebaseDb, `/sites/${host}/langs/en/posts`, slug)
    const postDoc = await getDoc(docRef)
    const post = postDoc.data()

    const categories = await Promise.all(post.categories.map(async (cat) => {
        return { slug: cleanSug(await translateString(cat.slug, lang)), name: await translateString(cat.name, lang)}
    }))

    const listicleItems = await Promise.all(post.listicleItems.map(async (listitem) => {
        return translateString(listitem, lang)
    }))

    const faqs = await Promise.all(post.faqs.map(async (faq) => {
        return { question: await translateString(faq.question, lang), answer: await translateString(faq.answer, lang)}
    }))

    const translatedArticleText = await translateString(post.rawArticleResponse, lang)
    const article = getContentFromText(translatedArticleText)

    const translatedPost = {
        slug: post.slug,
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
        listicleItems,
        article,
        faqs
      }

    await setDoc(doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug), translatedPost)
        .then(() => {
            res.status(200).json(translatedPost)
        }).catch((e) => {
            console.log('error: ', e)
            res.status(500).json(e)
        })

}