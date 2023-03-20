import slugify from 'slugify'
import AWS from 'aws-sdk'
import { EditorState, convertToRaw, ContentState } from 'draft-js'

export const truncateString = (str, num) => {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.

    if(!str) return null

    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
}

export const cleanSug = (rawSlug) => {
  let slug = `${rawSlug}`.trim().toLowerCase()
  slug = slug.replace("'", '')
  slug = slug.replace('"', '')
  slug = slug.replace(":", '')
  slug = slug.replace(".", '')
  slug = slugify(slug)

  return slug
}

export const translateString = async (string, TargetLanguageCode) => {

  var translate = new AWS.Translate({
      region: 'us-west-2',
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  })

  var params = {
      SourceLanguageCode: 'auto', /* required */
      TargetLanguageCode: TargetLanguageCode, /* required */
      Text: string, /* required */
    }

    try {
      const resp = await translate.translateText(params).promise()
      return resp.TranslatedText
    } catch (e) {
      console.log(e)
    }
}

export const translate = async (string) => {

  try {
    const translatedStrings = {
      'en': string,
      'es': await translateString(string, 'es'),
      'ar': await translateString(string, 'ar'),
      'da': await translateString(string, 'da'),
      'fr': await translateString(string, 'fr'),
      'de': await translateString(string, 'de'),
      'it': await translateString(string, 'it'),
      'ja': await translateString(string, 'ja'),
      'ko': await translateString(string, 'ko'),
      'ru': await translateString(string, 'ru')
    }
  
    return translatedStrings
  } catch(e) {
    console.log(e)
  }
}

export const getContentFromText = (content) => {
  content = ContentState.createFromText(content)
  const editorState = EditorState.createWithContent(content)
  const contentFromText = editorState.getCurrentContent()

  return JSON.stringify(convertToRaw(contentFromText))    
}