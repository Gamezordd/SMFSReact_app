import React from "react";
import { Table } from "react-bootstrap";

interface IProps {
  pointsBreakup: [{ category: string; points: number }] | [];
}

export const PointsList = (props: IProps) => {
  if (props.pointsBreakup.length === 0) {
    return null;
  } else {
    return (
      <Table striped borderless hover size="sm">
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Beta Points</th>
          </tr>
        </thead>
        <tbody>
          {props.pointsBreakup.map((breakup) => {
            return (
              <tr>
                <td> {breakup.category} </td>
                <td> {breakup.points} </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
};
