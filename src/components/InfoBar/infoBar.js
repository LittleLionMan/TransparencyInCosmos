import './infoBar.css';
import { useState } from 'react';
import { info } from '../../data/infoTexts';

export function InfoBar (props) {
    const [isShown, setIsShown] = useState(false);
    const keyI = props.props;
    let arr = []
    info.forEach(element => {
        if (element.name === keyI) {
            arr = element.data
        }
    })

    return (
        <div className="barButton-container">
            <button
                onClick={() => setIsShown(!isShown)}
            >?</button>
            {isShown && (
                <div className="InfoBar-container">
                    {
                        arr.map(element => {
                            let keys = Object.keys(element);
                            let key = keys[0];
                            switch(key) {
                                case 'header':
                                    return (
                                        <h2>{element.header}</h2>
                                    );
                                case 'text':
                                    return (
                                        <p>{element.text}</p>
                                    )
                                default:
                                    return (
                                        <p>hier lief was falsch</p>
                                    )
                            }
                            
                        })
                    }
                </div>
            )}
        </div>
    )
}