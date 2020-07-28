import React, { useState } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { RenderPieChart } from "./RenderPieChart";
import { PointsList } from "./RenderpointsList";
import { HomeModal } from "./HomeModal";

type postType = {
  name: string;
  company: string;
  details: string;
  class: string;
  pointsBreakup: [{ category: string; points: number }];
};

interface IProps {
  data: postType;
}

export const CardComponent = (props: IProps) => {
  const [isModalOpen, toggleModal] = useState(false);

  const text = (
    <div className="row">
      <div className="row justify-content-center">
        <div className="col-11 p-0">{props.data.details}</div>
      </div>
      <div className="row justify-content-center col-12 pt-2">
        <div className="col-4 justify-content-center pt-1">
          <RenderPieChart pointsBreakup={props.data.pointsBreakup} />
        </div>
        <div
          className="col-8 justify-content-center pt-1"
          style={{ overflowY: "auto", maxHeight: "200px" }}
        >
          <PointsList pointsBreakup={props.data.pointsBreakup} />
        </div>
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <Col xs="12" sm="6" md="4" lg="3">
        <Card onClick={() => toggleModal(true)} className="mx-auto my-1">
          <Card.Body>
            <div style={{ height: "100px", overflowX: "auto" }}>
              <Card.Title>
                {" "}
                {props.data.name} - {props.data.company}{" "}
              </Card.Title>
              <Card.Subtitle className="text-muted mb-2">
                {" "}
                {props.data.class}{" "}
              </Card.Subtitle>
            </div>
            <Card.Text>
              <Button onClick={() => toggleModal(true)}>Apply</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <HomeModal
        open={isModalOpen}
        toggle={() => toggleModal(false)}
        post={props.data}
      />
    </React.Fragment>
  );
};
