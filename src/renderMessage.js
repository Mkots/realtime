import {$} from "./selector.js";

export const renderMessage = (data, isMe, targetId) => {
    const clone = document.importNode($("#chat_message").content, true);

    clone.querySelector('.chatBubble').classList.add(isMe ? "from-me" : "from-them")
    clone.querySelector('.chatBubble span').textContent = data.message;
    clone.querySelector('.nickName').textContent = data.name;

    $(targetId).appendChild(clone);
    $(targetId).querySelector("[class*='from-']:last-child").scrollIntoView()
};