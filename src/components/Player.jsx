import { useState } from 'react'

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditing(){
        setIsEditing(!isEditing);
        onChangeName(symbol, playerName);
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }

    return(
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {
                    isEditing ? <input type="text" required value={playerName} onChange={handleChange}/> 
                    : <span className="player-name">{playerName}</span>
                }
                
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditing()}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}