//import './infoBar.css';
import { info } from '../../data/infoTexts';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export function InfoBar (props) {
    const keyI = props.props;
    let counter = 0;
    let arr = [];
    info.forEach(element => {
        if (element.name === keyI) {
            arr = element.data
        }
    })
    
    return (
        <OverlayTrigger
            trigger="click"
            rootClose={true}
            placement='bottom'
            overlay={
                <Popover>
                    {
                        arr.map(element => {
                            let keys = Object.keys(element);
                            let key = keys[0];
                            counter++;
                            switch(key) {
                                case 'header':
                                    return (
                                        <Popover.Header as="h3" key={counter}>{element.header}</Popover.Header>
                                    );
                                case 'text':
                                    return (
                                        <Popover.Body key={counter}>{element.text}</Popover.Body>
                                    )
                                default:
                                    return (
                                        <Popover.Body key={counter}>hier lief was falsch</Popover.Body>
                                    )
                            }
                            
                        })
                    }
                </Popover>
          }
        >
            <Button variant="secondary">?</Button>
        </OverlayTrigger>
    )
}