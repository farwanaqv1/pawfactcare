import React from 'react'
import './HealthTips.css'
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
const HealthTips = () => {
  return (
    <>
    <PetOwnerNavbar/>
    
    <section className="healthtips-hero-section d-flex flex-column justify-content-center text-center">
  <div className="container">
    <h1 className="healthtips-hero-heading">Health Tips</h1>
  </div>
</section>

    </>
  )
}

export default HealthTips