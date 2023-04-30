import React, { useState } from 'react'
import EditPost from 'components/pages/dashboard/components/EditPost'
import axios from 'axios'
import Button from '@mui/material/Button'
import { LoadingButton } from '@mui/lab'
import { languages } from 'utils/languages'
import { useRouter } from "next/router"
import { doc, deleteDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import Scheduling from './components/Scheduling'

const DraftPostMain = ({ site, host, post: initalPost, lang }) => {
    const router = useRouter()

    const [isTranslating, setIsTranslating] = useState(false)
    const [currentlyTranslating, setCurrentlyTranslating] = useState('')
    const [post, setPost] = useState(initalPost)

    const translatePost = async (e) => {
        e.preventDefault()
        
        setIsTranslating(true)

        for(let i = 0; languages.length > i; i++) {
            setCurrentlyTranslating(languages[i].name)
            await axios.get('/api/translatePost', { params: {
                host,
                slug: post.slug,
                lang: languages[i].code
            } }).catch(e => {
                console.log('Error translating post, ', e)
            })
        }
        setIsTranslating(false)
        setPost({
            ...post,
            isTranslated: true
        })
    }    

    const deletePost = async (e) => {
        e.preventDefault()
    
        const postPath = `/sites/${host}/langs/${lang}/posts`
        await deleteDoc(doc(firebaseDb, postPath, post.slug))
            .then(() => {
                router.push(`/dashboard/posts`)
            })
            .catch(e => console.log('error:, ', e))
    }

    const handleScheduleUpdate = () => {
        //console.log(dateSelected)
    }

    return (
        <>
            <h1>Draft</h1>

                <Scheduling handleScheduleUpdate={handleScheduleUpdate} postSlug={post?.slug} host={host} lang={lang} publishedDate={post?.publishedDate} />

                <hr />

                <div>
                    {!post?.isTranslated &&
                        <LoadingButton onClick={e => translatePost(e)} loading={isTranslating} variant="outlined">Translate</LoadingButton>
                    }
                    {isTranslating && 
                        `Translating to ${currentlyTranslating}`
                    }
                    <Button onClick={(e) => deletePost(e)} variant="outlined">Delete</Button>
                </div>


            <EditPost
                post={post}
                host={host}
                site={site}
                isEditing={true}
            />            
        </>
    )
}

export default DraftPostMain