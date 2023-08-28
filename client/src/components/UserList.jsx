import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import Cookies from 'universal-cookie';
import { InviteIcon } from '../assets';
const cookies = new Cookies();
const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
        </div>
    )
}


const UserList = ({ setSelectedUsers }) => {
    //const { client } = useChatContext();
    const client = StreamChat.getInstance('api_key');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const jk = cookies.get("role");
        const jkp = cookies.get("userId");
       const  dri = cookies.get('Tr.id');
        const getUsers = async () => {
            if(loading) return;

            setLoading(true);
            
            try {
                
                let response = await  client.queryUsers({
                    $and: [
                        { id: { $ne: client.userID } },
                      { drid:  { $eq: dri } },
                    ],
                   
                 });
                 const list = await  client.queryUsers({
                    $and: [
                        { id: { $ne: client.userID } },
                      { drid:  { $eq: cookies.get('username') } },
                    ],
                   
                 });
                 let showlist = response.users.concat(list.users);
                 if(dri !== ""){
                    let p = [];
                //    console.log(dri);
                     p = await  client.queryUsers({
                        $and: [
                            { id: { $ne: client.userID } },
                          { name :  { $eq: dri } },
                        ],
                       
                     });
                  //   console.log(p);
                     showlist = showlist.concat(p.users);
                 }
               
                 //var complete = array1.concat(array2);
                    
                   
              //  console.log(showlist);
                
                if(showlist.length) {
                    setUsers(showlist);
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
               setError(true);
            }
            setLoading(false);
        }

        if(client) getUsers()
    }, []);

    if(error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
            </div> : (
                users?.map((user, i) => (
                  <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />  
                ))
            )}
        </ListContainer>
    )
}

export default UserList;