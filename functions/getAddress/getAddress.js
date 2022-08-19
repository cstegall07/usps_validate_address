// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

const fetch = require('node-fetch')

const USER_ID = process.env.REACT_APP_USERID;
console.log (USER_ID)
const BASE_URI =
  "https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=";
const config = {
  headers: {
    "Content-Type": "text/xml",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET",
  },
  method: "get",
};

exports.handler = async function (event, context) {
 
  const zipcode = event.queryStringParameters.zipcode;
  const address1 = event.queryStringParameters.address1;
  const address2 = event.queryStringParameters.address2;
  const city = event.queryStringParameters.city;
  const state = event.queryStringParameters.state;


  // The xml variable is the string we are going to send to the
  // USPS to request the information
  const xml = `<AddressValidateRequestUSERID=${USER_ID}><Address><Address1>${address1}</Address1><Address2>${address2}</Address2><City>${city}</City><State>${state}</State><Zip5>${zipcode}</Zip5></Address></AddressValidateRequest>`;
  try {

    const response = await fetch(`${BASE_URI}${xml}`, config);
    
    if (!response.ok) {
     
      return { statusCode: response.status, body: response };
    }
   
    const data = await response.text();
   
    return {
      statusCode: 200,
      body: data,
    };
   
  } catch (err) {
    console.log("Error: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
