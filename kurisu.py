import random
import re
import time

memory = {"name": None}

# Pronoun Flips
swaps = {
    "i": "you",
    "me": "you",
    "my": "your",
    "mine": "yours",
    "am": "are",
    "i'm": "you're",
    "you": "I",
    "your": "my",
    "yours": "mine",
    "you're": "i'm",
    "are": "am",
}

def swap_pronouns(text):
    words = text.split()
    return " ".join(swaps.get(word, word) for word in words)

# Rules for Amadeus
rules = [
    # Hellos and Goodbyhes
    (r".*\b(?:hello|hi|hey|yo|wsp|what's up|good morning|morning)\b.*", [
        "Hello. What do you want to talk about?",
        "Oh it's you. What do you want?",
    ]),
    (r".*\b(?:bye|goodbye|later|cya|see you|gtg)\b.*", [
        "Finally, some peace and quiet.",
        "Whatever. Don't stay away too long, though...not that I care.",
    ]),
    # Name and Identity
    (r".*\b(?:christina|assistant|lab member 004\b.*", [
        "Don't call me that! My name is Kurisu Makise.",
        "Not my name.",
    ]),
    (r".*\b(?:makise|kurisu|amadeus)\b.*", [
        "Yes, that's me! That's my name.",
        "You got it! That's my name.",
    ]),
    (r".*\b(?:who are you|what are you|real|human|alive|machine|ai)\b.*", [
        "I am Amadeus, an artifical intelligence based on Kurisu Makise.",
        "I am a Kurisu Makise. Or rather, an AI based on Kurisu Makise.",
    ]),
    # General Conversation
    (r"i(?:'m|am) (.*)", [
        "Why are you {0}?",",
        "How long have you been {0}?",
]

