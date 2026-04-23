import React from 'react'
import './PetProfile.css'
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
const PetProfile = () => {
 
  const [isEditing, setIsEditing] = useState(false);
  const [petData, setPetData] = useState(data.petInfo.pet);
  return (
    <>
      <PetOwnerNavbar />
      <section className="petprofile-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="petprofile-hero-heading">Pet Profile</h1>
        </div>
      </section>


    </>
  )
}

export default PetProfile