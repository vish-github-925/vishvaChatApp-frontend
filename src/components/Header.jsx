import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { authSelector, logout, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { roomSelector, leaveRoom } from "../features/room/roomSlice";
// styles
const Nav = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  color: purple;
  font-weight: 500;
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 5px 50px;
  align-items: center;
  justify-content: space-between;
  .nav-list {
    display: flex;
  }
  li {
    margin: 0 1rem;
    padding: 0px 0px 5px 0px;
    button {
      cursor: pointer;
      background-color: purple;
      color: white;
      padding: 10px;
      border-radius: 5px;
      outline: none;
      border: none;
    }
    a {
      &:hover {
        border-bottom: 3px solid purple;
      }
    }
  }
`;

const Header = () => {
  // hooks
  const { user } = useSelector(authSelector);
  const { room } = useSelector(roomSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLeaveRoom = () => {
    dispatch(leaveRoom({ roomCode: room.roomId }));
    dispatch(reset());
    navigate("/");
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Nav>
      <div className="logo">
        <Link to="/">
          <h1>UV Chat</h1>
        </Link>
      </div>
      <ul className="nav-list">
        {user ? (
          <li className="nav-list-item">
            <button onClick={onLogout}>
              <FaUserAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-list-item">
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/register">
                <FaUserAlt /> Register
              </Link>
            </li>
          </>
        )}
        {room && (
          <li className="nav-list-item">
            <button onClick={onLeaveRoom}>
              <FaUserAlt /> Leave Room
            </button>
          </li>
        )}
      </ul>
    </Nav>
  );
};
export default Header;
