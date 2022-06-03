import React from 'react'
import BrandBottom from './components/BrandBottom'
import Carrousel from './components/Carrousel'
import Table from './components/Table'
import Footer from './components/Footer'
export default function index() {
    return (
        <div>
            <Carrousel />
            <Table />
            <BrandBottom />
            <Footer />
        </div>
    )
}
