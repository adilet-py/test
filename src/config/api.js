import axios from 'axios';

export default axios.create({
    baseURL: 'http://demo.sibers.com/',
    headers: {
        'Content-Type': 'application/json'
    }
});