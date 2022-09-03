import './spoilerBar.css';
import leftFinger from '../../data/pics/pointing-left-finger-svgrepo-com.svg';
import downFinger from '../../data/pics/pointing-down-finger-svgrepo-com.svg';

import { useState } from 'react';

export function SpoilerBar(props) {
    const [isShown, setIsShown] = useState(true);
    function changeSpoiler() {
        const container = document.getElementById(props.containerName);
        if (container.style.display === 'block') {
            container.style.display = 'none'; 
            setIsShown(!isShown);
        } else {
            container.style.display = 'block';
            setIsShown(!isShown);
        }
        
    }

    return (
        <div className='spoilerBar'
            onClick={changeSpoiler}
        >
            <h2>{props.name}</h2>
            <img 
                src={isShown ? leftFinger : downFinger} 
                alt='Pointer'
            />
        </div>
    )
}