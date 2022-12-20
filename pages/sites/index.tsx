import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { query, collection, getDocs } from "firebase/firestore"

const Site = ({ sites }) => {
    return (
        <div style={{maxWidth: '650px', margin: '0 auto'}}>
            <table>
                <tbody>
                    {sites?.map((site) => {
                        return (
                            <tr key={site.domain}>
                                <td>
                                    {site.domain}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export const getServerSideProps = async () => {
    const orderedDocs = query(collection(firebaseDb, "sites"))
    const querySnapshot = await getDocs(orderedDocs)
    const sites = querySnapshot.docs.map(doc => doc.data())
            
    return {
        props: { sites }
    }
}

export default Site