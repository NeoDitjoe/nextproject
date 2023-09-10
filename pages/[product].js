// import { getStaticProps } from '.';
import fs from 'fs/promises';
import path from "path";
// import { getStaticPaths } from 'next'

const Products = (props) => {
    const { loadedproduct } = props

    if(!loadedproduct){
        return (
            <p>Loading....</p>
        )
    }

    return (
        <div>
            <h1>{loadedproduct.title}</h1>
            <p>{loadedproduct.description}</p>
        </div>
    )
}

async function getData(){
    const filePath = path.join(process.cwd(), 'data', 'thedata.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return data
}


export async function  getStaticProps(context){
    const { params } = context;
    const currentPath = params.product;

    const data = await getData()

    const loadedData = data.products.find( product => product.id === currentPath)

    if(!loadedData){
        return {
            notFound: true
        }
    }

    return {
        props :{
            loadedproduct : loadedData
        },
        revalidate: 10
    }

}


export async function getStaticPaths(){

    const data = await getData()
    // const getid = data.products.map((item) =>  ({ params :{ product: item.id}}) )
    let getid;

    for( let {id} of data.products){
        // ide = id
        getid = [{ params :{ product: id}}]
    }

    return {
        paths: getid,
        fallback: true,
    }
}

export default Products;