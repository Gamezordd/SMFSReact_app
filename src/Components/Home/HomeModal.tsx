import React from 'react';
import { Modal } from 'react-bootstrap';
import { postType } from './HomeComponent';
import { RenderPieChart } from './RenderPieChart';
import { PointsList } from './RenderpointsList';

interface IProps {
    open: boolean;
    toggle: () => void;
    post: postType;
}

export const HomeModal = (props: IProps) =>{
    return(
        <Modal show={props.open} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.post.company}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row" style={{paddingLeft: "16px"}}>
                    <h4> {props.post.name} </h4>
                </div>
                <div className="row" style={{padding: "16px"}}>
                    {props.post.details}
                </div>
                <div className="row" style={{padding: "10px"}}>
                    <div className="col-6">
                        <RenderPieChart pointsBreakup={props.post.pointsBreakup}/>
                    </div>
                    <div className="col-6" style={{maxHeight:"250px", overflowY:"auto"}}>
                        <PointsList pointsBreakup={props.post.pointsBreakup} />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}