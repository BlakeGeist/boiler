const amazonPaapi = require('amazon-paapi')

const commonParameters = {
    AccessKey: '',
    SecretKey: '',
    PartnerTag: '', // yourtag-20
    PartnerType: 'Associates', // Default value is Associates.
    Marketplace: 'www.amazon.com', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
  }

  const requestParameters = {
    Keywords: 'Harry Potter',
    SearchIndex: 'Books',
    ItemCount: 2,
    Resources: [
      'Images.Primary.Medium',
      'ItemInfo.Title',
      'Offers.Listings.Price',
    ],
  }

export default async function handler(req, res) {

    await amazonPaapi.SearchItems(commonParameters, requestParameters)
        .then((data) => {
            // do something with the success response.
            console.log(data)
            return res.status(200).json(data)

        })
        .catch((error) => {
            // catch an error.
            console.log(error)
        })

}