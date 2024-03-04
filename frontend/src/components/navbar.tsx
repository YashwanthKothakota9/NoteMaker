import { useState } from 'react';
import logo from '../../public/logos/logo-base-256x256.png';
import { Button } from './ui/button';
import SignUpModel from './signup-model';
import LoginModel from './login-model';
import { User } from '@/models/user';
import { useToast } from './ui/use-toast';
import * as NotesApi from '@/network/notes_api';

interface NavBarProps {
  loggedInUser: User | null;
  setLoggedInUser: (user: User) => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  loggedInUser,
  onLogoutSuccessful,
  setLoggedInUser,
}: NavBarProps) => {
  const [signUpModel, setSignUpModel] = useState(false);
  const [loginModel, setLoginModel] = useState(false);

  const { toast } = useToast();

  async function logout() {
    try {
      await NotesApi.logOut();
      onLogoutSuccessful();
      toast({
        description: 'Logged out successfully!!',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Failed to log out, Please try again later',
      });
    }
  }

  return (
    <>
      <div className="flex items-center justify-between bg-[#f9eb8f] p-8">
        <div>
          <a href="/" className="flex gap-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <h1 className="text-[#3f2009] text-bold text-3xl">NoteMaker</h1>
          </a>
        </div>
        {loggedInUser ? (
          <div className="flex gap-2 items-center justify-center">
            <p className="text-[#3f2009] text-lg">
              Welcome, {loggedInUser.username}
            </p>
            <Button
              variant="outline"
              className="bg-[#3f2009] text-[#f9eb8f] hover:bg-[#804c13] hover:text-[#fbf7c6]"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <Button
              variant="outline"
              className="bg-[#3f2009] text-[#f9eb8f] hover:bg-[#804c13] hover:text-[#fbf7c6]"
              onClick={() => setSignUpModel(true)}
            >
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="bg-[#3f2009] text-[#f9eb8f] hover:bg-[#804c13] hover:text-[#fbf7c6]"
              onClick={() => setLoginModel(true)}
            >
              Log In
            </Button>
          </div>
        )}
      </div>
      {signUpModel && (
        <SignUpModel
          open={signUpModel}
          onOpenChange={setSignUpModel}
          onSignUpSuccess={(user) => {
            setLoggedInUser(user);
            setSignUpModel(false);
          }}
        />
      )}
      {loginModel && (
        <LoginModel
          open={loginModel}
          onOpenChange={setLoginModel}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setLoginModel(false);
          }}
        />
      )}
    </>
  );
};

export default NavBar;
