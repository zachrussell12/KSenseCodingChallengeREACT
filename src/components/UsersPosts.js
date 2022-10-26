import React from 'react'
import {motion} from 'framer-motion';

//CSS
import '../css/userPosts.css';

class UsersPosts extends React.Component {

    constructor(props){
        super(props);
        this.state={
            visible: true,
            user: props.user,
        }
    }

    close = () =>{
        this.setState({
            visible: !this.state.visible,
        }, ()=>{
            this.props.close();
        })
    }

    render(){
            return (
            <motion.div initial="mount" animate={this.state.visible ? "enter" : "exit"} variants={{mount: {y: [15, 0], opacity: [0,1]}, exit: {y: [0, -15], opacity: [1,0]}, enter: {y: [15,0], opacity: [0,1]}}} className="user-posts-container">
                <div className="user-posts-header-container">
                    <p onClick={this.close}>{'<'} Back</p>
                    <h1>{this.state.user.userInfo.name}'s Posts</h1>
                </div>
                <div className="user-posts-body-container">
                {this.state.user.posts.map((post, i)=>{
                    console.log(post);
                        return(
                            <motion.div animate={{opacity: [0,1], transition: {delay: (0.5 + (i / 4)) }}} className="user-child">
                                <div className="post-child-top">
                                    <h4>{post.title}</h4>
                                </div>
                                <div className="post-child-bottom">
                                    <p>{post.body}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        )
    }
}

export default UsersPosts;