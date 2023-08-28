import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';

import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import {ChannelContainer , ChannelListContainer , Auth , Auth1 , ChannelList } from './components';


import 'stream-chat-react/dist/css/v2/index.css';
import './App.css';

const cookies = new Cookies();
const authToken = cookies.get("token");
const apiKey = 'ckw8zaeabtp8';


const client = StreamChat.getInstance(apiKey);
if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
       relation : cookies.get('role'),
       drid : cookies.get('Tr.id'),
       theka : "jef",
    }, authToken)


}

const rolee = cookies.get('role'); 



const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
  if(!authToken) {
    if(!rolee){
        return <Auth1/>
    }
 return <Auth/>;
  }
    return (
       
        <div className="app__wrapper">
      
            <Chat client={client} theme='team dark'>
                <ChannelListContainer
                      isCreating={isCreating}
                  setIsCreating={setIsCreating}
                setCreateType={setCreateType}
          setIsEditing={setIsEditing}
                />
                <ChannelContainer
                      isCreating={isCreating}
                    setIsCreating={setIsCreating}
                        isEditing={isEditing}
                     setIsEditing={setIsEditing}
                      createType={createType}


                />
            </Chat>
        </div>
    );
}

export default App;

