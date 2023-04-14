import { collection, where, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import moment from 'moment'

export default async function handler(req, res) {

    const currentTime = moment().format('YYYY/MM/DD:hh:mm:ss')
    const host = 'pet-tips-n-tricks.com'

    console.log('host, ', host)

    const path = `sites/${host}/langs/en/posts`

    console.log('path, ', path)

    console.log('currentTime, ', currentTime)

    const scheduledPostsPath = collection(firebaseDb, path)
    const scheduledPostsQuery = query(scheduledPostsPath, where("status", "==", 'scheduled'), where("publishedDate", ">", currentTime), orderBy("publishedDate", "desc"))
    const scheduledPostsDocs = await getDocs(scheduledPostsQuery)
    const scheduledPosts = scheduledPostsDocs?.docs?.map(doc => doc.data())

    console.log(`there are ${scheduledPosts.length} scheduled posts`)

    for(let i = 0; scheduledPosts.length > i; i++){
        const post = scheduledPosts[i]

        const postUpdates = {
            status: 'published'
        }

        console.log(`/sites/${host}/langs/en/posts`)

        const postRef = doc(firebaseDb, `/sites/${host}/langs/en/posts`, post.slug)

        await updateDoc(postRef, postUpdates)

        console.log(`published ${post.slug}`)
    }

    res.status(200).end('Hello Cron!')
}