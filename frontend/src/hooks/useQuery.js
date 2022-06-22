//Objective: catch the query from URL
import { useLocation } from "react-router-dom"
import { useMemo } from "react"

export const useQuery = () => {
  const {search} = useLocation();
  
  return useMemo(() => new URLSearchParams(search), [search])
}

export default useQuery