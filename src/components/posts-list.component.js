import React, { Component } from 'react';
import PostDataService from "../services/posts.service";
import UserDataService from "../services/user.servce";
import Select from "react-dropdown-select";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class postlistApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            users: [],
            postText: "",
            postreplyText: "",
            postResponseText:"",
            cityID: "",
            userID:"",
            lat:"",
            lon:"",
            temp:""
        };
        this.refreshPosts = this.refreshPosts.bind(this)
        this.refreshUsers = this.refreshUsers.bind(this)
        this.savePost = this.savePost.bind(this)
        this.onChangeuserID = this.onChangeuserID.bind(this);
        this.onChangecityID = this.onChangecityID.bind(this);
        this.onChangelat= this.onChangelat.bind(this);
        this.onChangelon = this.onChangelon.bind(this);
        this.onChangetemp = this.onChangetemp.bind(this);
        this.onChangepostText = this.onChangepostText.bind(this);
        this.onChangepostResponseText = this.onChangepostResponseText.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

      onChangepostResponseText(e) {
        this.setState({
            postResponseText: e.target.value
        });
      }

    handlePostReply(postid) {
       
        var data = {
            postID: postid,
            postreplyText: this.state.postResponseText
        };

        this.setState({ error: '' });
        PostDataService.createreply(data);
        this.refreshPosts();
        this.state.postResponseText="";
    }
    
      handleSubmit(event) {

        event.preventDefault();
      }

    onChangeuserID(e) {
        this.setState({
            userID: e.target.value
        });
      }

      onChangecityID(e) {
        this.setState({
            cityID: e.target.value
        });
      }
      onChangelat(e) {
        this.setState({
            lat: e.target.value
        });
      }
      onChangelon(e) {
        this.setState({
            lon: e.target.value
        });
      }
      onChangetemp(e) {
        this.setState({
            temp: e.target.value
        });
      }

      onChangepostText(e) {
        this.setState({
            postText: e.target.value
        });
      }

    componentDidMount() {
        this.refreshPosts();
        this.refreshUsers();
    }

    refreshPosts() {
        PostDataService.getAll()
            .then(
                response => {
                    console.log(response);
                    this.setState({ posts: response.data });
                }
            )
    }

    
    refreshUsers() {
        UserDataService.getAll()
            .then(
                response => {
                   // alert(response.userID);
                    this.setState({ users: response.data });
                }
            )
    }

      savePost() {
     
        var data = {
            postText: this.state.postText,
            cityID: this.state.cityID,
            parentPostID:null,
            userID:this.state.userID
        };

        //alert(data.cityID);
       

        PostDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              postText: response.data.postText,
              cityID: response.data.cityID,
              userID: response.data.userID
            });
            console.log(response.data);
            
          })
      }

    render() {
        return (
             
           
              <div className="center">
                  <table className="center">
                      <tr><td><h1>Posts Application</h1></td></tr>
               <div>  
<form onSubmit={this.savePost}>
<table class="centernew">
    <tr class="justpadding"><td><label>
        User: </label></td><td>
    <select value={this.state.userID}
                onChange={(e) => this.setState({userID: e.target.value})}>
                    <option value="Choose User">Choose User</option>
         {this.state.users.map((user) => 
         <option key={user.username} value={user.username}> {user.username}</option>)}
        </select>
        
        </td></tr>
 <tr><td>  <label>
        cityID: </label>
         
        </td><td>
        
        <select value={this.state.cityID}
                onChange={(e) => this.setState({cityID: e.target.value})}>
                    <option value="Choose City">Choose City</option>
         <option key="Salisbury" value="Salisbury"> Salisbury</option>
         <option key="Rossmoor" value="Rossmoor"> Rossmoor</option>
         <option key="Shearwater" value="Shearwater"> Shearwater</option>
         
        </select>

        </td></tr>
    <tr><td> <label>
        postText:   </label>
          
        </td><td><input type="text" value={this.state.postText} onChange={this.onChangepostText} /></td></tr>
    <tr><td>   <input type="submit" value="Submit" />
     </td></tr>
</table>
</form>   
  
      

  </div>         
<h2>Here are the Posts!</h2>
                     <div> <tr><td>
                            {
                                this.state.posts.map(
                                    posts =><div class="postdiv">
                                       <table class="posttable">
                                           <tr key={posts.postID}>
                                   <b> <td>Post
                                              Created by : {posts.userID};
                                            City : {posts.cityID} </td> </b>  
                                        </tr>
                                        <tr>
                                         <i> <td> <b>Lat :</b> {posts.city.latitude} <b>;</b> 
                                         <b> Long :</b> {posts.city.longitude}<b>;</b> 
                                         <b> Temp :</b>  {posts.city.temp}<b>;</b> </td></i> 
                                        </tr>
                                        <tr><td>Post Text : {posts.postText}</td></tr>
                                        <tr>
<td>
<TextField
        defaultValue={this.state.postResponseText}
        onChange={event => {
          const { value } = event.target;
          this.setState({ postResponseText: value });
        }}
      />
            <Button color="primary" onClick={() => this.handlePostReply(posts.postID)}>Reply</Button></td>
                                     
                                        </tr><table>
                                 
                                                
                                        {
                                        posts.postReplies.map(
                                            reply => <tr>
                                                   <i> <td><b>Reply : </b>{reply.postreplyText}</td>
                                                   </i>  </tr>
                                        )
                                        
                                        } 
                                            </table>
                                         </table></div>
                                )
                            }
                       </td></tr>
                       <tr><td></td></tr>
                       <tr><td></td></tr>
                       <tr><td></td></tr>
                       </div>
                  </table>
                    <br></br>
                    <br></br>
                    
                </div>
        
              
              
        )
    }
}

export default postlistApp