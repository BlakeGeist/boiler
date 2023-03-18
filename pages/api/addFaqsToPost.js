
import { promptResponse } from 'utils/apiHelpers'
import { addDoc, collection } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'

export default async function handler(req, res) {
    const { host, prompt, slug } = req.query

    const faqsPrompt = `Create 5 unique frequently asked questions and answers related to the previous ${prompt} article`

    const faqsResponse = await promptResponse(faqsPrompt)

    const faqsArray = faqsResponse.split(/\r?\n/)
    const faqsAsArrayItems = faqsArray.map(faq => {if(faq.length > 0) return faq}).filter(Boolean)

    const faqs = await faqsAsArrayItems.map((faq, i) => {
        if(i % 2 !== 0) return 

        const cleanAnswer = (string) => {
            if(!string) return ''
            if(string.startsWith('Answer: ')) string = string.slice(8)
            if(string.startsWith('Answer:')) string = string.slice(7)
            if(string.startsWith('A: ')) string = string.slice(3)
            if(string.startsWith('A:')) string = string.slice(2)
            if(string.startsWith('A')) string = string.slice(1)
            if(string.startsWith(`${i+1}: `)) string = string.slice(3)
            if(string.startsWith(`${i+1}:`)) string = string.slice(2)
            if(string.startsWith(`${i+1}`)) string = string.slice(1)

            return string
        }

        const cleanQuestion = (string) => {
            string = string.slice(3)
            return string
        }

        const tempFaq = {
            question: cleanQuestion(faq),
            answer: cleanAnswer(faqsAsArrayItems[i+1])
        }
        return tempFaq
    }).filter(Boolean)

    faqs.forEach(faq => {
        addDoc(
            collection(firebaseDb, "sites", host, "posts", slug, "faqs"),
            faq
        )
    })

    res.status(200).json(faqs)
}