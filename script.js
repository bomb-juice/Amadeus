const chat = document.getElementById('chat');
const box = document.getElementById('box');

function addLine(who, text) {
    const p = document.createElement("p");
    p.className = who;
    p.textContent = text;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
        }

        // CHATBOT
function reply (message) {
        return "You said: " + message; // replace later
}

function send() {
    const text = box.value.trim();
    if (!text) return;
    addLine("you", text);
    box.value = "";
    setTimeout(() => addLine("kurisu", reply(text)), 600);
}

document.getElementById('send').onclick = send;
box.addEventListener("keydown", e => { if (e.key === "Enter") send() });

// block glitches
function glitch() {
    const n = 1 + Math.floor(Math.random() * 15);
    for (let i = 0; i < n; i++) {
        const b = document.createElement("div");
        const red = Math.random() < 0.5;
        b.style.cssText = `
        position: fixed; z-index: 9995; pointer-events: none;
        left: ${Math.random() * 70}%;
        top: ${Math.random() * 95}%;
        width: ${100 + Math.random() * 300}px;
        height: ${4 + Math.random() * 30}px;
        background: ${red ? 'rgba(170, 0, 0, 0.2)' : 'rgba(225, 85, 85, 0.2)'};
        transform: translateX(${(Math.random() - 0.5) * 100}px);
        mix-blend-mode: screen;
    `;
    document.body.append(b);
    setTimeout(() => b.remove(), 90 + Math.random() * 160);
}
setTimeout(glitch, 600 + Math.random() * 2000);
}
glitch();

// Jitter
function jitter() {
    const x = (Math.random() - 0.5) * 5;
    chat.style.transform = `translateX(${x}px) skewX(${x / 12}deg)`;
    setTimeout(() => chat.style.transform = "", 100 + Math.random() * 300);
    setTimeout(jitter, 1500 + Math.random() * 5000);
}
jitter();