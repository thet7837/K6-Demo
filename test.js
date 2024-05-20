import http from 'k6/http';

export const options={
vus : 3,
duration: '5s'
};

export default function(){
    http.get('http://test.k6.io');

}