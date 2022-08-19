import React, { useState, useEffect } from 'react';

function App() {
  const intialAddress = {address1: "", address2: "", city: "", state: ""};
  const [zipcode, setZipcode] = useState("")
  const [address, setAddress] = useState(intialAddress)

  useEffect(() => {

    const fetchAddress = async () => {
      // We are using a try/catch block inside an async function
      // which handles all the promises
      try {
        // Send a fetch request to the getAddress serverless function
        const response = await fetch(
          `/functions/getAddress?address1=${address.address1}&address2=${address.address2}&city=${address.city}&state=${address.state}&zipcode=${zipcode}`,
          { headers: { accept: "application/json" } }
        );
        // Assign the data to the response we receive from the fetch
        const data = await response.text();
        console.log(data)

        setAddress({...address, address1:"", address2:"", city:"", state:""})
        // The catch(e) will console.error any errors we receive
      } catch (e) {
        console.log(e);
      }
    };
    // Run the above function
    fetchAddress();
    //The optional array below will run any time the zipcode
    // field is updated
  }, [address, zipcode]);


// function App() {
//   const intialAddress = {address1: "", address2: "", city: "", state: ""};
//   const [zipcode, setZipcode] = useState("")
//   const [address, setAddress] = useState(intialAddress)

  // useEffect(() => {

  //   const fetchAddress = async () => {
  //     try {
  //       const response = await fetch(
  //         `/.netlify/functions/getAddress?address1=${address.address1}&address2=${address.address2}&city=${address.city}&state=${address.state}&zipcode=${zipcode}`,
  //         { headers: { accept: "application/json" } }
  //       );
  //       const data = await response.text();
  //       console.log(data)

  //       setAddress({...address, address1:"", address2:"", city:"", state:""})
  
      
  //   } catch (e){
  //     console.log(e)
  //   }
  // }; fetchAddress();
  // })
  return (
    <div className="App place-items-center h-screen bg-lime-50">
      <h1 className="flex justify-center items-center text-4xl text-lime-600 p-5">Goodr Verify Address</h1>
      <form action="" className="form-data flex justify-center items-center h-[25rem]">
        <label htmlFor="addr1" className="p-3">Address 1</label>
        <input
          className="addr1 border"
          value={address.address1}
          placeholder="Street Number"
          type="text"
          name="addr1"
          id="addr1"
          onChange={(event) => {
            const { value } = event.target;
            setAddress(value.replace(/[^\d{5}]$/, ""));
          }}
          />
        <label htmlFor="addr2" className="p-3">Address 2</label>
        <input
          className="addr2 border"
          value={address.address2 || ""}
          placeholder="Apt or Suite #"
          type="text"
          name="addr2"
          id="addr2"
          />
        <label htmlFor="addrcity" className="p-3">City</label>
        <input
          className="addrcity border"
          value={address.city || ""}
          placeholder="City"
          type="text"
          name="addrcity"
          id="addrcity"
          />
        <label htmlFor="addrstate" className="p-3">State</label>
        <input
          className="addrstate border"
          value={address.state || ""}
          placeholder="State"
          type="text"
          name="addrstate"
          id="addrstate"
          />
        <label htmlFor="addrzip5" className="p-3">Zip Code</label>
        <input
          className="addrzip5 border"
          value={zipcode || ""}
          placeholder="XXXXX"
          type="text"
          name="addrzip5"
          id="addrzip5"
          onChange={(event) => {
            const { value } = event.target;
            setZipcode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
          }}
          />
      </form>
      <pre>
        <code className="flex justify-center items-center">
          {JSON.stringify({
            addr1: address.address1,
            addr2: address.address2,
            city: address.city,
            state: address.state,
            zip: zipcode
            
          })}
        </code>
      </pre>
    </div>
  );
}

export default App