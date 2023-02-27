import React, { useState} from 'react'
import styled from 'styled-components'
import { LoadingButton } from '@mui/lab'

const CreateArticleForm = styled.form`
    input {
        min-height: 34px;
        margin-right: 15px;
    }

    button {
        margin-top: 15px;
    }
`

const IdeaChockboxContainer = styled.div`
    display: flex;
`

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    label {
        margin-right: 15px;
    }

    div {
        flex: 100%;
        margin-left: 35px;
    }
`

const ArticleIdeas = ({ articleIdeas, articleLoading, submitArticle }) => {

    const CheckBox = ({ defaultChecked, labelText, name }) => {
        const [isChecked, setIsChecked] = useState(defaultChecked)
        return (
            <CheckboxContainer>
                <input type="checkbox" name={name} id={name} defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <label htmlFor={name}>{labelText}</label>

                {name === "headerImage" && isChecked && 
                    <div>
                        <input type="text" placeholder="Describe header image" name="headerImage" />
                    </div>
                }

                {name === "mediumImage" && isChecked && 
                    <div>
                        <input type="text" name="mediumImage" placeholder="Describe supporting image text" />
                    </div>                
                }

                {name === "map" && isChecked &&
                    <div>
                        <input type="text" name="mapSrc" id="mapSrc" placeholder="Google Map Embed URL" />
                    </div>
                }

                {name === "keywords" && isChecked &&
                    <div>
                        <input type="text" name="keywordsArray" id="keywordsArray" placeholder="Keywords , seperated" />
                    </div>
                }                
                
            </CheckboxContainer>
        )
    }


    const Idea = ({ idea }) => {
        const [isChecked, setIsChecked] = useState(false)

        return (
            <li>
                <CreateArticleForm onSubmit={(e) => submitArticle(idea, e)}>
                    <IdeaChockboxContainer>
                        <input type="checkbox" defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        <p>{idea}</p>
                    </IdeaChockboxContainer>

                    {isChecked && 
                        <>
                            <div>
                                <CheckBox name="headerImage" labelText="Header Image" defaultChecked={true} />
                                <CheckBox name="mediumImage" labelText="Body Image" defaultChecked={true} />
                                <CheckBox name="article" labelText="Article" defaultChecked={true} />
                                <CheckBox name="faqs" labelText="Faqs" defaultChecked={true} />
                                <CheckBox name="listicle" labelText="Listicle" defaultChecked={true} />
                                <CheckBox name="categories" labelText="Categories" defaultChecked={true} />
                                <CheckBox name="map" labelText="Map" defaultChecked={false} />
                                <CheckBox name="keywords" labelText="Keywords" defaultChecked={false} />
                            </div>


                            <LoadingButton type="submit" loading={articleLoading} loadingIndicator={"Loading..."} variant="outlined">
                                Create Article
                            </LoadingButton>
                        </>
                    }
                </CreateArticleForm>
            </li>
        )            
    }

    return (
        <>
            <h2>Select an Article and describe the images</h2>
            <ul style={{listStyle: 'none', padding: '0'}}>
                {articleIdeas?.map((idea) => ( <Idea idea={idea} key={`${idea}`} /> ))}
            </ul>
        </>        
    )
}

export default ArticleIdeas