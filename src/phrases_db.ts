const speedPhrases1P:string[] = ["is faster than its opponent", "'s speed helps it evade attacks"]
const speedPhrases2P:string[] = ["is faster than", "'s speed is enraging"]

const evasionPhrases1P:string[] = ["just avoided the attack!"]
const evasionPhrases2P:string[] = ["just did an evasion! it is toying with"]


const attackPhrases1P:string[] = ["just landed a hit!", "attacked gracefully", "inflicted damage!"]
const attackPhrases2P:string[] = ["'s attack damaged", "just landed an attack in"]

const defensePhrases1P:string[] = ["endured the attack", "'s defence reduced damage!", "tanked the attack!"]
const defensePhrases2P:string[] = ["reduced damage inflicted by"]

const random = (max:number, min:number=0):number => {
    return Math.floor(Math.random() * max) + min;
}
export const GetPhrase = (type:string, p1Name:string, p2Name:string) => {
    switch(type) {
        case "speed":
            return GetPackage(p1Name, p2Name, speedPhrases1P, speedPhrases2P);
        case "evade":
            return GetPackage(p1Name, p2Name, evasionPhrases1P, evasionPhrases2P);
        case "attack":
            return GetPackage(p1Name, p2Name, attackPhrases1P, attackPhrases2P);
        case "defense":
            return GetPackage(p1Name, p2Name, defensePhrases1P, defensePhrases2P);
    }
}
const GetPackage = (p1:string, p2:string, pack1:string[], pack2:string[]):string => {
    let pack = (random(2) > 0) ? pack1 : pack2;
    let phraseInd = random(pack.length)
    let phrase:string = "";
    if (typeof pack[phraseInd] !== "undefined")
    {
        phrase = pack[phraseInd];
    }
    else
    {
        return "";
    }
    if (!phrase.includes("'s"))
        phrase = p1 + " " + phrase;
    else
        phrase = p1 + phrase;
    if (pack == pack2)
    {
        phrase = phrase + " " + p2;
    }
    return phrase;
}