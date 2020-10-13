import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import Spinner from '../../components/Spinner/Spinner';

import './UserInfo.css';

const UserInfo = (props) => {
  const [usersInfoState, setUsersInfoState] = useState([]);

  useEffect(() => {
    const loadedUsers = [];
    if (props.friendListState.length == 0) {
      return
    } else {
      props.friendListState.map((friend) => {
        axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + props.steamKey + '&steamids=' + friend.steamId)
          .then(response => {
            loadedUsers.push({
              steamId: response.data.response.players[0].steamid,
              friendsSince: friend.friendSince,
              avatar: response.data.response.players[0].avatar,
              lastLogOff: response.data.response.players[0].lastlogoff,
              userNick: response.data.response.players[0].personaname,
              userState: response.data.response.players[0].personastate,
              userProfileURL: response.data.response.players[0].profileurl
            })
            if (props.friendListState.length == loadedUsers.length) {
              setUsersInfoState(loadedUsers);
            }
          })
          .catch(error => console.log(error));
      })
    }
  }, [props.friendListState])

  const timeStampChanger = (time) => {
    if (time == undefined) {
      return 'Can\'t Reach';
    }

    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = date.getMonth();
    let days = date.getDay();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    return days + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  let context = (<Spinner></Spinner>);

  if (usersInfoState.length == props.friendListState.length) {
    context = (
      <Aux>{
        usersInfoState.map((userInfo) =>
          <tr key={userInfo.steamId}>
            <td><img src={userInfo.avatar}></img></td>
            <td>{userInfo.userNick}</td>
            <td className={userInfo.userState == 0 ? "offline" : "online"}>{userInfo.userState == 0 ? 'Offline' : 'Online'}</td>
            <td>{timeStampChanger(userInfo.lastLogOff)}</td>
            <td>{timeStampChanger(userInfo.friendsSince)}</td>
            <td>{userInfo.steamId}</td>
            <td><a href={userInfo.userProfileURL}>Link</a></td>
          </tr>)
      }</Aux>
    )
  }

  return (
    <Aux>
      <p>Total friend count : <b>{props.friendListState.length}</b></p>
      <table>
        <tr>
          <th>Picture</th>
          <th>Nick</th>
          <th>State</th>
          <th>Last Online</th>
          <th>Friends Since</th>
          <th>Id</th>
          <th>Profile URL</th>
        </tr>
        {context}
      </table>
    </Aux>
  )
}

export default UserInfo;