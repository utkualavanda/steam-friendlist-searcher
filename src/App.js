import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './components/Input/Input';
import UserInfo from './containers/UserInfo/UserInfo';

import axios from 'axios';

const steamKey = '**YOUR STEAM API KEY GOES HERE**';

const App = () => {
  const [steamId, setSteamId] = useState('**YOUR STEAM ID GOES HERE**');

  const [friendListState, setFriendListState] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});

  let newSteamId = '';

  const indicateSteamId = (num) => {
    newSteamId = num;
  };

  const changeSteamId = () => {
    setSteamId(newSteamId);
    setFriendListState([]);
  }

  useEffect(() => {
    axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + steamKey + '&steamids=' + steamId)
      .then(response => {
        setSelectedUser({
          avatar: response.data.response.players[0].avatar,
          userNick: response.data.response.players[0].personaname,
          userState: response.data.response.players[0].personastate,
          userProfileURL: response.data.response.players[0].profileurl
        })
      })
      .catch(error => console.log(error));
  }, [steamId])

  useEffect(() => {
    axios.get('https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + steamKey + '&steamid=' + steamId + '&relationship=friend')
      .then(response => {
        const loadedFriends = [];
        response.data.friendslist.friends.map((friend, index) => {
          loadedFriends.push({
            id: index,
            steamId: friend.steamid,
            friendSince: friend.friend_since
          })
        })
        setFriendListState(loadedFriends);
      })
      .catch(error => console.log(error));
  }, [steamId]);

  let user = null;

  if (selectedUser != {}) {
    user = (
      <a className="card"
        href={selectedUser.userProfileURL}>
        <img src={selectedUser.avatar}></img>
        <p>{selectedUser.userNick}</p>
        <p className={selectedUser.userState == 0 ? "offline" : "online"}>
         <span>{selectedUser.userState == 0 ? 'Offline' : 'Online'}</span>
        </p>
      </a>
    )
  }

  if(steamId.length != 17){
    alert('The Steam ID you have entered is wrong. Please review it.')
  }

  return (
    <div className="App">
      <Input steamId={indicateSteamId} changeId={changeSteamId}></Input>
      {steamId.length == 17 ? user : null}
      {friendListState.length != 1 ? <UserInfo friendListState={friendListState} steamKey={steamKey} /> : null}
    </div>
  );
}

export default App;
