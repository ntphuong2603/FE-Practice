import React, { Component } from 'react';

class TableDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [],
            isLoaded : false
        }
    }

    componentDidMount(){
        fetch(this.props.url)
            .then(res => res.json())
            .then(res => this.setState({
                isLoaded: true,
                data: res.data
            }))
    }

}
export default TableDisplay;