

import moment from 'moment'
import { doc, setDoc, query, collection, orderBy, limit } from "firebase/firestore"
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'

export default async function handler(req, res) {
    const currentDate = moment().utc().format()
    try {
        const twitchHighlightsPath = `twitchHighlights`
        const twitchHighlightsQuery = query(collection(firebaseDb, twitchHighlightsPath), orderBy("currentDate", "desc"), limit(1))
        const twitchHighlight = await getDocsFromQuery(twitchHighlightsQuery) || []
        const currentlyFeaturedStreamer = twitchHighlight[0].twitchUser.user_login || twitchHighlight[0].twitchUser.login

        const twitchHighlightUserResp = await fetch(`https://www.tarkov-goon-tracker.com/api/isTwitchUserLive?username=${currentlyFeaturedStreamer}`)
        const twitchUser = await twitchHighlightUserResp.json()

        if(twitchHighlight[0].endFeatureAt === 'stream end' && twitchUser.userIsOnline) {
            return res.status(200).json({
                updateStatus: 'no update, current user is still online',
                currentlyFeaturedStreamer
            })
        }

        if(twitchHighlight[0].endFeatureAt !== 'stream end' && currentDate < moment(twitchHighlight[0].endFeatureAt).utc().format()) {
            return res.status(200).json({
                updateStatus: 'no update, current user is still within their uptime',
                currentlyFeaturedStreamer
            })
        }

        const randomEftStreamerResp = await fetch(`https://www.tarkov-goon-tracker.com/api/getRandomEftStreamer`)
        const randomEftStreamerObj = await randomEftStreamerResp.json()
        const randomEftStreamer = randomEftStreamerObj.randomEftStreamer

        const twitchHighlightRef = doc(firebaseDb, `twitchHighlights`, currentDate)
        const twtichHighlight = {
            twitchChannel: await randomEftStreamer.user_login,
            currentDate,
            twitchUser: await randomEftStreamer
        } 

        await setDoc(twitchHighlightRef, twtichHighlight)

        return res.status(200).json({
            updateStatus: 'success',
            updatedTo: twtichHighlight
        })
    } catch (e) {
        console.error('there was an error while running the updateTwitchStreamer Api, ', e)
        res.status(500).json('there was an error while running the updateTwitchStreamer Api, ', e)
    }
}