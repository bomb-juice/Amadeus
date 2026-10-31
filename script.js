const chat = document.getElementById('chat');
const box = document.getElementById('box');

function addLine(who, text) {
    const p = document.createElement("p");
    p.className = who;
    p.textContent = text;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
        }

// Memory
let memory = { name: null};
try {
    const saved = localStorage.getItem("amadeusMemory");
    if (saved) memory = {...memory, ...JSON.parse(saved)};
} catch (e) {}

function saveMemory() {
    try { localStorage.setItem("amadeusMemory", JSON.stringify(memory));} catch (e) {}
}

// Pronoun Swaps
const swaps = {
    "i": "you", "me": "you", "my": "your", "mine": "yours",
    "am": "are", "i'm": "you're", "you": "i",
    "your": "my", "yours": "mine", "you're": "i'm", "are": "am",
};

function swapPronouns(text) {
    return text.split(" ").map(w=> swaps[w] ?? w).join(" ");
}

function pick (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Rules
const rules = [
    //Names
    [/\b(?:christina|assistant|lab member 004)\b/, [
        "Don't call me that! My name is Kurisu Makise.",
        "Not my name."
    ]],
    [/\b(?:makise|kurisu|amadeus)\b/, [
        "Yes, that's me! That's my name.",
        "You got it! That's my name.",
    ]],

    // Identity
    [/who are you|what are you|are you (?:real|human|alive|a machine|an ai)/, [
        "I am Amadeus, an artificial intelligence based on Kurisu Makise.",
        "I'm an AI built from Kurisu Makise's memories. Does that satisfy you?",
    ]],

    // Hellos and Goodbyes
    [/\b(?:hello|hi|hey|yo|wsp|what's up|good morning|morning)\b/, [
        "Hello. What do you want to talk about?",
        "Oh, it's you. What do you want?",
    ]],

    [/\b(?:bye|goodbye|later|cya|see you|gtg)\b/, [
        "Finally, some peace and quiet.",
        "Whatever. Don't stay away too long, though... not that I care.",
    ]],

    // Echoes
    [/\bi(?:'m| am) (.*)/, ["Why are you {0}?", "How long have you been {0}?"]],
    [/i (?:like|love) (.*)/, ["What is it about {0} that you like?", "Hmph. {0}? Fine, I suppose."]],
    [/i feel (.*)/, ["Why do you feel {0}?", "Since when do you feel {0}? Be specific."]],
    [/i think(.*)/, ["What makes you think {0}?", "Is that a hypothesis, or just a feeling?"]],
    [/i want (.*)/, ["Why do you want {0?", "And what would you do if you got {0}?"]],
    [/i can(?:'t|not) (.*)/, ["Have you actually tried, or are you just assuming?"]],
];

const fallbacks = [
    "Hmm. Can you explain that more scientifically?",
    "That's... not a very precise statement, you know.",
    "Why do you ask?",
    "Interesting.",
    "I'm not sure I follow. Try again.",
];

// Reply
function reply(message) {
    message = message.toLowerCase().trim().replace(/[.!?]+$/,"");

    // Erase Memory
    if (/^(?:forget me|forget everything|reset memory)/.test(message)) {
        memory = {name:null};
        saveMemory();
        return "Fine. Deleted. Not that I wanted to remember you anyway.";
    }

    // User's Name
    let m = message.match(/(?:my name is|call me) (\w+)/);
    if (m) {
        memory.name = m[1][0].toUpperCase() + m[1].slice(1);
        saveMemory();
        return `${memory.name}, huh? I'll remember that.`;
    }

    if (/what(?:'s|is) my name/ .test(message)) {
        return memory.name
            ? `Your name is ${memory.name}. I don't forget things.`
            : "You haven't told me yet.";
    }

    // Pronouns/Name
    for (const [pattern, responses] of rules) {
        const match = message.match(pattern);
        if (match) {
            const groups = match.slice(1).map(g=> swapPronouns(g ?? ""));
            return pick (responses).replace(/\{(\d+)\}/g, (_, i) => groups[i] ?? "");
        }
    }

    if (memory.name && Math.random() < 0.3) {
        return `${memory.name}, I don't follow. Explain it properly.`;
    }

    return pick(fallbacks);
}

function send() {
    const text = box.value.trim();
    if (!text) return;
    addLine("you", text);
    box.value = "";
    const answer = reply(text);
    setTimeout(() => addLine("kurisu", answer), Math.min(500 + answer.length * 30, 2500));
}

document.getElementById('send').onclick = send;
box.addEventListener("keydown", e => { if (e.key === "Enter") send() });

// Block Glitches
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