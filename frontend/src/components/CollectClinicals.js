import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CollectClinicals extends React.Component{
    state = {}

    componentWillMount(){
        console.log("http://localhost:8080/api/patients/"+this.props.match.params.patientId);
        axios.get("http://localhost:8080/api/patients/"+this.props.match.params.patientId)
        .then(res=>{
            console.log(res.data);
            this.setState(res.data);
        })
    }
 
    handleSubmit(event){
        event.preventDefault();
        const data = {
            patientId:this.props.match.params.patientId,
            componentName:this.componentName,
            componentValue:this.componentValue,
        }
        axios.post("https://react-spring-boot-clinical.herokuapp.com/api/clinicals",data)
        .then(res=>{
            //this.props.history.push('/confirmReservation/'+res.data.id)
        })
    }

    render(){
        return (<div>
                <h2>Patient Details:</h2>
                First Name: {this.state.firstName}<br/>
                Last Name: {this.state.lastName}<br/>
                Age: {this.state.age}
                <h2>Patient Clinical Data:</h2>
                <form>
                    Clinical Entry Type:<select onChange={(event)=>{this.componentName=event.target.value}}>
                        <option>Select One</option>
                        <option value="bp">Blood Pressure(Sys/Dys)</option>
                        <option value="hw">Height/Weight</option>
                        <option value="heartrate">Heart Rate</option>
                        </select><br/>
                    Value:<input type="text" name="componentValue" onChange={(event)=>{this.componentValue=event.target.value}}/><br/>
                    <button onClick={this.handleSubmit.bind(this)}>Confirm</button>
                </form>
				<Link to="/">Home</Link>
        </div>)
    }
}

export default CollectClinicals;






