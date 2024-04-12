import React from 'react'
import Header from '../components/Header'
import RecommendedFood from '../components/RecommendedFood'
import Service from '../components/Service'
import Service2 from '../components/Service2'
import NewFoods from '../components/NewFoods'
import Special from '../components/Special'
import Footer from '../Shared/Footer'

function Home() {
    return (
        <>
            <Header />
            <RecommendedFood />
            <Service />
            <NewFoods />
            <Service2 />
            <Special />
        </>
    )
}

export default Home