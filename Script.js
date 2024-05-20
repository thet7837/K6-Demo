import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
//export const options = {
//  vus: 2,
//  duration: '10s',
//};
export default function () {

  const get_params = {
    Headers: {
      'Content-Type': 'application/json'
    
    }

  };

  const payload1 = JSON.stringify({

    'grant_type': 'client_credentials',
    'client_id': '##',
    'client_secret': '##'

  });
  

  const res = http.post('https://api-gateway-qa.sysco.com/token', payload1,get_params);

  const token = res.json().access_token;
  console.log("Test : "+token);

  const params2 = {
    Headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  };

  const payload = JSON.stringify({

    source_system: "FP", 
    bill_to_records: [{ 
      bill_to_number: "352450", 
      opco_id: "277", 
      err_code: "0543", 
      err_desc: "Error in Address Line 1" }]

  });

  const res1 = http.post('https://api-gateway-qa.sysco.com/services/cmdm-error-api-v1/customers/error-billtos', payload, params2)



}
