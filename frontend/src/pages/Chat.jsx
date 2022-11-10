import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import * as api from '@/api';
import NavIcons from '@/components/molecules/NavIcons';
import LogoSearch from '@/components/molecules/LogoSearch';
import ChatBox from '@/components/molecules/ChatBox';
import Conversation from '@/components/molecules/Conversation';

const Chat = () => {
  const user = useSelector((state) => state.auth.authData.result);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await api.userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  useEffect(() => {
    socket.current = io('http://localhost:8800');
    socket.current.emit('new-user-add', user._id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const chceckOnlineStatus = (chat) => {
    const chatMember = chat?.members.find((member) => member !== user._id);
    const online = onlineUsers?.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="relative grid md:grid-cols-[22%_auto] grid-cols-[16%_auto] gap-4">
      <div className="flex flex-col gap-4">
        <LogoSearch />
        <div className="h-auto flex flex-col gap-4 bg-cardColor rounded-2xl p-4 overflow-scroll min-h-[80vh]">
          <h2 className="text-[1.5em] font-bold">Chats</h2>
          <div className="flex flex-col gap-4">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={chceckOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-80 self-end">
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
