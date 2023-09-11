import { useEffect, useState } from "react"
import useSWR from 'swr'

export default function LastSales(){

    const [ sales , setSales ] = useState()
    const { data, error } = useSWR("https://todoapp-5c0c7-default-rtdb.firebaseio.com/sales.json", (url) => fetch(url).then(res => res.json()))

    useEffect(() => {
        if(data){
            const transformData1 = []

            for ( const key in data){
                transformData1.push({
                    id: key,
                    username: data[key].name,
                    volume: data[key].volume
                })
            }
    
    
            setSales(transformData1)
        }
    }, [data])

    if (error) return <div>failed to load</div>

    return (
        <ul>
            {   sales ?
                sales.map((sale) => {
                    return (
                        <li key={sale.id}>
                            <h1 key={sale.key}>{sale.username}</h1>
                            <p>R{sale.volume}</p>
                        </li>
                    )
                }) : <p>loading...</p>
            }
        </ul>
    )
}