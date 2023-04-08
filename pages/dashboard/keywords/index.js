import React, { useState } from 'react'
import { firebaseDb, getDocFromPathAndSlug, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import Layout from 'components/Layout'
import { cleanSug } from 'utils/helpers'
import { setDoc, doc } from 'firebase/firestore'
import timestamp from 'time-stamp'
import Link from 'next/link'

const Keywords = ({ site, host, keywords }) => {

    const createdAt = timestamp('YYYY/MM/DD:mm:ss')

    const [keywordsArr, setKeywordsArr] = useState(keywords)

    const onSubmit = async (e) => {
        e.preventDefault()
        const { keyphrase, link } = e.target

        const keyphraseSlug = cleanSug(keyphrase.value)

        const keyphraseObj = {
            link: link.value,
            keyphrase: keyphrase.value,
            slug: keyphraseSlug,
            createdAt: createdAt
        }

        await setDoc(doc(firebaseDb, `/sites/${host}/keywords`, keyphraseSlug), keyphraseObj)


        setKeywordsArr([keyphraseObj, ...keywordsArr])
    }

    return (
        <Layout site={site}>
            <h1>This is the keywords section</h1>

            {keywordsArr.map((keyword, i) => {
                console.log(keyword)
                return (
                    <div key={keyword.slug + i}>
                        <Link href={`/dashboard/keywords/${keyword.slug}`}>
                           {keyword.keyphrase}
                        </Link>
                    </div>
                )
            })}

            <form onSubmit={e => onSubmit(e)}>
                <label>Keyword</label>
                <input type="text" placeholder='Enter Keyphrase' name="keyphrase" id="keyphrase" />

                <label>Target Link</label>
                <input type="text" placeholder='Enter Keyphrase' name="link" id="link" />

                <input type="submit" />
            </form>
        </Layout>
    )
}

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host

    const keywordsPath = `sites/${host}/keywords`
    const keywordsQuery = query(collection(firebaseDb, keywordsPath), orderBy('createdAt', "desc"), limit(10))
    const keywords = await getDocsFromQuery(keywordsQuery)

    const site = await getDocFromPathAndSlug("sites", host)

    return { props: { keywords, host, site, locale } }
}

export default Keywords