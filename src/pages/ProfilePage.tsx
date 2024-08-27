import useAuth from "../features/authentication/hooks/useAuth.ts";
import Users from "../components/Users.tsx";


export const ProfilePage = () => {
    const {auth} = useAuth();

    return (
      <>
          <Users/>
          User: {auth.username}
      </>
    );

}