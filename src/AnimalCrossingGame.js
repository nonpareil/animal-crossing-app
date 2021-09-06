import React, { useEffect, useState } from "react";
import villagers from "./VillagerList";

export default function GameFunction(){
    const [showScore, setShowScore] = useState(false);
    const [newName, setNewName] = useState('');
    const handleChange = ({ target }) => {
    const value = target.value;
    setNewName(value);
    }

    const [allNames, setAllNames] = useState([]);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter'){ 
            setAllNames((prev) => [newName, ...prev]);
            setNewName('');
        }
    };

    const [showInput, setShowInput] = useState(false);
    const handleStart = () =>{
        setShowInput(true);
        setSeconds(120);
        setShowScore(false);
    }

    const [seconds, setSeconds] = useState(120);
    const [buttonText, setButtonText] = useState('Start');
    const [matches, setMatches] = useState(0);
    const villagerNames = villagers.map(villagers => villagers.toLowerCase());
    useEffect(() => {
        const compareNames = () => {
            for (var i=0; i < allNames.length; i++){
                if (villagerNames.includes(allNames[i].toLowerCase())){
                    setMatches(matches => matches + 1);
                }
            }
            setShowScore(true);
        }

        let interval = null;
        if (showInput){
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);

            if (seconds === 0) {
                setShowInput(false);
                clearInterval(interval);
                setButtonText('Play Again');
                compareNames();
            }
        } 
   
        return () => clearInterval(interval);        
    }, [showInput, seconds, allNames, villagerNames]);

    return (
        <div style={{textAlign: 'center'}}>
            <p>You have 2 minutes to enter as many Animal Crossing villager names as you can remember!</p>
            <button onClick={handleStart} style={{display: showInput ? 'none': ''}} >{buttonText}</button>
            <input type="text" value={newName} onKeyPress={handleKeyPress} onChange={handleChange} style={{display: showInput ? '' : 'none'}} />
            <p style={{display: showScore ? '': 'none'}}>You successfully named {matches} villagers!</p>
        </div>
    )
}