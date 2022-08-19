import React, { useState, useEffect } from 'react';


function App() {
  const intialAddress = {address1: "", address2: "", city: "", state: ""};
  const [zipcode, setZipcode] = useState("")
  const [address, setAddress] = useState(intialAddress)

  useEffect(() => {

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/getAddress?address1=${address.address1}&address2=${address.address2}&city=${address.city}&state=${address.state}&zipcode=${zipcode}`,
          { headers: { accept: "application/json" } }
        );
        const data = await response.text();
        console.log(data)

        setAddress({...address, address1:"", address2:"", city:"", state:""})
  
      
    } catch (e){
      console.log(e)
    }
  }; fetchAddress();
  })
  return (
    <div className="App">
      <h1>Goodr Verify Address</h1>
      <form action="" className="form-data">
        <label htmlFor="addr1">Address 1</label>
        <input
          className="addr1"
          value={address.address1}
          placeholder="Street Number"
          type="text"
          name="addr1"
          id="addr1"
          />
        <label htmlFor="addr2">Address 2</label>
        <input
          className="addr2"
          value={address.address2 || ""}
          placeholder="Apt or Suite #"
          type="text"
          name="addr2"
          id="addr2"
          />
        <label htmlFor="addrcity">City</label>
        <input
          className="addrcity"
          value={address.city || ""}
          placeholder="City"
          type="text"
          name="addrcity"
          id="addrcity"
          />
        <label htmlFor="addrstate">State</label>
        <input
          className="addrstate"
          value={address.state || ""}
          placeholder=""
          type="text"
          name="addrstate"
          id="addrstate"
          />
        <label htmlFor="addrzip5">Zip Code</label>
        <input
          className="addrzip5"
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
          <button
          className="submitBtn"
          > Submit</button>
      </form>
      <pre>
        <code>
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