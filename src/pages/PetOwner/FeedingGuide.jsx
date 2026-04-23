import React from 'react'
import './FeedingGuide.css'
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
const FeedingGuide = () => {
  return (
    <>
    <PetOwnerNavbar/>
    <section className="feedingguide-hero-section d-flex flex-column justify-content-center text-center">
  <div className="container">
    <h1 className="feedingguide-hero-heading">Feeding Guide</h1>
  </div>
</section>

    
    </>
  )
}

export default FeedingGuide