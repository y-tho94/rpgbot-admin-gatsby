import React from 'react';
import '../../styles.css';
import { Link } from 'gatsby'; 

import { 
    Form
    ,Input
    ,InputNumber
    ,Select
    ,Button
 } from 'antd';


 class PlayersPage extends React.Component{
     constructor(props){
         super(props);

         this.state = {

         }
    }


    testPlayerCreate = async () =>{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referrer-Policy': 'same-origin',
            },
            body: JSON.stringify({uName: 'test4', pass: '1234'})
        }

        const response = await fetch('https://dev.freydo-apis.tech/rpgbot/user/add/index.php', options);
        const dataItem = await response.json();
        console.log(dataItem);
    }


    render(){
        return(
            <>
            <Button type='primary' onClick={this.testPlayerCreate}>Test Player Creation</Button>
            </>
        )
    }


 }

 export default PlayersPage;