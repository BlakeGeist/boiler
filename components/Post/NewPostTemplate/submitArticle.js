import axios from 'axios'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import { tryXTimes } from 'utils/apiHelpers'

export const submitArticle = async (promptText, e, setStep, setPost, host, setHtml, setLoading, post, keywords) => {
    e.preventDefault()
    const mappedKeywords = keywords.map(k => `"${k}"`)
    const params = {
        host,
        prompt: promptText,
        headingText: promptText,
        map: e.target.map.value,
        keywords: `${mappedKeywords}`.replace(",", ", "),
        lang: 'en'
    }

    const headerImagePrompt = e.target.headerImage.value
    const mediumImagePrompt = e.target.mediumImage.value

    setStep(3)
    setLoading(true)

    let posttemp = {}

    const createPost = Promise.resolve(await tryXTimes(axios.get('/api/createPost',   { params })))

    createPost.then(async (res) => {
        const params = {
            slug: res.data.slug,
            prompt: promptText,
            host,
            lang: 'en'
        }
        setPost(res.data)
        posttemp = res.data
        setStep(4)

        const article = JSON.parse(res.data.article)
        const blocks = article.blocks
        const test =   {
            key: '28ewer6nu',
            text: ` `,        
            type: 'atomic',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [{ offset: 0, length: 1, key: 0 }],
            data: {}
        }
        const entity = {
            '0': {
                type: 'IMAGE',
                mutability: 'MUTABLE',
                data: {
                    src: post.mediumImageSrc,
                    height: 'auto',
                    width: '225',
                    alt: 'a'
                }
                }
        }
    
        const start = Math.ceil(5)  
        blocks.splice(start, 0, test)
    
        article.blocks = blocks
        article.entityMap = entity

        setHtml(stateToHTML(convertFromRaw(article)))

        return params
    })
    .then(async (params) => {
        params = {
            ...params,
            headerImagePrompt,
            mediumImagePrompt
        }

        const addSecondaryPostData   = tryXTimes(axios.get('/api/addSecondaryPostData',   { params }))
        const addAndCreateCategories = tryXTimes(axios.get('/api/addAndCreateCategories', { params }))
        const addFaqsToPost          = tryXTimes(axios.get('/api/addFaqsToPost',          { params }))
        const addListicle            = tryXTimes(axios.get('/api/addListicle',            { params }))
        const addHeaderImage         = tryXTimes(axios.get('/api/addHeaderImage',         { params }))
        const addMediumImage         = tryXTimes(axios.get('/api/addMediumImage',         { params }))

        await addHeaderImage.then(res => {
            posttemp = {
                ...posttemp,
                ...res.data
            }    
            setPost(posttemp)         
        }).catch(e => {
            console.log(`there was an error while creating the HeaderImage: ${e}`)
        }) 

        await addMediumImage.then(res => {
            posttemp = {
                ...posttemp,
                ...res.data
            }

            setPost(posttemp)
            
            const article = JSON.parse(posttemp.article)
            const blocks = article.blocks
            const test =   {
                key: '28ewer6nu',
                text: ` `,        
                type: 'atomic',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [{ offset: 0, length: 1, key: 0 }],
                data: {}
            }
            const entity = {
                '0': {
                    type: 'IMAGE',
                    mutability: 'MUTABLE',
                    data: {
                        src: res.data.mediumImageSrc,
                        height: 'auto',
                        width: '225',
                        alt: 'a'
                    }
                    }
            }
        
            const start = Math.ceil(5)  
            blocks.splice(start, 0, test)
        
            article.blocks = blocks
            article.entityMap = entity

            setHtml(stateToHTML(convertFromRaw(article)))                
        }).catch(e => {
            console.log(`there was an error while creating the MediumImage: ${e}`)
        }) 

        await addSecondaryPostData.then(res => {
            posttemp = {
                ...posttemp,
                ...res.data
            }
            
            setPost(posttemp)                
        }).catch(e => {
            console.log(`there was an error while creating the SectiondaryPostData: ${e}`)
        })
        await addAndCreateCategories.then(res => {
            posttemp = {
                ...posttemp,
                ...res.data
            }                
            setPost(posttemp)
        }).catch(e => {
            console.log(`there was an error while creating the Categories: ${e}`)
        })

        await addFaqsToPost.then(res => {
            posttemp = {
                ...posttemp,
                faqs: res.data
            }                
            setPost(posttemp)
        }).catch(e => {
            console.log(`there was an error while creating the Faqs: ${e}`)
        })

        await addListicle.then(res => {
            const { listicleHeading, listicleDescription, listicleItems } = res.data

            posttemp = {
                ...posttemp,
                listicleHeading,
                listicleDescription,
                listicleItems
            }

            setPost(posttemp)
        }).catch(e => {
            console.log(`there was an error while creating the Listicle: ${e}`)
        })
        return params
    })
    .then(() => { 
        setPost(posttemp)
        setLoading(false)
    })
    .catch(e => {
        setLoading(false)
        console.log(`there was an error while creating the inital post, ${e}`)
    })
}
