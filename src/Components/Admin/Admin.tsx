import React from 'react';
import Axios from 'axios';
import { Form, Container, Button, Table, Dropdown } from 'react-bootstrap';
import {newPost_url} from '../routes';

import './styles.css'
import { connect } from 'react-redux';

interface IProps {
    jwt_token?: string
}

interface IState {
    name: string;
    class: string;
    company: string;
    details: string;
    breakup: {category: string, points: number}[];
    newCat: boolean;
    new_cat: string;
    new_points: string;
    submission_success: boolean;
}

const mapStateToProps = (state: any) => ({
    jwt_token: state.user.jwt_token,
})

const initialState = {
    name: '',
    class: 'Select',
    company: '',
    details: '',
    breakup: [],
    newCat: false,
    new_cat: '',
    new_points: '',
}

class AdminBasic extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state={
            ...initialState,
            submission_success: false
        }
    }

    handleChange = (e:{target:{id: string, value: string}}) =>{
        console.log("points: ", this.state.new_points);
        console.log("val: ", e.target.value);
        
        if((e.target.id === "new_points") && ((!/[0-9]/.test(e.target.value.slice(e.target.value.length -1, e.target.value.length)))?!(e.target.value === '') : (e.target.value === ''))){
            return;
        }
        this.setState({...this.state, [e.target.id]: e.target.value, submission_success: false});
    }

    handleCategoryAdd = () =>{
        if(this.state.new_cat === '' && this.state.new_points ==='0'){
            return this.setState({newCat: false})
        }
        if(this.state.new_points)
        this.setState({breakup: this.state.breakup.concat({category: this.state.new_cat, points: parseInt(this.state.new_points)})});
        this.setState({new_cat:'', new_points: '', newCat: false})
    }

    handleDropdown = (k: any, e: any) =>{
        this.setState({class: e.target.text})
    }

    handlesubmit = () =>{
        Axios({
            url: newPost_url,
            headers:{
                'Authorization': `bearer ${this.props.jwt_token}`
            },
            data:{
                name: this.state.name,
                company: this.state.company,
                details: this.state.details,
                class: this.state.class,
                pointsBreakup: this.state.breakup
            },
            method:"POST"
        }).then(res => {
            console.log("response: ", res);
            this.setState({...initialState,submission_success: true})
        }).catch(err => {
            console.log("error: ", err);
        })
    }

    render(){
        const addCategory = (
            <div className="row">
                <input onChange={this.handleChange} value={this.state.new_cat} placeholder="Category" style={{marginLeft:"10px", marginRight:"10px"}} className="col-md-6 col-xs-10" id="new_cat"/>
                <input onChange={this.handleChange} value={this.state.new_points ? this.state.new_points : ''} placeholder="Points" style={{margin:"10px"}} className="col-md-6 col-xs-10" id="new_points"/>
            </div>
        )

        const formFields = (
            <Form>
                <Form.Group>
                    <Form.Label> Title: </Form.Label>
                    <Form.Control value={this.state.name} id="name" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Type: </Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle>
                            {this.state.class}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onSelect={this.handleDropdown}>Technical</Dropdown.Item>
                            <Dropdown.Item onSelect={this.handleDropdown}>Non-Technical</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Company: </Form.Label>
                    <Form.Control value={this.state.company} id="company" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Details: </Form.Label>
                    <Form.Control value={this.state.details} as="textarea" rows={10} id="details" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Breakup:</Form.Label>
                    <div>
                        {this.state.breakup && this.state.breakup.length > 0 &&
                            <Table size="sm" style={{width:"50%"}}>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.breakup?.map((ele: {category: string, points: number}) => {
                                        return(
                                            <tr>
                                                <td> {ele.category} </td>
                                                <td> {ele.points} </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        }
                    </div>
                    {this.state.newCat ? addCategory : null}
                    {this.state.newCat ? <Button variant="secondary" onClick={this.handleCategoryAdd}>Add</Button>
                        : <Button variant="secondary" onClick={() => {this.setState({newCat: true})}}>New Category</Button>}

                </Form.Group>
                <Form.Group style={{display: "flex", flexDirection: "row"}}>
                    <Button variant={this.state.submission_success ? "success": "primary"} disabled={this.state.name === '' || this.state.class === 'Select' || this.state.company === '' || this.state.details === ''} onClick={this.handlesubmit}>{this.state.submission_success ? "Post Created": "Submit"}</Button>
                </Form.Group>
            </Form>
        )
        return(
            <Container>
                <div className="row">
                    <div className="col-md-8 col-xs-12 mx-auto">
                        <h3 style={{marginBottom:"20px"}}>Create New Post:</h3>
                        {formFields}
                    </div>
                </div>
            </Container>
            
        )
    }
}

export const Admin = connect(mapStateToProps, null)(AdminBasic);
