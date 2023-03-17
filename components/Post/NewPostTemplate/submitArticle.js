import axios from 'axios'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'

export const submitArticle = async (promptText, e, setStep, setPost, host, setHtml, setLoading, setFaqs, post, setListItems) => {
    e.preventDefault()
    const params = {
        host,
        prompt: promptText,
        headingText: promptText
    }

    const headerImagePrompt = e.target.headerImage.value
    const mediumImagePrompt = e.target.mediumImage.value

    setStep(3)
    setLoading(true)

    let posttemp = {}

    await axios.get('/api/createPost', { params })
        .then(async (res) => {
            const params = {
                slug: res.data.slug,
                prompt: promptText,
                host
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

            const addSecondaryPostData   = axios.get('/api/addSecondaryPostData',   { params })
            const addAndCreateCategories = axios.get('/api/addAndCreateCategories', { params })
            const addFaqsToPost          = axios.get('/api/addFaqsToPost',          { params })
            const addListicle            = axios.get('/api/addListicle',            { params })
            const addHeaderImage         = axios.get('/api/addHeaderImage',         { params }) 
            const addMediumImage         = axios.get('/api/addMediumImage',         { params }) 

            addHeaderImage.then(res => {
                posttemp = {
                    ...posttemp,
                    ...res.data
                }    
                setPost(posttemp)         
            }).catch(e => {
                console.log(`there was an error while creating the HeaderImage: ${e}`)
            }) 

            addMediumImage.then(res => {
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

            addSecondaryPostData.then(res => {
                posttemp = {
                    ...posttemp,
                    ...res.data
                }                
                setPost(posttemp)                
            }).catch(e => {
                console.log(`there was an error while creating the SectiondaryPostData: ${e}`)
            })

            addAndCreateCategories.then(res => {
                posttemp = {
                    ...posttemp,
                    ...res.data
                }                
                setPost(posttemp)
            }).catch(e => {
                console.log(`there was an error while creating the Categories: ${e}`)
            })

            addFaqsToPost.then(res => {
                setFaqs(res.data)
            }).catch(e => {
                console.log(`there was an error while creating the Faqs: ${e}`)
            })

            addListicle.then(res => {
                const { listicleHeading, listicleDescription } = res.data
                const listicleItems = res.data.listicleItems.map(listItem => ({ listItem }))
                posttemp = {
                    ...posttemp,
                    listicleHeading,
                    listicleDescription
                }                
                setPost(posttemp)
                setListItems(listicleItems)
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
            console.log(e)
        })
}
