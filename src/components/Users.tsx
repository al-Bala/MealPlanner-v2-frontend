import {useEffect, useState} from "react";
import useRefreshToken from "../features/authentication/hooks/useRefreshToken.ts";
import useAxiosPrivate from "../features/authentication/hooks/useAxiosPrivate.ts";

const Users = () => {
    const [users, setUsers] = useState<string[]>([]);
    const axiosPrivate = useAxiosPrivate();

    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((username, i) =>
                            <div key={i}>{username}</div>)
                        }
                    </ul>
                ) : <p>No users to display</p>
            }
            <button onClick={refresh}>Refresh</button>
        </article>
    );
}

export default Users;