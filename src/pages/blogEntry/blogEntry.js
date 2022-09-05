import './blogEntry.css';
import { blog } from '../../data/blog';
import { useParams } from 'react-router-dom';

export function BlogEntry() {
    const { number } = useParams();
    let counter = 0;
    let arr = blog[number - 1].data;
    
    return (
        <div id='body'>
            {
            arr.map(element => {
                let keys = Object.keys(element);
                let key = keys[0];
                counter++;
                switch(key) {
                    case 'header':
                        return (
                            <h1 key={counter}>{element.header}</h1>
                        );
                    case 'text':
                        return (
                            <p key={counter}>{element.text}</p>
                        );
                    case 'link':
                        return (
                            <a key={counter} href={`${element.link.link}`}>{element.link.text}</a>
                        );
                    case 'image':
                        return (
                            <figure key={counter}>
                                <img 
                                    src={`${element.image.image}`} 
                                    alt='Whoops' 
                                    style={{width: element.image.width}}
                                />
                                <figcaption>{element.image.text}</figcaption>
                            </figure>
                            );
                    default:
                        return (
                            <p key={counter}>unknown key</p>
                        )
                }
                
            })
        }
        </div>
    )
}