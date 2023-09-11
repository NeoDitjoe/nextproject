export default function UserProfile(props){

    const { nameofProp } = props

    return(
        <h1>{nameofProp}</h1>
    )
}

export function getServerSideProps(context){
    const { params } = context
    // const whatever = params.nameofDynamicPath

    return {
        props: {
            nameofProp: 'Neo Ditjoe'
        }
    }
}