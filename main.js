import {connect, StringCodec} from "nats.ws";
import {v4 as uuid} from "uuid";

import {$} from "./src/selector.js";
import {renderMessage} from "./src/renderMessage.js";

const nc = await connect({
    servers:["ws://127.0.0.1:8080"]
});
const sc = StringCodec();
const me = uuid();

const chat = nc.subscribe("chat");

(async () => {
    for await (const m of chat) {
        console.log(`[${chat.getProcessed()}]: ${sc.decode(m.data)}`);
        const data = JSON.parse(sc.decode(m.data));
        renderMessage(data, data.me === me, "#chat");
    }
    console.log("subscription closed");
})();

const form = $('#messageForm');

const sendMessage = (event) => {
    event.preventDefault();
    const [name, message] = [event.target.name.value, event.target.text.value];
    event.target.name.disabled = true;
    event.target.text.value = '';
    const payload = JSON.stringify({name, message, me});
    nc.publish("chat", sc.encode(payload))
    return false;
}

form.addEventListener('submit', sendMessage)
