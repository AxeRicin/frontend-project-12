import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider';

export default () => useContext(AuthContext);
