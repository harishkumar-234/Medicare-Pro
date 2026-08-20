import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string, name?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const roleUsers: Record<UserRole, User> = {
  admin: {
    id: 'usr-admin-1',
    name: 'Dr. Vivek Mehra',
    email: 'admin@medicarepro.health',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    department: 'Hospital Administration & Chief Medical Director',
    phone: '+91 98000 11223'
  },
  doctor: {
    id: 'usr-doc-1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@medicarepro.health',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    department: 'Orthopedics & Joint Replacement',
    phone: '+91 98403 45678'
  },
  receptionist: {
    id: 'usr-rec-1',
    name: 'Neha Deshmukh',
    email: 'neha.frontdesk@medicarepro.health',
    role: 'receptionist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    department: 'Front Desk & Patient Admissions',
    phone: '+91 98410 33445'
  },
  nurse: {
    id: 'usr-nur-1',
    name: 'Sister Kavitha Nair',
    email: 'kavitha.nair@medicarepro.health',
    role: 'nurse',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    department: 'ICU / Critical Care Ward',
    phone: '+91 98410 11223'
  },
  pharmacist: {
    id: 'usr-phr-1',
    name: 'Rohan Ganguly',
    email: 'rohan.pharm@medicarepro.health',
    role: 'pharmacist',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    department: 'Central Pharmacy Services',
    phone: '+91 98410 44556'
  },
  lab_technician: {
    id: 'usr-lab-1',
    name: 'Sumanth Roy',
    email: 'sumanth.lab@medicarepro.health',
    role: 'lab_technician',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    department: 'Central Diagnostic Pathology Lab',
    phone: '+91 98410 22334'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('medicare_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return roleUsers.admin;
      }
    }
    return roleUsers.admin; // Default logged in as Admin for instant rich demo exploration
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('medicare_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('medicare_user');
    }
  }, [user]);

  const login = (role: UserRole, email?: string, name?: string) => {
    const base = roleUsers[role] || roleUsers.admin;
    const loggedUser: User = {
      ...base,
      email: email || base.email,
      name: name || base.name
    };
    setUser(loggedUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(roleUsers[role]);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
