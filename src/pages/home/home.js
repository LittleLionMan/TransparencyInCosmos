import './home.css';
import twitter from '../../data/pics/2021 Twitter logo - blue.png';
import { Search } from '../../components/searchBar/search';

export function Home() {
    return (
    
        <div className='home'>
            <div className='introText' id='pd'>
                <p id="quote">“those who have a why can bear almost any how.”</p>
                <p id="author">Friedrich Nietzsche</p>
                <p>Blockchain has at its core has a revolutionary technology. The ability to see the actions and relationships of all participants of a system in real time. While that data is available for all to see at all times, in practice it is only the most technically savvy among us that can take full advantage of that on chain information.</p>
                <p>The Cosmos Ecosystem has become one of the leading blockchain environments and for good reason. The overall technology of the Cosmos SDK, that allows for the fast and secure communication of separate blockchains, has proven to be robust and effective. The community that the Cosmos has attracted and developed has also become one of the ecosystem's greatest strengths. The powerful debate culture of the Cosmos Ecosystem has proven to be a great asset in pushing innovation, security and vision.</p>
                <p>We at the Cosmos Transparency Project seek to better organize the on chain data of the various blockchains linked by the Cosmos SDK to better inform the community about the 'health' of the ecosystem as a whole. We hope to contribute to the community by offering a space where usable information is accessible and easy to understand so that community members will be better able to make effective individual decisions about governance, decentralization and risk management.We at the Cosmos Transparency Project seek to better organize the on chain data of the various blockchains linked by the Cosmos SDK to better inform the community about the 'health' of the ecosystem as a whole. We hope to contribute to the community by offering a space where usable information is accessible and easy to understand so that community members will be better able to make effective individual decisions about governance, decentralization and risk management.</p>
            </div>
            <Search />
            <div className='contactInfo' id='ci'>
                <a href="https://twitter.com/CosmosTProject"><img src={twitter}  alt="Twitter" id="twitter" /></a>
                <a href="https://discord.gg/HWWjhZ9x"><img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62594fddd654fc29fcc07359_cb48d2a8d4991281d7a6a95d2f58195e.svg"  alt="Discord"id="discord"/></a>
            </div>    
        </div>
       
    )
}