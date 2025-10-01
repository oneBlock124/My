import React, { createContext, useState, useEffect, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role, username }
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [judges, setJudges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading] = useState(false);

  // Load data from localStorage
  const loadData = () => {
    setEvents(JSON.parse(localStorage.getItem("events")) || [
      { id: 1, name: "Event 1", description: "First event" }
    ]);
    setTeams(JSON.parse(localStorage.getItem("teams")) || [
      { id: 1, name: "Team A", description: "Team Alpha" },
      { id: 2, name: "Team B", description: "Team Beta" }
    ]);
    setJudges(JSON.parse(localStorage.getItem("judges")) || [
      { id: 1, name: "Judge 1", description: "First judge" }
    ]);
    setCategories(JSON.parse(localStorage.getItem("categories")) || [
      { id: 1, name: "Idea", weight: 1 },
      { id: 2, name: "Presentation", weight: 1 },
      { id: 3, name: "Execution", weight: 1 }
    ]);
    setEvaluations(JSON.parse(localStorage.getItem("evaluations")) || []);
  };

  // Save data to localStorage
  const saveData = () => {
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("judges", JSON.stringify(judges));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("evaluations", JSON.stringify(evaluations));
  };

  // Login function (local for now)
  const login = async (username, password, role) => {
    // Simple local auth
    const users = {
      admin: { username: "admin", password: "admin123" },
      judge: { username: "judge1", password: "judge123" },
      viewer: { username: "viewer", password: "view123" },
    };
    if (users[role] && users[role].username === username && users[role].password === password) {
      setUser({ role, username });
      localStorage.setItem("user", JSON.stringify({ role, username }));
      return true;
    } else {
      alert("Invalid credentials");
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Load user and data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    loadData();
  }, []);

  // Save data when state changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    saveData();
  }, [events, teams, judges, categories, evaluations]);

  return (
    <AppContext.Provider
      value={{
        user,
        events,
        teams,
        judges,
        categories,
        evaluations,
        loading,
        login,
        logout,
        setEvents,
        setTeams,
        setJudges,
        setCategories,
        setEvaluations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
