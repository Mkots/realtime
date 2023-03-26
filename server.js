import { WebSocketServer } from 'ws';
import {v4 as uuid} from "uuid";
import {writeFile} from 'fs';

const wss = new WebSocketServer({port: 8000});
const clients = {};
const messages = [];

wss.on('connection', (ws) => {
    const id = uuid();
    clients[id] = ws;

    console.log(`New client: ${id}`);

    ws.send(id);
    ws.send(JSON.stringify(messages));

    ws.on('message', (msg) =>{
        const {name, message, me} = JSON.parse(msg);
        console.log(`${name}: ${message}`);
        messages.push({name, message});

        for(const id in clients){
            clients[id].send(JSON.stringify([{name, message, me}]))
        }
    })

    ws.on('close', () =>{
        delete clients[id];
        console.log(`Client ${id} is closed`);
    })
})

process.on('SIGINT', () => {
    wss.close();
    writeFile('log', JSON.stringify(new Date()), err => {
        if(err){
            console.error(err)
        }
        process.exit();
    })
})