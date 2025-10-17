import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  getAccessToken,
  getUserData,
  setAccessToken,
  removeUserData,
  removeAccessToken,
  User,
  setUserData,
} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUser: (updatedUser: User) => void;
  logout: () => void;
  loading: boolean; // Add loading state here
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const remember = await AsyncStorage.getItem('rememberMe');

        if (remember === 'true') {
          const token = await getAccessToken();
          if (token) {
            const userData = await getUserData();
            setUser(userData);
          } else {
            setUser(null);
          }
        } else {
          await removeAccessToken();
          await removeUserData();
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = async (updatedUser: User) => {
    if (!updatedUser) {
      // console.log('User is empty');

      return;
    }
    setUser(updatedUser);
    // Optionally, save the updated user to AsyncStorage
    // setUserData(updatedUser);
    await setUserData(updatedUser);
  };

  const logout = async () => {
    setUser(null);
    await removeAccessToken();
    await removeUserData();
    await AsyncStorage.removeItem('rememberMe');
  };

  return (
    <UserContext.Provider value={{user, setUser, updateUser, logout, loading}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
