import React, { useState } from 'react'
import { cleanSlug } from 'utils/helpers'
import { setDoc, doc } from 'firebase/firestore'
import timestamp from 'time-stamp'
import Link from 'next/link'
import { firebaseDb } from 'utils/firebase'

const Keywords = ({ host, keywords }) => {
    const createdAt = timestamp('YYYY/MM/DD:mm:ss')

    const [keywordsArr, setKeywordsArr] = useState(keywords)

    const onSubmit = async (e) => {
        e.preventDefault()
        const { keyphrase, link } = e.target

        const keyphraseSlug = cleanSlug(keyphrase.value)

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
        <>
            <h1>This is the keywords section</h1>

            {keywordsArr.map((keyword, i) => {
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
        </>
    )

}

export default Keywords