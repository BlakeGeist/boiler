import React from 'react'
import axios from 'axios'
import { XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser'

const Movers = ( { companies } ) => {

    const parser = new XMLParser();
let jObj = parser.parse(companies);


    return (
        <div>

        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const options = {
        method: 'GET',
        url: 'https://fidelity-investments.p.rapidapi.com/market/get-movers',
        headers: {
          'X-RapidAPI-Host': 'fidelity-investments.p.rapidapi.com',
          'X-RapidAPI-Key': 'f0e8153803msh7efbc70383f5751p1baaecjsn6c32aa1b3e5a'
        }
      };
      
      const companies = await axios.request(options).then(function (response) {


          return response.data
      }).catch(function (error) {
          console.error(error);
      });
  
    return { props: { companies: companies || null  } }
  }

export default Movers