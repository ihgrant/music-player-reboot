// @flow
import { libraryActions, playbackActions, playlistActions } from './consts';
import i from 'icepick';

const initialState: AppState = i.freeze({
    chosenSongId: -1,
    chosenPlaylistId: -1,
    library: [],
    playback: {
        paused: true,
        progress: 0,
        songId: -1
    },
    playbackSettings: {
        cursorFollowsPlayback: false,
        playbackFollowsCursor: false,
        repeat: false,
        shuffle: false
    },
    playlists: []
});

function museAmp(state: AppState = initialState, action: Action): AppState {
    console.info(action.type);

    let currentPlaylist = state.playlists[state.chosenPlaylistId];

    switch (action.type) {
        case playlistActions.ADD:
            return i.assign({}, state, {
                playlists: state.playlists.concat({
                    name: action.name,
                    songIds: []
                })
            });
        case libraryActions.ADD_SONG:
            return i.assign({}, state, {
                library: state.library.concat(action.song)
            });
        case libraryActions.ADD_SONG_BULK:
            return i.assign({}, state, {
                library: action.songs
            });
        case playlistActions.CHOOSE:
            return i.assoc(state, 'chosenPlaylistId', action.id);
        case playbackActions.CHOOSE_SONG:
            return i.assoc(state, 'chosenSongId', action.id);
        case playlistActions.ADD_SONG:
            return i.assocIn(
                state,
                ['playlists', state.chosenPlaylistId, 'songIds'],
                i.push(
                    state.playlists[state.chosenPlaylistId].songIds,
                    action.id
                )
            );
        case playlistActions.REMOVE_SONG:
            return i.assocIn(
                state,
                ['playlists', state.chosenPlaylistId, 'songIds'],
                i.filter(
                    el => el !== action.id,
                    state.playlists[state.chosenPlaylistId].songIds
                )
            );
        case playlistActions.REMOVE:
            return i.assign({}, state, {
                playlists: state.playlists.filter((el, i) => i !== action.id)
            });
        case playbackActions.TOGGLE_SHUFFLE:
            return i.assocIn(
                state,
                ['playbackSettings', 'shuffle'],
                !state.playbackSettings.shuffle
            );
        default:
            (action: empty);
            return state;
    }
}

export default museAmp;
