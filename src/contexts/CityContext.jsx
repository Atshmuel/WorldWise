import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  // switch (action.type) {
  //   case value:
  //     break;
  //   default:
  //     break;
  // }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert("Could not find this city");
    } finally {
      setIsLoading(false);
    }
  };

  const postCity = async (newCity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was a problem creating this city, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const removeCity = async (cityId) => {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== cityId));
    } catch (error) {
      alert("There was a problem deleting this city, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, postCity, removeCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities was used outside of CityProvider !");
  return context;
}

export { CityProvider, useCities };
