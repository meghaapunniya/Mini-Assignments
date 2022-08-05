import axios from "axios";
import React from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";

const baseURL = "https://dummyjson.com/users";

export default function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      const UserObj = {
        currentUserId: 0,
        CUser: response.data.users[0]
      };
      setCurrentUser(UserObj);
      setUserData(response.data);
    });
  }, []);

  function changeUser(changeAction) {
    if (
      changeAction === "next" &&
      currentUser.currentUserId !== userData.length
    ) {
      const tempUser = {
        currentUserId: currentUser.currentUserId + 1,
        CUser: userData.users[currentUser.currentUserId + 1]
      };
      setCurrentUser(tempUser);
    } else if (changeAction === "previous" && currentUser.currentUserId !== 0) {
      const temp_User = {
        currentUserId: currentUser.currentUserId - 1,
        CUser: userData.users[currentUser.currentUserId - 1]
      };
      setCurrentUser(temp_User);
    }
  }

  if (!currentUser) return <p>Loading...</p>;

  return (
    <div class="container">
      <div className="App">
        <Card id="item1">
          <Card.Body>
            <label>FirstName : </label>
            <span>{currentUser.CUser.firstName}</span>
            <p>
              <label>LastName : </label>{" "}
              <span>{currentUser.CUser.lastName}</span>
            </p>
            <p>
              <label>MaidenName : </label>
              <span>{currentUser.CUser.maidenName}</span>
            </p>
            <p>
              <label>Age : </label>
              <span>{currentUser.CUser.age}</span>
            </p>
            <p>
              <label>Phone :</label> <span>{currentUser.CUser.phone}</span>
            </p>
          </Card.Body>
        </Card>
        <button id="change" onClick={() => changeUser("next")}>
          {" "}
          Next User{" "}
        </button>
        <p>
          <button id="change" onClick={() => changeUser("previous")}>
            {" "}
            Previous User{" "}
          </button>
        </p>
      </div>
    </div>
  );
}
