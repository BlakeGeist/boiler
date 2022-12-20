import axios from 'axios'
import { firebaseDb } from './firebase.js'
import { doc, setDoc } from "firebase/firestore" 

const importSets = async () => {

    let page = 1
    let hasMoreResults = true

    while (hasMoreResults) {

        const params = {
            key: 'b89d03b33e20e94a8b5be246a589f29b',
            page: page,
            page_size: 1000
        }
        
        await axios.get('https://rebrickable.com/api/v3/lego/sets/', { params })
            .then((res) => {
                console.log(page)
                const sets = res.data.results
    
                for(const set of sets) {
                    console.log(set)
                    setDoc(doc(firebaseDb, "sets", set.set_num), set)
                }
                
                console.log(res.data.results.length)
                page++
                console.log(page)
                if(res.data.results.length == 0) hasMoreResults = false                
            })
            .catch(e => {
                console.log(e)
                hasMoreResults = false
            })
    }
}

importSets()