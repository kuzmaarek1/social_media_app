import React, { useState, useEffect, useRef } from 'react';
import InputEmoji from 'react-input-emoji';
import { format } from 'timeago.js';
import * as api from '@/api';
import Button from '@/components/atoms/Button';

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    if (receivedMessage != null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await api.getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat?.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await api.addMessage(message);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  return (
    <div className="bg-cardColor rounded-2xl grid grid-rows-[14vh_60vh_13vh]">
      {chat ? (
        <>
          <div className="p-[1rem_1rem_0rem_1rem] flex flex-col">
            <div className="flex justify-between items-center p-2.5 rounded-lg hover:bg-[#80808038] hover:cursor-pointer">
              <div className="relative flex gap-2.5">
                <img
                  className="w-12 h-12"
                  src={
                    userData?.profilePicture
                      ? `${serverPublic}${userData?.profilePicture}`
                      : `${serverPublic}defaultProfile.png`
                  }
                  alt=""
                />
                <div className="text-[0.8rem] flex flex-col">
                  <span className="font-bold">
                    {`${userData?.firstName} ${userData?.lastName}`}
                  </span>
                </div>
              </div>
            </div>
            <hr className="w-[85%] border-[0.1px] border-solid border-[#ececec]" />
          </div>
          <div className="flex flex-col gap-2 p-6 overflow-scroll">
            {messages?.map((message) => (
              <div
                className={`max-w-[28rem] flex flex-col bg-button text-white p-[0.7rem] rounded-[1rem_1rem_1rem_0] gap-2 w-[fit-content]
                ${
                  message.senderId === currentUser
                    ? 'self-end  rounded-[1rem_1rem_0_1rem] bg-message-own'
                    : ''
                }`}
                ref={scroll}
                key={message._id}
              >
                <span>{message.text}</span>
                <span className="text-[0.7rem] self-end text-white">
                  {format(message.createdAt)}
                </span>
              </div>
            ))}
          </div>
          <div className="h-14 bg-white flex justify-between items-center gap-4 p-[0.8rem] rounded-lg self-end">
            <div className="h-full p-[0px_15px_0px_15px] flex items-center justify-center font-bold cursor-pointer rounded-lg bg-button-add">
              +
            </div>
            <InputEmoji
              className="h-full bg-input-message rounded-lg border-none outline-0 flex-1 text-[14px] p-[0px_15px_0px_15px]"
              value={newMessage}
              onChange={handleChange}
            />
            <Button text="Send" styles={'p-2'} handleButtonClick={handleSend} />
          </div>
        </>
      ) : (
        <span className="flex self-center justify-center text-[20px]">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
