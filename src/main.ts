import { pokemon } from "./pokemon_db.js"
import { GetPhrase } from "./phrases_db.js";
const container = document.createElement("div");
document.body.onload = ()=>{document.body.appendChild(container)};
type Pokemon = {
    name:string,
    attack:number,
    defense:number,
    speed:number,
    hp:number,
    initialHp:number,
    id:string
}
const program_log:string[] = []
const tag_log:string[] = []
const log = async (tag:string='p', ...args:any) => {
    if (args.length == 0) {
        console.log("")
        program_log.push("\n")
        tag_log.push("p");
    }
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
        program_log.push(args[i]);
        tag_log.push(tag);
    }
}

const logError = (err:string): never => {
    let errorLog = document.createElement("h2");
    errorLog.textContent = "An error has ocurred. Check console for details...";
    container.appendChild(errorLog)
    if (err === "")
    {
        throw new Error("An error has ocurred...");
    }
    throw new Error(err);
}
const names:string[] = pokemon();

const random = (max:number, min:number=0):number => {
    return Math.floor(Math.random() * max) + min;
}

const generatePokemon = (): Pokemon => {
    let name:(string | undefined) = names[random(names.length)];
    if (typeof name === "undefined") 
        name = "Unknown Pokemon #" + random(9999, 999);
    let hp = random(250, 50);
    let maxHP = hp;
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let id:string = "";
    let idLength:number = 6;
    for (let i = 0; i < idLength; i++) {
        if (random(2) == 0) {
            // choose number digit
            id += random(10);
        }
        else {
            // choose letter
            let letter:(string | undefined) = alphabet[random(alphabet.length)]
            if (random(2) == 0) {
                // choose uppercase
                if (typeof letter === "undefined") {
                    id += "A"
                }
                else {
                    id += letter.toUpperCase();
                }
            }
            else {
                // choose lowercase
                if (typeof letter === "undefined") {
                    id += "a"
                }
                else {
                    id += letter;
                }
            }
        }
    }
    return {
        name: name,
        attack: random(250, 1),
        defense: random(150, 1),
        speed: random(200, 1),
        hp: hp,
        initialHp: maxHP,
        id:id
    }
}

const showPokemon = (p: (Pokemon|string|undefined)):void => {
    if (typeof p === "string") {
        log("h4", p)
    }
    else {
    log("h3", "📒 " + p?.name.toUpperCase())
    log("h4", "❤️ HP: " + p?.hp)
    log("h4", "⚔️ Attack: " + p?.attack)
    log("h4", "🛡️ Defense: " + p?.defense)
    log("h4", "🍃 Speed: " + p?.speed)
    log("h4", "🪪 ID: " + p?.id)
    }
}

const battle = (p1:(Pokemon | undefined), p2:(Pokemon | undefined), stackSize:number=0):(Pokemon | string | undefined) => {
    if (stackSize == 0) {
        log()
        log()
        showPokemon(p1)
        log()
        showPokemon(p2)
        log()
        log()
    }
    let p1HpAfterHurt:number;
    let phrase:string = "";
    if (typeof p1 === "undefined" || typeof p2 == "undefined") {
        logError("An error ocurred during battle");
    }
    else
    {
    if (p1.speed > p2.speed) {
        if (stackSize == 0) {
            let p = GetPhrase("speed", p1.name, p2.name);
            if (typeof p !== "undefined"){
                phrase = p;
            } 
            log("h5", phrase)
        }
        if (random(10) + Math.floor(p1?.speed / p2.speed) > 8) {
            let p = GetPhrase("evade", p1.name, p2.name);
            if (typeof p !== "undefined"){
                phrase = p;
            } 
            log("h5", phrase)
            p1HpAfterHurt = p1.hp;
        }
        else
        {
            let p = GetPhrase("attack", p2.name, p1.name);
            if (typeof p !== "undefined")
            {
                phrase = p;
            } 
            log("h5", phrase)
            if (p2.attack - p1.defense < 0)
            {
                p1HpAfterHurt = p1.hp - Math.floor(p2.attack / 5);
                let p = GetPhrase("defense", p1.name, p2.name);
                if (typeof p !== "undefined")
                {
                    phrase = p;
                } 
                log("h5", phrase)
            }
            else
            {
                p1HpAfterHurt = p1.hp - (p2.attack - p1.defense)
            }
        }
    }
    else
    {
        let p = GetPhrase("attack", p2.name, p1.name);
        if (typeof p !== "undefined")
        {
            phrase = p;
        } 
        log("h5", phrase)

        if (p2.attack - p1.defense < 0)
        {
            p1HpAfterHurt = p1.hp - Math.floor(p2.attack / 5);
            let p = GetPhrase("defense", p1.name, p2.name);
            if (typeof p !== "undefined")
            {
                phrase = p;
            } 
            log("h5", phrase)
        }
        else
        {
            p1HpAfterHurt = p1.hp - (p2.attack - p1.defense)
        }
    }

    let p2HpAfterHurt:number;
    if (p2.speed > p1.speed) {
        if (stackSize == 0) {
        let p = GetPhrase("speed", p2.name, p1.name);
            if (typeof p !== "undefined"){
                phrase = p;
            } 
            log("h5", phrase)
        }
        if (random(10)  + Math.floor(p2.speed / p1.speed) > 8) {
            let p = GetPhrase("evade", p2.name, p1.name);
            if (typeof p !== "undefined"){
                phrase = p;
            } 
            log("h5", phrase)
            p2HpAfterHurt = p2.hp;
        }
        else
        {
            let p = GetPhrase("attack", p1.name, p2.name);
            if (typeof p !== "undefined")
            {
                phrase = p;
            } 
            log("h5", phrase)
            if (p1.attack - p2.defense < 0) 
            {
                let p = GetPhrase("defense", p2.name, p1.name);
                if (typeof p !== "undefined")
                {
                    phrase = p;
                } 
                log("h5", phrase)
                p2HpAfterHurt = p2.hp - Math.floor(p1.attack / 5);
            }
            else 
            {
                p2HpAfterHurt = p2.hp - (p1.attack - p2.defense)
            }
        }
    }
    else
    {
        let p = GetPhrase("attack", p1.name, p2.name);
        if (typeof p !== "undefined")
        {
            phrase = p;
        } 
        log("h5", phrase)
        if (p1.attack - p2.defense < 0) 
        {
            p2HpAfterHurt = p2.hp - Math.floor(p1.attack / 5);

            let p = GetPhrase("defense", p2.name, p1.name);
            if (typeof p !== "undefined")
            {
                phrase = p;
            } 
            log("h5", phrase)
        }
        else
        {
            p2HpAfterHurt = p2.hp - (p1.attack - p2.defense)
        }
    }

    if (p1HpAfterHurt <= 0) {
        p1HpAfterHurt = 0;
        if (p2HpAfterHurt <= 0) {
            p2HpAfterHurt = 0;
            // Tie
            p1.hp = p1.initialHp;
            p2.hp = p2.initialHp;
            if (stackSize > 15) {
                log("h2", "Both Pokemon Tied! 😮");
                return "TIE";
            }
            return battle(p1, p2, stackSize + 1);
        }
        else {
            p2.hp = p2HpAfterHurt;
            log("h2", "🏆 " + p2.name.toUpperCase() + " wins!");
            return p2;
        }
    }
    else if (p2HpAfterHurt <= 0) {
        p2HpAfterHurt = 0;
        p1.hp = p1HpAfterHurt;
        log("h2", "🏆 " + p1.name.toUpperCase() + " wins!");
        return p1;
    }
    else {
        p1.hp = p1HpAfterHurt;
        p2.hp = p2HpAfterHurt;
        if (stackSize > 15) {
            log("h2", "Both Pokemon Tied! 😮");
            return "TIE";
        }
        return battle(p1, p2, stackSize + 1);
    }
    }
}

const fillTeam = (pokemonQuantity:number) => {
    let pokemonsToReturn:Pokemon[] = [];
    for (let i = 0; i < pokemonQuantity; i++) {
        pokemonsToReturn.push(generatePokemon());
    }
    return pokemonsToReturn;
}

type Team = {
    trainer:string,
    team:Pokemon[]
}

const showTeamStatus = (team:Team, showHp:boolean=false, flag:string="", mustShowTrainer:boolean=true) =>
{
    if (mustShowTrainer) log("h3", team.trainer + "'s team:");
    for (const p of team.team)
    {
        if (showHp)
        {
        log("h3", p.name + " - ❤️ " + p.hp + " HP")
        }
        else
        {
            log("h3", p.name + " " + flag)
        }
    }
    log()
}
let textFile:any = null;
const downloadLog = (fileDir:string):void => {
    var data = new Blob(program_log, {type:'text/plain;charset=UTF-8'});

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    let link = document.createElement("a");
    link.href = textFile;
    document.body.append(link);
    link.target = "_blank";
    link.download = fileDir;
    link.click();
    document.body.removeChild(link);
}


const writeMatchUI = (): void => {
    let i = 0;
    const write = () =>
    {
        let text_to_display:(string | undefined);
        let tag:(string | undefined);
        if (tag_log.length == program_log.length)
        {
            text_to_display = program_log[i];
            tag = tag_log[i];
        }
        let element:any;
        if (typeof tag !== "undefined") {
            element = document.createElement(tag);
            element.textContent = text_to_display;
        }
        container.append(element);
        i++;
        if (i >= program_log.length) {
            clearInterval(x);
        }
    }
    i = 0;
    let x = setInterval(write, 200);
}

const match = (team1:Team, team2:Team, pokemonCount:number=6) => {
    // Chekup if teams are complete
    if (team1.team.length != pokemonCount || team2.team.length != pokemonCount) {
        logError("Match was unable to start! one or both teams do not fill the requisites of having " + pokemonCount + " pokemon to battle! not more not less than that!");
    }
    // Beginning of the match
    let matchRound = 0;
    log("h1", "Welcome to the pokemon battle!")
    log("h2", "Trainers " + team1.trainer + " and " + team2.trainer + " are going to face each other today!");
    log("h2", "Each team will have a total of " + pokemonCount + " possible pokemon to use!");
    log()
    showTeamStatus(team1, true);
    let initialTeam1 = {...team1}
    let initialTeam2 = {...team2}
    showTeamStatus(team2, true);
    log()
    log("h2", "Battle wisely!")
    log("h2", "Let the match begin! ⚔️")
    
    let winner:string = ""

    while (winner === "") {
        matchRound++;
        if (matchRound >= 20) {
            log()
            log("h2", "This match has exceeded the maximum number of rounds (20), so we'll decide the winner by their team's current status");
            log()
            showTeamStatus(team1, true)
            showTeamStatus(team2, true)

            // decide winner, let's go first with the one with the most pokemon remaining
            if (team1.team.length > team2.team.length) {
                log("h3", "Team " + team1.trainer + " has more pokemon remaining!")
                winner = "team 1";
            }
            else if (team2.team.length > team1.team.length) {
                log("h3", "Team " + team2.trainer + " has more pokemon remaining!")
                winner = "team 2";
            }
            else
            {
                // let's decide this by total remaining hp in pokemon compared to total hp
                
                    const team1Hps = team1.team.map((p) => p.hp);
                    const team1MaxHps = team1.team.map((p) => p.initialHp);
                    const remainingHpTeam1 = team1Hps.reduce((curr, prev)=> curr + prev)
                    const MaxHpTeam1 = team1MaxHps.reduce((curr, prev)=> curr + prev)
                    const team1HpPerc = Math.floor(remainingHpTeam1 / MaxHpTeam1 * 100);
                    log("h3", "Team " + team1.trainer + " has remaining " + remainingHpTeam1 + " HP of a total of " + MaxHpTeam1 + " HP");
                    log("h3", "That is " + team1HpPerc + "% of their total HP ❤️‍🩹");

                    const team2Hps = team2.team.map((p) => p.hp);
                    const team2MaxHps = team2.team.map((p) => p.initialHp);
                    const remainingHpTeam2 = team2Hps.reduce((curr, prev)=> curr + prev)
                    const MaxHpTeam2 = team2MaxHps.reduce((curr, prev)=> curr + prev)
                    const team2HpPerc = Math.floor(remainingHpTeam2 / MaxHpTeam2 * 100);
                    log("h3", "Team " + team2.trainer + " has remaining " + remainingHpTeam2 + " HP of a total of " + MaxHpTeam2 + " HP");
                    log("h3", "That is " + team2HpPerc + "% of their total HP ❤️‍🩹");

                    if (team1HpPerc == team2HpPerc) {
                        winner = "Tie";
                        log("h2", "It's a draw! How incredible! 🏆");
                        writeMatchUI();
                        continue;
                    }
                    winner = team1HpPerc > team2HpPerc ? "team 1":"team 2";
            }
            continue;
        }
        log()
        log()
        log("h2", "Round " + matchRound)
        const pokemonInBattle1 = team1.team[random(team1.team.length)]
        const pokemonInBattle2 = team2.team[random(team2.team.length)]
        log("h3", team1.trainer + "'s " + pokemonInBattle1?.name + " vs. " + team2.trainer + "'s " + pokemonInBattle2?.name)
        const winnerPokemon = battle(pokemonInBattle1, pokemonInBattle2)
        if (typeof winnerPokemon !== "string" && typeof winnerPokemon !== "undefined")
        {
            if (winnerPokemon.id == pokemonInBattle1?.id)
            {
                team2.team = team2.team.filter((p) => p != pokemonInBattle2);
            }
            else if (winnerPokemon.id == pokemonInBattle2?.id)
            {
                team1.team = team1.team.filter((p) => p != pokemonInBattle1);
            }
        }
        if (team1.team.length == 0)
        {
            winner = "team 2";
        }
        if (team2.team.length == 0)
        {
            winner = "team 1"
        }
    }
    if (winner == "team 1") {
        log("h2", "Congratulations! We have a winner...");
        log("h2", "Our new champion is... " + team1.trainer + "! 🏆")
        log("h2", "And his incredible team conformed up by: ")
        showTeamStatus(initialTeam1, false, "🏆", false);
        console.log(initialTeam1);
        log("h2", "Give them a round applause! 👏");
        writeMatchUI();
    }
    else if (winner == "team 2") {
        log("h2", "Congratulations! We have a winner...");
        log("h2", "Our new champion is... " + team2.trainer + "! 🏆")
        log("h2", "And his incredible team conformed up by: ")
        showTeamStatus(initialTeam2, false, "🏆", false);
        console.log(initialTeam2);
        log("h2", "Give them a round applause! 👏");
        writeMatchUI();
    }
}
let trainer1:any;
let trainer2:any;
let pokemonQty:number = 6;
const setup = () => {
    while (typeof trainer1 !== "string")
        trainer1 = prompt("Introduce your trainer name: ");
    console.log(trainer1 + " registered correctly!")
    while (typeof trainer2 !== "string")
        trainer2 = prompt("Introduce your rival's trainer name: ");
    console.log(trainer2 + " registered correctly!")
    let pokemonQtyString;
    while (typeof pokemonQtyString !== "string") {
        
        pokemonQtyString = prompt("Introduce the amount of pokemon to battle with: ");
    }
        pokemonQty = parseInt(pokemonQtyString);
        if (Number.isNaN(pokemonQty) || pokemonQty > 6){
            pokemonQty = 6;
        }
        if (pokemonQty < 1) {
            pokemonQty = 1;
        }
    console.log("Playing with " + pokemonQty + " pokemon each!")

}

setup();
const myTeam:Team = {
    trainer:trainer1,
    team:fillTeam(pokemonQty),
}
const rivalTeam = {
    trainer:trainer2,
    team:fillTeam(pokemonQty)
}


match(myTeam, rivalTeam, pokemonQty)
// if (confirm("Do you want to download the battle log?")) downloadLog("battle_log.txt");