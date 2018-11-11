export const filterFriendsByName = (nameFilter, users,userLogged) => { 
    return (dispatch) => { 

        var filterFriends = users;
        
        filterFriends = filterFriends.filter(each=> each.uid !== userLogged.uid);
        
        if(nameFilter) {
            filterFriends = filterFriends.filter(each=> each.displayName.toLowerCase().search(nameFilter.toLowerCase()) >= 0);
            dispatch({
                type: "FILTER_FRIENDS_SUCCESS",
                filter: filterFriends,
            })
        }

        else {
            dispatch({
                type: "FILTER_FRIENDS_SUCCESS",
                filter: filterFriends,
            })
        }
    }
}