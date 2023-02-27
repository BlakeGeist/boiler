import React from 'react'
import Layout from 'components/Layout'
import { getDoc, doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const Admin = ({ site }) => {

    const uploadImage = async (file) => {

        const dastorage = getStorage()
        const dastorageRef = ref(dastorage, `${site.slug}-logo.jpg`)    
        let logoSRC

        await uploadBytes(dastorageRef, file).then( async (snapshot) => {
            await getDownloadURL(snapshot.ref).then( (downloadURL) => {
                logoSRC = downloadURL
                console.log('File available at', downloadURL)
              })
          })

        const siteDoc = {
            logoSrc: logoSRC
        }

        const siteRef = doc(firebaseDb, "sites", site.slug)

        await updateDoc(siteRef, siteDoc)
        
    }

    const submit = (e) => {
        e.preventDefault()

        const file = e.target.filename.files[0]

        uploadImage(file)
        
    }

    const updateSite = async (e) => {
        e.preventDefault()

        let siteUpdate = {
            ...site,
            name: e.target.name.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            zip: e.target.zip.value,
            state: e.target.state.value,
            domain: e.target.domain.value,
            url: e.target.url.value,
            facebook: e.target.facebook.value,
            twitter: e.target.twitter.value,
            instagram: e.target.instagram.value,
            map: e.target.map.value
        }

        const siteRef = doc(firebaseDb, "sites", site.slug)

        await updateDoc(siteRef, siteUpdate)
    }

    return (
        <Layout site={site}>
            <main>
                <h1>Admin</h1>

                <form onSubmit={(e) => updateSite(e)}>
                    <div>
                        <label htmlFor="domain">Name: </label>
                        <input type="text" name="name" id="name" defaultValue={site.name} />
                    </div>        

                    <div>
                        <label htmlFor="domain">Domain: </label>
                        <input type="text" name="domain" id="domain" defaultValue={site.domain} />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone: </label>
                        <input type="tel" name="phone" id="phone" defaultValue={site.phone} />
                    </div>

                    <div>
                        <label htmlFor="address">Address: </label>
                        <input type="text" name="address" id="address" defaultValue={site.address} />
                    </div>

                    <div>
                        <label htmlFor="zip">Zip: </label>
                        <input type="text" name="zip" id="zip" defaultValue={site.zip} />
                    </div>

                    <div>
                        <label htmlFor="state">State: </label>
                        <input type="text" name="state" id="state" defaultValue={site.state} />
                    </div>

                    <div>
                        <label htmlFor="url">Url: </label>
                        <input type="text" name="url" id="url" defaultValue={site.url} />
                    </div>
                    
                    <div>
                        <label htmlFor="twitter">Twitter: </label>
                        <input type="text" name="twitter" id="twitter" defaultValue={site.twitter} />
                    </div>

                    <div>
                        <label htmlFor="facebook">Facebok: </label>
                        <input type="text" name="facebook" id="facebook" defaultValue={site.facebook} />
                    </div>

                    <div>
                        <label htmlFor="instagram">Instagram: </label>
                        <input type="text" name="instagram" id="instagram" defaultValue={site.instagram} />
                    </div>

                    <div>
                        <label htmlFor="map">Map: </label>
                        <input type="text" name="map" id="map" defaultValue={site.map} />
                    </div>

                    <input type="submit" />
                </form>

                <form onSubmit={(e) => submit(e)}>
                    <label htmlFor="logo">Logo: </label>
                    <input type="file" id="logo" name="logo" />
                    <input type="submit" />
                </form>

            </main>
        </Layout>
    )
}

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const docRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(docRef)
    const site = siteDoc.data()

    return { props: { site } } 
}

export default Admin