import React, { useEffect, useState } from 'react'
import UsersPosts from '../components/UsersPosts';
import {motion} from 'framer-motion';


//CSS
import '../css/app.css';

//Images
import avatar from '../images/defaultAvatar.png';

function App() {

    //Data
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedUser, setSelectedUser] = useState(undefined);

    //Modal Toggle
    const [posts, togglePosts] = useState(false);

    useEffect(()=>{

            const fetchedUsers = [];
            
            fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then((data)=>{

                data.map((user)=>{
                    return fetchedUsers.push({userInfo: user, posts: []});
                })  

            })
            .then(async()=>{

                fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then((data)=>{

                    data.map((post)=>{
                        return fetchedUsers[fetchedUsers.findIndex(user => user.userInfo.id === post.userId)].posts.push(post);
                    });

                }).then(()=>{

                    setUsers(fetchedUsers);
                    setLoaded(true);

                })

            })
    }, []);

    const viewPosts = (user) => {
        posts ? setSelectedUser(undefined) : setSelectedUser(user);
        togglePosts(!posts);
    }


  return (
    <div className="body">
        {!loaded && 
            <div>
                <section id="decorative-elements">
                    <motion.div animate={{y: [15, 0, 15], transition: {repeat: Infinity, duration: 5, easings: ["linear", "linear"]}}} className="decorative-circle" style={{width: '40%', height: undefined, aspectRatio: 1, top: '-45%', right: '-15%', zIndex: 1,}}></motion.div>
                    <motion.div animate={{y: [25, 0, 25], transition: {repeat: Infinity, duration: 15, easings: ["linear", "linear"]}}} className="decorative-circle" style={{width: '40%', height: undefined, aspectRatio: 1, top: '-30%', right: '-25%', zIndex: 0,}}></motion.div>
                    <motion.div animate={{y: [10, 0, 10], transition: {repeat: Infinity, duration: 10, easings: ["linear", "linear"]}}} className="decorative-circle-alt" style={{width: '60%', height: undefined, aspectRatio: 1, bottom: '-85%', left: '-20%', zIndex: 3,}}></motion.div>
                    <motion.div animate={{y: [5, 0, 5], transition: {repeat: Infinity, duration: 5, easings: ["linear", "linear"]}}} className="decorative-circle-alt" style={{width: '45%', height: undefined, aspectRatio: 1, bottom: '-30%', left: '-30%', zIndex: 2,}}></motion.div>
                    <motion.div animate={{y: [5, 0, 5], transition: {repeat: Infinity, duration: 10, easings: ["linear", "linear"]}}} className="decorative-circle-alt" style={{width: '10%', height: undefined, aspectRatio: 1, top: '5%', left: '10%', zIndex: 2,}}></motion.div>
                    <motion.div animate={{y: [15, 0, 15], transition: {repeat: Infinity, duration: 5, easings: ["linear", "linear"]}}} className="decorative-circle-alt" style={{width: '5%', height: undefined, aspectRatio: 1, top: '15%', left: '8%', zIndex: 2,}}></motion.div>
                </section>
            </div>
        }
        {loaded && 
            <div>
                <section id="decorative-elements">
                    <motion.div animate={{y:[-15, 0], transition: {duration: 1.5, delay: 0.1}}} className="decorative-circle" style={{width: '40%', height: undefined, aspectRatio: 1, top: '-45%', right: '-15%', zIndex: 1,}}></motion.div>
                    <motion.div animate={{y:[-10, 0], transition: {duration: 1.5, delay: 0.35}}} className="decorative-circle" style={{width: '40%', height: undefined, aspectRatio: 1, top: '-30%', right: '-25%', zIndex: 0,}}></motion.div>
                    <motion.div animate={{y:[-20, 0], transition: {duration: 1.5, delay: 0.5}}} className="decorative-circle-alt" style={{width: '60%', height: undefined, aspectRatio: 1, bottom: '-85%', left: '-20%', zIndex: 3,}}></motion.div>
                    <motion.div animate={{y:[-10, 0], transition: {duration: 1.5, delay: 0.8}}} className="decorative-circle-alt" style={{width: '45%', height: undefined, aspectRatio: 1, bottom: '-30%', left: '-30%', zIndex: 2,}}></motion.div>
                    <motion.div animate={{y:[-5, 0], transition: {duration: 1.5, delay: 0.5}}} className="decorative-circle-alt" style={{width: '10%', height: undefined, aspectRatio: 1, top: '5%', left: '10%', zIndex: 2,}}></motion.div>
                    <motion.div animate={{y:[-15, 0], transition: {duration: 1.5, delay: 0.15}}} className="decorative-circle-alt" style={{width: '5%', height: undefined, aspectRatio: 1, top: '15%', left: '8%', zIndex: 2,}}></motion.div>
                </section>

            <motion.div initial="mount" animate={!posts ? "enter" : "exit"} variants={{mount: {y: [15, 0], opacity: [0,1]}, exit: {y: [0, -15], opacity: [1,0]}, enter: {y: [15,0], opacity: [0,1]}}} className="users-container">
                <div className="users-header-container">
                    <h1>Users</h1>
                </div>
                <div className="users-body-container">
                    {users.map((user, i)=>{
                        return(
                            <motion.div animate={{opacity: [0,1], transition: {delay: (0.5 + (i / 4)) }}} className="user-child">
                                <div className="user-child-top">
                                    <h4>{user.userInfo.name}</h4>
                                    <img src={avatar} className="avatar-img" alt="default avatar of the outline of a person in a circle"/>
                                </div>
                                <div className="user-child-bottom">
                                    <p onClick={()=>{viewPosts(user);}}>View Posts {'>'}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {posts &&
                <UsersPosts user={selectedUser} close={()=>{viewPosts("");}}/>
            }
            </div>
        }
    </div>
  )
}

export default App;