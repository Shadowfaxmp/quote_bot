export function getRandomSunQuote() {
    const quoteList = [
        "He will win who knows when to fight and when not to fight.",
        "In the midst of chaos, there is also opportunity.",
        "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.",
        "If you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.",
        "The greatest victory is that which requires no battle.",
        "Quickness is the essence of the war.",
        "Even the finest sword plunged into salt water will eventually rust.",
        "There is no instance of a nation benefiting from prolonged warfare.",
        "Who wishes to fight must first count the cost.",
        "You have to believe in yourself.",
        "Build your opponent a golden bridge to retreat across.",
        "One may know how to conquer without being able to do it.",
        "The wise warrior avoids the battle.",
        "Great results can be achieved with small forces.",
        "Opportunities multiply as they are seized.",
        "Wheels of justice grind slow but grind fine.",
        "Be where your enemy is not."
    ]
    return quoteList[Math.floor(Math.random() * quoteList.length)];
}

export function getRandomTechnoQuote() {
    const quoteList = [
        "Revolution waits for no man",
        "And nothing of value was lost.",
        "Everyone else should die, it's a genocide route",
        "Before you ask: yes, my parents are disappointed",
        "Let's stab this guy to death.",
        "If you see twins just kill one of them. Gets rid of a lot of confusion.",
        "That man had a family and its just gone now",
        "Genocide run, let's go!",
        "I don't understand, how are women so short, how have they survived?",
        "I have been lied to",
        "I immediately headed to the safest place I knew, Afghanistan",
        "It is only with a worthy rival that one can reach their fullest potential.",
        "I've seen Irish famines with more potatoes than this"
    ]
    return quoteList[Math.floor(Math.random() * quoteList.length)];
}
export function getRandomQuote() {
    const isTechno = Math.random() < .5;
    return isTechno
        ? {quote: getRandomTechnoQuote(), author: 'Technoblade'}
        : {quote: getRandomSunQuote(), author: 'Sun Tzu'};
}