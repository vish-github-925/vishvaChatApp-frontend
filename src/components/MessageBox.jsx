import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { authSelector } from "../features/auth/authSlice";
import { roomSelector } from "../features/room/roomSlice";
import { deleteMessage, getMessages } from "../features/message/messageSlice";
import { FaTrashAlt } from "react-icons/fa";

const MessageBoxDiv = styled.div`
  min-height: 30px;
  width: 40%;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: lightblue;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  .msg {
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 10px;
    span {
      font-size: 10px;
      align-self: flex-end;
    }
  }
`;
const MessageBox = ({ message }) => {
  const { user } = useSelector(authSelector);
  const { room, roomUsers } = useSelector(roomSelector);

  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteMessage(message._id));
    dispatch(getMessages(room.roomId));
  };

  return (
    <MessageBoxDiv
      style={
        user.id === message.sender
          ? { backgroundColor: "purple", alignSelf: "flex-end" }
          : { backgroundColor: "salmon", alignSelf: "flex-start" }
      }
    >
      <div className="msg">
        <p>{message.message}</p>
        <span>{new Date(message.createdAt).toLocaleString("en-US")}</span>
      </div>
      <FaTrashAlt
        role="button"
        onClick={onDelete}
        style={{ alignSelf: "flex-end", cursor: "pointer" }}
      />
    </MessageBoxDiv>
  );
};
export default MessageBox;
