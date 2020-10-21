import React, { useState, useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const { desktopCapturer } = window.require('electron');

const GetScreens = ({ history }) => {
  const back = history;
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getStuff() {
      const inputSources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
      setData((oldsources) => [...oldsources, inputSources])
      return () => (console.log('Holla'));
    }
    getStuff()
  }, [])
  return data && data.length > 0 ? <ChooseScreen sources={data} back={back}/> : <div> Please wait </div>;
}

const ChooseScreen = (data) => {
  return (
    <div>
    <Dialog open={true}>
      <DialogTitle id="screens">Select a Screen to Record</DialogTitle>
      <List>
        {data.sources[0].map((source) => (
          <ListItem button key={source.id} component={Link} to={'/record/' + source.id}>
            <ListItemText primary={source.name} />
          </ListItem>
        ))}
      </List>
      <Button onClick={data.back.goBack} style={{ width: '100%', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>Back</Button>
    </Dialog>
    </div>
  )
}

export default withRouter(GetScreens);
