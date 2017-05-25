const minStyle = {
    left: '-75%',
    top: 'calc(100% - 120px)',
    zIndex: 1,
}

const maxStyle = {
    left: '0',
    top: '0',
    zIndex: 3,
}

const maxSongPanel = (state = {position: minStyle, url:""}, action) => {
      switch (action.type){
          case 'maxWindow':
            return Object.assign({}, state, {position: maxStyle, url: action.url});
          case 'minWindow':
            return Object.assign({}, state, {position: minStyle, url: action.url});
          default:
              return state;
      }
}

export default maxSongPanel;