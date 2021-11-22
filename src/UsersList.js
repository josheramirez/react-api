const UsersList = (props) => {
    const {users}=props;
    return(
        <div className="users_list">
            {users.map((user)=>(
                <div className="user_preview" key={user.id}>
                    <div className="user_name">{user.name}</div>
                </div>
            ))}
        </div>
    );
}

export default UsersList;
