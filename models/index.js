var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: process.env.NODE_ENV === 'test'
        ? './test-database.sqlite'
        : './database.sqlite'
});

var Songs = sequelize.define(
    'songs',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        album: Sequelize.STRING,
        albumArtist: Sequelize.STRING,
        artist: Sequelize.STRING,
        title: Sequelize.STRING
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }
);

var SongPaths = sequelize.define('song_paths', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    songId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'songs',
            key: 'id'
        }
    },
    path: Sequelize.STRING
});

var Playlists = sequelize.define('playlists', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING
});

var PlaylistDetails = sequelize.define('playlistDetails', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    playlistId: {
        type: Sequelize.INTEGER,
        references: {
            model: Playlists,
            key: 'id'
        }
    },
    songId: {
        type: Sequelize.INTEGER,
        references: {
            model: Songs,
            key: 'id'
        }
    },
    sort: Sequelize.INTEGER
});

var authenticate = () => {
    return sequelize.authenticate();
};

var initialize = function() {
    return sequelize.sync();
};

module.exports = {
    authenticate,
    initialize,
    Songs,
    SongPaths,
    Playlists,
    PlaylistDetails
};
