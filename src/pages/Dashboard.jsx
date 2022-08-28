import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
import {
  roomSelector,
  reset,
  createRoom,
  joinRoom,
} from "../features/room/roomSlice";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MeetImage from "/meet.png";

const DashboardPage = styled.div`
  margin: 100px auto;
  height: 60vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h1 {
    font-size: 50px;
    color: purple;
  }
  h2 {
    color: purple;
  }
  p {
    color: #000080;
  }
  .dashboard {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    gap: 40px;
    border-radius: 5px;
    padding: 40px 20px;
    .forms {
      height: 100%;
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
      .create-join-form {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        border: 0px 2px 2px 2px solid purple;
        gap: 20px;
        form {
          width: 45%;
          height: 100%;
          .form-group {
            height: 40px;
            width: 100%;
            input {
              height: 100%;
              width: 100%;
              padding: 5px 10px;
              border-radius: 10px;
              outline: none;
              border: 2px solid purple;
            }
            button {
              height: 40px;
              width: 35%;
              color: white;
              cursor: pointer;
              outline: none;
              border: 2px solid orangered;
              background-color: white;
              color: purple;
              border-radius: 5px;
              &:hover {
                background-color: purple;
                color: white;
              }
            }
          }
        }
      }
    }
  }
`;
const Dashboard = () => {
  // hooks
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { room, isError, isLoading, isSuccess, message } =
    useSelector(roomSelector);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && room) {
      navigate(`/room/${room.roomId}`);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createRoom());
  };
  const handleJoin = (e) => {
    e.preventDefault();
    dispatch(joinRoom({ roomCode }));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <DashboardPage>
      <h1>Welcome {user && user.name}</h1>
      <div className="dashboard">
        <div className="forms">
          {/* join form  */}
          <h1>Chat for free</h1>
          <p>
            You can create a room and share it with your friends or you can join
            the room which your friends created. Have fun...
          </p>
          <div className="create-join-form">
            <form className="join-form form" onSubmit={handleJoin}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Type a room code and press enter..."
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                />
              </div>
              {/* <div className="form-group">
                <button type="submit">Join Room</button>
              </div> */}
            </form>
            {/* create form */}
            <form className="create-form form" onSubmit={handleCreate}>
              <div className="form-group">
                <button type="submit">Create Room</button>
              </div>
            </form>
          </div>
        </div>
        <div className="img">
          <img src={MeetImage} alt="Meet image" />
        </div>
      </div>
    </DashboardPage>
  );
};
export default Dashboard;
