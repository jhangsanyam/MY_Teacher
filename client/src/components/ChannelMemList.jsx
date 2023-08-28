import React, { useEffect, useState } from 'react';
import { useChannelActionContext, useChannelStateContext, useChatContext , Avatar } from 'stream-chat-react';


const MemberResult =  ({name1 , imag} )=>{
 // console.log(name1);
return(
  // <div className='channel-search__result-user'>
  //       <Avatar image={channel.image || undefined} name={channel.name} size={24} />
  //       <p className='channel-search__result-text'>{channel.name}</p>
  //     </div>
  <div className='channel-search__result-user'>
    {/* <p> {name} !</p> */}
        <Avatar image={imag || undefined} name={name1} size={24} />

       <p className='channel-search__result-text1'>{name1}</p>
  </div>
)
}



const ChannelMemList =  () => {
  const {channel} = useChannelStateContext();
  const [mem ,setMem] = useState([]);
 // const [img ,setImg] = useState([]);
  let name =[];
 // let imag = [];
  useEffect(  () =>{

    const getuser  = async () =>{
      const  {members} =  await channel.queryMembers({});
    //  console.log(members);
      members.forEach(memi => {
        name.push([memi.user.fullName , memi.user.image]
          );
      //    imag.push(memi.user.image);

      });
     // setImg(img);
     
      setMem(name);
      
    }
   getuser();
  } , []
 )
 //console.log(mem);



  return (
    <div>
   
    {mem.map((membeer , i) => {
        return (
        <MemberResult
        name1 ={membeer[0]}
        imag = {membeer[1]}
        key ={i}

        />
    )
    })
    
    }
    
    
    </div>
  )
}

export default ChannelMemList