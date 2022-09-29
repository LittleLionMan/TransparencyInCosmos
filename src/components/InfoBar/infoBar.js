//import './infoBar.css';
import { info } from '../../data/infoTexts';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


export function InfoBar (props) {
    const keyI = props.props;
    let counter = 0;
    let arr = [];
    info.forEach(element => {
        if (element.name === keyI) {
            arr = element.data
        }
    })
    
    /* return (
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
    ) */

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="secondary" onClick={handleShow} className="me-2">
          ?
        </Button>
        <Offcanvas 
            show={show} 
            onHide={handleClose} 
            placement='end'
        >
            {
                arr.map(element => {
                    let keys = Object.keys(element);
                    let key = keys[0];
                        counter++;
                            switch(key) {
                                case 'header':
                                    return (
                                        <Offcanvas.Header closeButton as="h3" key={counter}>
                                            <Offcanvas.Title>{element.header}</Offcanvas.Title>
                                        </Offcanvas.Header>
                                    );
                                case 'text':
                                    return (
                                        <Offcanvas.Body key={counter}>{element.text}</Offcanvas.Body>
                                    )
                                default:
                                    return (
                                        <Offcanvas.Body key={counter}>hier lief was falsch</Offcanvas.Body>
                                    )
                            }
                            
                        })
                    }
        </Offcanvas>
      </>
    );
}