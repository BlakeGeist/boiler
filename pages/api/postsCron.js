import { collection, where, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import moment from 'moment'

export default async function handler(req, res) {

    const currentTime = moment().format('YYYY/MM/DD:hh:mm:ss')
    const host = req.headers.host

    console.log(currentTime)

    const scheduledPostsPath = collection(firebaseDb, `sites/${host}/langs/en/posts`)
    const scheduledPostsQuery = query(scheduledPostsPath, where("status", "==", 'scheduled'), where("publishedDate", "<", currentTime), orderBy("publishedDate", "desc"))
    const scheduledPostsDocs = await getDocs(scheduledPostsQuery)
    const scheduledPosts = scheduledPostsDocs?.docs?.map(doc => doc.data())

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