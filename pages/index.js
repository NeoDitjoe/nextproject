import { Inter } from 'next/font/google'
import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
{/* <main className={`${styles.main} ${inter.className}`}> */}
export default function Home(props) {
  const { products } = props

  return (
    <ul>
      { products.map(product => (
        <li key={product.id}> <Link href={`/${product.id}`}> {product.title}</Link> </li>
      ))}
      <li><Link href={'/user-profile'}>User-Profile</Link></li>
      <li><Link href={'/last-sales'}>Last Sales</Link></li>
    </ul>
  )
}


export async function getStaticProps(){

  const filePath = path.join(process.cwd(), 'data', 'thedata.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  if( data.products.length === 0){
    return {
      notFound: true
    }
  }

  return {
    props: {
      products : data.products
    },
    revalidate : 20
  }

}