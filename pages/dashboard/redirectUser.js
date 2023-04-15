import { firebaseAdmin } from 'utils/firebaseAdmin'
import nookies from 'nookies'

export const redirectUser = async (ctx) => {
    const cookies = nookies.get(ctx)

    const token = cookies.token ? await firebaseAdmin.auth().verifyIdToken(cookies.token) : null 

    if(ctx.req && !token) {
        ctx.res.writeHead(301, { Location: '/' })
        ctx.res.end()
    }

    return token
}