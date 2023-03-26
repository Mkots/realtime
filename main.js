import {renderMessage} from "./src/renderMessage.js";
import {$} from "./src/selector.js";

let me;
const ws = new WebSocket('ws://206.81.27.62:8080');

ws.onmessage = (msg) => {
    try {
        JSON.parse(msg.data).forEach(data => {
            renderMessage(data, data.me === me, "#chat");
        })
    } catch (e) {
        me = msg.data;
        console.log('|>', e);
        console.log('|>', me);
    }

}

const form = $('#messageForm');

const sendMessage = (event) => {
    event.preventDefault();
    const [name, message] = [event.target.name.value, event.target.text.value];
    event.target.name.disabled = true;
    event.target.text.value = '';
    ws.send(JSON.stringify({name, message, me}))
    return false;
}

form.addEventListener('submit', sendMessage)

