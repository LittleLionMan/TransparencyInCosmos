import './home.css';
import twitter from '../../data/pics/2021 Twitter logo - blue.png';

export function Home() {
    return (
    
        <div className='home'>
            <div className='introText' id='pd'>
                <p>Project description</p>
            </div>
            <div className='contactInfo' id='ci'>
                <a href="https://twitter.com/CosmosTProject"><img src={twitter}  alt="Twitter" id="twitter" /></a>
                <a href="https://discord.gg/HWWjhZ9x"><img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62594fddd654fc29fcc07359_cb48d2a8d4991281d7a6a95d2f58195e.svg"  alt="Discord"id="discord"/></a>
            </div>    
        </div>
       
    )
}