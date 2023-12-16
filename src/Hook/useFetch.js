import { useEffect, useState} from "react";
const useFetch = (url) => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData(){
      let dataRes = await fetch(url)
      let data = await dataRes.json()
      setData(data)
    }
    fetchData()
  }, [])
  return data;
}
export default useFetch