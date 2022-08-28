import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { roomSelector, getRoomUsers } from "../features/room/roomSlice";
import {
  createMessage,
  messageSelector,
  getMessages,
} from "../features/message/messageSlice";
import { authSelector } from "../features/auth/authSlice";
import io from "socket.io-client";
import { toast } from "react-toastify";
import MessageBox from "../components/MessageBox";

const socket = io("http://localhost:5000");

import styled from "styled-components";

const RoomChatPage = styled.div`
  margin: 60px auto;
  height: 80vh;
  widht: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
  .room-chat {
    height: 100%;
    width: 75%;
    border: 2px solid black;
    border-radius: 5px;
    overflow-y: scroll;
    padding: 5px 5px 0px 5px;
    position: relative;

    .room-form {
      position: fixed;
      bottom: 17px;
      left: 213px;
      height: 40px;
      width: 63%;
      display: flex;
      input {
        height: 100%;
        width: 90%;
        padding: 5px 15px;
        border: 2px solid purple;
        outline: none;
      }
      button {
        height: 100%;
        width: 10%;
        cursor: pointer;
        color: white;
        background-color: purple;
        border: none;
        outline: none;
      }
    }
  }
  .room-users {
    height: 100%;
    width: 20%;
    border: 2px solid black;
    border-radius: 5px;
  }
`;
const RoomChat = () => {
  const { room, roomUsers, isError, message } = useSelector(roomSelector);
  const { user } = useSelector(authSelector);
  const { messages } = useSelector(messageSelector);
  const [newMessage, setNewMessage] = useState("");
  let params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRoomId = params.id;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!room) {
      navigate("/");
    } else {
      socket.emit("user-joined", currentRoomId);
      dispatch(getRoomUsers(currentRoomId));
    }
    dispatch(getMessages(currentRoomId));
    socket.on("get-users", () => {
      dispatch(getRoomUsers(currentRoomId));
    });

    socket.on("msg", () => {
      dispatch(getMessages(currentRoomId));
    });
  }, [socket, navigate, room, dispatch, isError, message, currentRoomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(createMessage({ room: currentRoomId, message: newMessage }));
    dispatch(getMessages(currentRoomId));
    socket.emit("getMessages", currentRoomId);
    setNewMessage("");
  };

  return (
    <RoomChatPage>
      <h1>Welcome {user && user.name}</h1>
      <div className="room-chat">
        <h1>Room chat</h1>
        {messages &&
          messages.map((msg) => <MessageBox key={msg._id} message={msg} />)}
        <form className="form room-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessage}
            placeholder="Enter your message"
            onChange={(e) => setNewMessage(e.target.value)}
            name="message"
            id="message"
          />

          <button type="submit">Send</button>
        </form>
      </div>
      <div className="room-users">
        <h1>Room users</h1>
        {room &&
          roomUsers.map((roomUser) => (
            <p key={roomUser.userid} style={{ textAlign: "center" }}>
              {roomUser.username}
            </p>
          ))}
      </div>
    </RoomChatPage>
  );
};
export default RoomChat;
