import {
    Col,
    CardBody,
    CardGroup,
    Card,
    CardTitle,
    CardImg,
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Photo({ albumdata }) {
    const [modal, setModal] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [titleValue, setTitle] = useState();

    const toggle = (url, title) => {
        setModal(!modal);
        setImageUrl(url);
        setTitle(title);
    };
    return (
        <Col xl="2" md="3" sm="4" xs="6">
            <CardGroup>
                <Card className="card-data">
                    <CardImg
                        alt="Card image cap"
                        src={albumdata.thumbnailUrl}
                        top
                        width="100%"
                        onClick={() => toggle(albumdata.url, albumdata.title)}
                    />
                    <CardBody>
                        <CardTitle className="card-title">
                            {albumdata.title}
                        </CardTitle>
                    </CardBody>
                </Card>
                <Modal
                    isOpen={modal}
                    toggle={toggle}
                    className="modal-container"
                    fullscreen
                >
                    <ModalHeader toggle={toggle}>{titleValue}</ModalHeader>
                    <ModalBody className="d-flex flex-column justify-content-center align-items-center">
                        <img src={imageUrl} alt={albumdata.id} />
                    </ModalBody>
                </Modal>
            </CardGroup>
        </Col>
    );
}
export default Photo;
