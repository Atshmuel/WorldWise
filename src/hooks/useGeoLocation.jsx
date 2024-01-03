import { useState } from "react";

export function useGeoLocation(defaultPos = null) {
  const [position, setPosition] = useState(defaultPos);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getPostion() {
    setIsLoading(true);
    if (!navigator.geolocation)
      return setError(`Your browser dose not support geolocation!`);

    try {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      });
    } catch (error) {
      setError(error.message);
    }
  }
  return { error, isLoading, position, getPostion };
}
