import React from 'react'

import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('ghibli.db')

const UserList = (props) => {

    const [userFilmList, setUserFilmList] = React.useState([])

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS films (id integer primary key not null, film text);')
        })
        updateList()
    }, [])

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO films (film) VALUES (?);', film)
        }, null, updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM films;', [], (_, { rows }) =>
                setUserFilmList(rows._array)
            )
        })
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM films WHERE film = ?;' [id])
        }, null, updateList)
    }

}

export default UserList