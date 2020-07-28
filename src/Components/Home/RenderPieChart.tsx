import React from 'react';
import {PieChart} from 'react-minimal-pie-chart';
import {pieChartColors} from './constants';
import { LabelRenderProps } from 'react-minimal-pie-chart/types/Label';

interface IProps {
    pointsBreakup: [{category: string, points: number}] | [];
}

export const RenderPieChart = (props: IProps) =>{
    var data : [{category: string, points: number}] | null | [] = null;

    if(props.pointsBreakup !== []){
        data = props.pointsBreakup;
    }

    if(!data || data.length === 0){
        return (
            null
        );
    }
    else{
        const renderdata = data.map((stat: {category: string, points: number}, index) =>{
            return {title: stat.category, label: stat.category, value: stat.points, color: pieChartColors[index % pieChartColors.length]};
        });
        const lol = ["one", "two", "three"]
        return(
            <React.Fragment>
                <PieChart labelStyle={{fontSize:"6px", fontWeight:300}} rounded lineWidth={20} labelPosition={75} label={(data) => data.dataEntry.title} animate radius={40} data = {renderdata}/>
            </React.Fragment>
        )
    }
    
    
    
}