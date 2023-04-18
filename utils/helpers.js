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

export const cleanSlug = (rawSlug) => {
  let slug = `${rawSlug}`.trim().toLowerCase()
  slug = slug.replace("'", '')
  slug = slug.replace('"', '')
  slug = slug.replace(":", '')
  slug = slug.replace(".", '')
  slug = slug.replace(")", '')
  slug = slug.replace("(", '')
  slug = slugify(slug)

  if(slug === "") {
    slug = `${rawSlug}`.trim().toLowerCase()
    slug = slug.replace("'", '')
    slug = slug.replace('"', '')
    slug = slug.replace(":", '')
    slug = slug.replace(".", '')
    slug = slug.replace("/", '')
    slug = slug.replace("?", '')
    slug = slug.replace(")", '')
    slug = slug.replace("(", '')
    slug = slug.replace(" ", "-")
  }

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

export const translatedStrings = async (string) => {

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

export const removeStartingAndEndingQuote = (string) => {
  if(!string) return ''

  string = string.trim()

  if(string.startsWith('"')) string = string.slice(1)
  if(string.endsWith('"')) string = string.slice(0, -1)

  return string
}    


export const generateEvenlySpacedDates = (startDate, endDate, amount) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (start >= end || amount <= 0) {
    return []
  }

  const dateArray = [start]
  const timeDifference = end.getTime() - start.getTime()
  const interval = timeDifference / (amount - 1)

  for (let i = 1; i < amount; i++) {
    const nextDate = new Date(start.getTime() + i * interval)
    dateArray.push(nextDate)
  }

  return dateArray
}

export const monthsBetweenDates = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error('Invalid input: both arguments must be Date objects')
  }

  const yearDiff = date2.getFullYear() - date1.getFullYear()
  const monthDiff = date2.getMonth() - date1.getMonth()
  const totalMonths = yearDiff * 12 + monthDiff

  // Check if date2 is after the same day of the month as date1
  if (date2.getDate() >= date1.getDate()) {
    return totalMonths
  } else {
    return totalMonths - 1
  }
}

export const getDateXMonthsFromStartDate = (startDate, monthsFrom) => {
  if (!(startDate instanceof Date)) {
    throw new Error('Invalid input: startDate must be a Date object')
  }

  if (typeof monthsFrom !== 'number') {
    throw new Error('Invalid input: monthsFrom must be a number')
  }

  const newDate = new Date(startDate)
  newDate.setMonth(startDate.getMonth() + monthsFrom)
  
  // Check for month overflow
  if (newDate.getMonth() !== (startDate.getMonth() + monthsFrom) % 12) {
    newDate.setDate(0) // Set to last day of previous month
  }

  return newDate
}