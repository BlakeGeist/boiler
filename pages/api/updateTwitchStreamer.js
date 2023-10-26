

import moment from 'moment'
import { doc, setDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const host = process.env.NEXT_PUBLIC_HOST || ''

export default async function handler(req, res) {
    const currentDate = moment().format()
    try {
        const randomEftStreamerResp = await fetch(`${host}/api/getRandomEftStreamer`)
        const randomEftStreamerObj = await randomEftStreamerResp.json()
        const randomEftStreamer = randomEftStreamerObj.randomEftStreamer

        const twitchHighlightRef = doc(firebaseDb, `twitchHighlights`, currentDate)
        const twtichHighlight = {
            twitchUserName: await randomEftStreamer.user_name,
            currentDate,
            twitchUser: await randomEftStreamer
        }

        await setDoc(twitchHighlightRef, twtichHighlight)

        return res.status(200).json({
            updateStatus: 'success',
            updatedTo: randomEftStreamer
        })
    } catch (e) {
        console.error('there was an error while running the updateTwitchStreamer Api, ', e)
        res.status(500).json('there was an error while running the updateTwitchStreamer Api, ', e)
    }
}