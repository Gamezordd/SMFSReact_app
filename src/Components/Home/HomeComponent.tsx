import React from 'react';
import {Container, Row, FormControl, Dropdown, Col, Button, Modal, Form} from 'react-bootstrap';
import {fetchPosts_url} from './constants';
import {CardComponent} from './CardComponent';
import { Filter } from 'react-bootstrap-icons'

import './styles.css';

export type postType = {name: string, company: string, details: string, class: string, pointsBreakup:[{category: string, points: number}]}

interface IProps {

}

interface IState {
    isLoading: boolean;
    posts: [postType] | null;
    filteredPosts: postType[] | null;
    internClass: string;
    minPoints: number | null;
    maxPoints: number | null;
    isFilterModalOpen: boolean;
    search_query: string | null;
}

export class Home extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state={
            isLoading: true,
            posts: null,
            filteredPosts: null,
            internClass: "Select",
            minPoints: null,
            maxPoints: null,
            isFilterModalOpen: false,
            search_query: null
        }
    }

    componentDidMount(){
        fetch(fetchPosts_url).then((res) => {            
            return res.json();
        }).then(data => {
            console.log(data);
            this.setState({posts: data, isLoading: false, filteredPosts: data});
        })
    }

    handleTypeSelect = (key: any, e:any) => {
        if(this.state.posts && e && this.state.posts.length > 0){
            this.setState({ filteredPosts: this.state.posts?.filter((post) => post.class === e.target.text), internClass: e.target.text});
        }
        return;
    }

    handleFilter = () =>{
        var posts: postType[] = [];
        if((this.state.minPoints || this.state.maxPoints) && this.state.posts && this.state.posts.length > 0){
            this.state.posts.map((post) => {
                if(post.pointsBreakup.length > 0){
                    var summation = 0;
                    post.pointsBreakup.forEach(obj => (summation = summation + obj.points));
                    if(this.state.minPoints && this.state.maxPoints && summation >= this.state.minPoints && summation <= this.state.maxPoints){
                        return posts = posts.concat(post);
                    }
                    else if(this.state.minPoints && !this.state.maxPoints && summation >= this.state.minPoints){
                        return posts = posts.concat(post);
                    }
                    else if(this.state.maxPoints && !this.state.minPoints && summation <= this.state.maxPoints){
                        return posts = posts.concat(post);
                    }
                }
            });
            if(!this.state.search_query){
                return this.setState({filteredPosts: posts});
            }
        }

        if(this.state.search_query && posts.length >0){
            var newPosts: postType[] = [];
            posts.map(post => {
                const lowercaseName = post.name.toLowerCase();
                if(this.state.search_query && lowercaseName.includes(this.state.search_query.toLowerCase())){
                    console.log("adding name: ", lowercaseName);
                    
                    return newPosts = newPosts.concat(post);
                }
                return;
            });
            this.setState({filteredPosts: newPosts});
        }
        else if(this.state.search_query && this.state.posts){
            // eslint-disable-next-line no-redeclare
            var newPosts: postType[] = [];
            this.state.posts.map(post => {
                const lowercaseName = post.name.toLowerCase();
                if(this.state.search_query && lowercaseName.includes(this.state.search_query.toLowerCase())){
                    console.log("adding name: ", lowercaseName);
                    
                    return newPosts = newPosts.concat(post);
                }
                return;
            });
            this.setState({filteredPosts: newPosts});
        }

        if(!this.state.minPoints && !this.state.maxPoints && !this.state.search_query){
            return this.setState({filteredPosts: this.state.posts});
        }
    }

    handleChange = (e: any) =>{
        this.setState({...this.state, [e.target.id]: e.target.value})
    }    

    setMobileViewHeight = () => {
        if(window.innerHeight > 600 && window.innerHeight <= 680){
            console.log("height: 81");
            
            return ("81vh");
        }
        else if(window.innerHeight > 680 && window.innerHeight <= 750){
            console.log("height: 83");
            return ("83vh");
        }
        else if(window.innerHeight > 750 && window.innerHeight <= 850){
            console.log("height: 84");
            return ("84vh");
        }
        else{
            return("80vh")
        }

    }

    render(){
        const desktopFilterBar = (
            <React.Fragment>
                <div className="filterBar" >
                    <div style={{display:"flex", flexDirection:"row",alignItems:"center", padding:"1%"}}>
                        <div style={{flex:2}}>
                            <FormControl id="minPoints" onChange={this.handleChange} placeholder="min. Points"/>
                        </div>
                        <div style={{paddingLeft:"1%", paddingRight: "1%"}}>-</div>
                        <div style={{flex:2}}>
                            <FormControl id="maxPoints" onChange={this.handleChange} placeholder="max. Points"/>
                        </div>
                        <div style={{flex:1, display:"flex", justifyContent:"flex-end"}}>
                            <Button onClick={this.handleFilter} variant="secondary">Filter</Button>
                        </div>
                        <div style={{flex:7}}></div>
                        <div style={{flex:2, display:"flex", justifyContent:"flex-end"}}>
                            <Dropdown>
                                <Dropdown.Toggle>
                                    {this.state.internClass}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1" onSelect={this.handleTypeSelect}>Technical</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onSelect={this.handleTypeSelect}>Non-Technical</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div> 
            </React.Fragment>
        )

        const mobileFilterBar = (
            <React.Fragment>
                <div className="filterBar">
                    <div style={{display:"flex", alignItems:"center", padding:"2%"}}>
                        <Button onClick={() => {this.setState({isFilterModalOpen: true})}} variant="secondary">
                            <Filter width="25px" height="25px" />
                        </Button>
                    </div>
                </div>
                <Modal show={this.state.isFilterModalOpen} onHide={() => this.setState({isFilterModalOpen: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter Results</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row p-3">
                            <Form style={{width:"100%"}}>
                                <Form.Group>
                                    <Form.Label>Type: </Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle>
                                            {this.state.internClass}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="1" onSelect={this.handleTypeSelect}>Technical</Dropdown.Item>
                                            <Dropdown.Item eventKey="2" onSelect={this.handleTypeSelect}>Non-Technical</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Values:</Form.Label>
                                    <FormControl id="minPoints" onChange={this.handleChange} placeholder="min. Points"/>
                                    <FormControl style={{marginTop: "10px"}} id="maxPoints" onChange={this.handleChange} placeholder="max. Points"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button onClick={this.handleFilter} variant="secondary">Filter</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );

        const mobileBody= (
            <React.Fragment>
                <Row className="mx-auto" style={{height: this.setMobileViewHeight(), overflowY:"auto", width:"100%"}}>
                    {this.state.filteredPosts && this.state.filteredPosts.map((post : postType) => {
                        return(
                            <CardComponent data={post}/> 
                        );
                    })}
                </Row>
            </React.Fragment>
        );

        const desktopBody = (
            <React.Fragment>
                <Row className="px-4">
                    {this.state.filteredPosts && this.state.filteredPosts.map((post : postType) => {
                        return(
                            <CardComponent data={post}/> 
                        );
                    })}
                </Row>
            </React.Fragment>
        )

        const searchBar = (
            <React.Fragment>
                <Row className="justify-content-center" style={{width: "inherit"}}>
                    <Col xs="9" md="11">
                        <input id="search_query" className="searchBar align-items-center" onChange={this.handleChange} placeholder="Search by Name"/>
                    </Col>
                    <Col xs="2" md="1">
                        <Button onClick={this.handleFilter} size="sm" className="align-items-center">Search</Button>
                    </Col>
                    
                </Row>
                
            </React.Fragment>
        )
        
        return(
            <React.Fragment>
                <Container fluid className="container" style={{padding: (window.innerWidth > 800 ? undefined : 0)}}>
                {searchBar}
                    <div style={{borderStyle:"solid", borderColor:"rgb(64,64,64,0.18)", borderWidth:"1px", borderRadius:"10px"}}>
                        <Row style={{width:"100%", padding:0, margin:0}}>
                            <Col xs={12} style={{width:"100%", padding:0, margin:0}}>
                                
                                {window.innerWidth > 800 ? desktopFilterBar : mobileFilterBar}
                                {window.innerWidth > 800 ? desktopBody : mobileBody}
                            </Col>
                            
                        </Row>  
                    </div>
                    </Container>
            </React.Fragment>
        );
    }
}