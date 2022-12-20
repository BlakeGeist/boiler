import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc } from "firebase/firestore" 

const Site = ({ site }) => {
    return (
        <div>
            <h1>{site.domain}</h1>

        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const docRef = doc(firebaseDb, "sites", ctx.query.site)
    const siteDoc = await getDoc(docRef)
    const site = siteDoc.data()

    return {  props: { site } }
}

export default Site