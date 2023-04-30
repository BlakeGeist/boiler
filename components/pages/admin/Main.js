import React from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const AdminPageTemplate = ({ site }) => {
    const uploadImage = async (file) => {

        const dastorage = getStorage()
        const dastorageRef = ref(dastorage, `${site.slug}-logo.jpg`)    
        let logoSRC

        await uploadBytes(dastorageRef, file).then( async (snapshot) => {
            await getDownloadURL(snapshot.ref).then( (downloadURL) => {
                logoSRC = downloadURL
                //console.log('File available at', downloadURL)
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
        const file = e.currentTarget.logo.files[0]

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
            map: e.target.map.value,
            sidebarAd: e.target.sidebarAd.value,
            headerAd: e.target.headerAd.value,
            bodyAd: e.target.bodyAd.value,
            logoAlt: e.target.logoAlt.value
        }

        const siteRef = doc(firebaseDb, "sites", site.slug)

        await updateDoc(siteRef, siteUpdate)
    }

    return (
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

                <div>
                    <label htmlFor="sidebarAd">Sidebar Ad Link: </label>
                    <input type="text" name="sidebarAd" id="sidebarAd" defaultValue={site.sidebarAd} />
                </div>

                <div>
                    <label htmlFor="headerAd">Header Ad Link: </label>
                    <input type="text" name="headerAd" id="headerAd" defaultValue={site.headerAd} />
                </div>

                <div>
                    <label htmlFor="bodyAd">Body Ad Link: </label>
                    <input type="text" name="bodyAd" id="bodyAd" defaultValue={site.bodyAd} />
                </div>

                <div>
                    <label htmlFor="logoAlt">Site Logo Alt: </label>
                    <input type="text" name="logoAlt" id="logoAlt" defaultValue={site.logoAlt} />
                </div>

                <input type="submit" />
            </form>

            <form onSubmit={(e) => submit(e)}>
                <label htmlFor="logo">Logo: </label>
                <input type="file" id="logo" name="logo" />
                <input type="submit" />
            </form>
        </main>
    )
}

export default AdminPageTemplate