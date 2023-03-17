import React, { useState } from 'react'
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

const BuildArticle = ({ selectedIdea, submitArticle, articleLoading }) => {
    
    const CheckBox = ({ defaultChecked, labelText, name }) => {
        const [isChecked, setIsChecked] = useState(defaultChecked)
        
        return (
            <CheckboxContainer>
                <input type="checkbox" name={`${name}Checkbox`} id={`${name}Checkbox`} defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <label htmlFor={`${name}Checkbox`}>{labelText}</label>

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
                
                {name === "video" && isChecked &&
                    <div>
                        <input type="text" name="video" id="video" placeholder="Video url" />
                    </div>
                }                
                
            </CheckboxContainer>
        )
    }

    return (
        <>
            <CreateArticleForm onSubmit={(e) => submitArticle(selectedIdea, e)}>
                <div>
                    <CheckBox name="headerImage" labelText="Header Image" defaultChecked={true} />
                    <CheckBox name="mediumImage" labelText="Body Image" defaultChecked={true} />
                    <CheckBox name="article" labelText="Article" defaultChecked={true} />
                    <CheckBox name="faqs" labelText="Faqs" defaultChecked={true} />
                    <CheckBox name="listicle" labelText="Listicle" defaultChecked={true} />
                    <CheckBox name="categories" labelText="Categories" defaultChecked={true} />
                    <CheckBox name="quote" labelText="Quote" defaultChecked={true} />
                    <CheckBox name="video" labelText="Video" defaultChecked={false} />
                    <CheckBox name="map" labelText="Map" defaultChecked={false} />
                    <CheckBox name="keywords" labelText="Keywords" defaultChecked={false} />
                </div>

                <LoadingButton type="submit" loading={articleLoading} loadingIndicator={"Loading..."} variant="outlined">
                    Create Article
                </LoadingButton>
            </CreateArticleForm>
        </>
    )
}

export default BuildArticle