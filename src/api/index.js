
const TEST_URL = 'http://localhost:9090/index.html';

export default class Api {
    static getRequest(payload){
        // Promise を return しているが then 節などは返却先ではなく
        // こちら側ですべて書いておき、そこから return したものが
        // 返っていく仕組みになっている
        return fetch(
            TEST_URL,
            {method: 'GET', mode: 'cors'}
        )
        .then((response) => {
            return response.text();
        })
        .then((responseText) => {
            return {result: responseText};
        })
        .catch((err) => {
            return {error: err};
        });
    }
}
