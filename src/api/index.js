
const TEST_URL = 'https://www.test-cors.org';

export default class Api {
    static getRequest(payload){
        // Promise を return しているが then 節などは返却先ではなく
        // こちら側ですべて書いておき、そこから return したものが
        // 返っていく仕組みになっている
        return fetch(
            TEST_URL,
            {method: 'GET'}
        )
        .then((response) => {
            return response.json();
        })
        .then((jsonParsedObject) => {
            return {result: jsonParsedObject};
        })
        .catch((err) => {
            return {error: err};
        });
    }
}
