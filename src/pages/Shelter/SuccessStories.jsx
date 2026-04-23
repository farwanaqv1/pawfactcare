import React, { useEffect, useRef, useState } from "react";
import "./SuccessStories.css";
import ShelterNavbar from "./../../components/navbar/ShelterNavbar";

const stories = [
  {
    id: 1,
    name: "Sarah Johnson",
    review: "PetCare helped me find the best vet for my dog. The service was smooth and reliable!",
    fullStory:
      "My golden retriever Max had been showing signs of discomfort for weeks. Through PetCare, I found Dr. Anderson who diagnosed him with a mild hip dysplasia. The treatment plan has worked wonders and Max is back to his playful self!",
    image: "/ss1.jpg",
    petType: "Dog Owner",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Michael Smith",
    review: "Thanks to PetCare, I discovered amazing grooming services for my cat. Highly recommended!",
    fullStory:
      "My Persian cat Luna has very long fur that requires regular grooming. Finding a groomer who specializes in cats was challenging until I discovered PetCare. Now Luna looks forward to her monthly spa days!",
    image: "/ss2.jpg",
    petType: "Cat Owner",
    location: "Austin, TX",
  },
  {
    id: 3,
    name: "Emily Davis",
    review: "The pet adoption section is wonderful! I adopted a lovely puppy with their help.",
    fullStory:
      "After losing my childhood dog, I wasn't sure I was ready for another pet. PetCare's adoption matching system connected me with a rescue organization that had the perfect puppy for my lifestyle. Meet Bailey, my new best friend!",
    image: "/ss3.jpg",
    petType: "Dog Owner",
    location: "Seattle, WA",
  },
  {
    id: 4,
    name: "Daniel Lee",
    review: "PetCare's vet booking system saved me so much time. Amazing experience!",
    fullStory:
      "As a busy professional, finding time to call vets during business hours was impossible. With PetCare's 24/7 booking system, I secured an appointment for my parrot's emergency in minutes. The vet was fantastic and Kiwi is now chirping happily again!",
    image: "/ss4.jpg",
    petType: "Bird Owner",
    location: "San Francisco, CA",
  },
  {
    id: 5,
    name: "Olivia Brown",
    review: "I found a caring vet for my rabbit. PetCare is a blessing for pet parents.",
    fullStory:
      "Finding an exotic animal vet for my rabbit Thumper was always a challenge. PetCare connected me with a clinic that specializes in rabbits just 10 minutes from my home. Their expertise made all the difference during Thumper's dental procedure!",
    image: "/ss5.jpg",
    petType: "Rabbit Owner",
    location: "Chicago, IL",
  },
  {
    id: 6,
    name: "James Wilson",
    review: "Smooth appointment process, friendly vets, and great service overall.",
    fullStory:
      "My German Shepherd Duke developed anxiety after a move to a new city. Through PetCare, I found a behavior specialist who helped us with training techniques. Duke is now much calmer and has adjusted beautifully to our new home!",
    image: "/ss6.jpg",
    petType: "Dog Owner",
    location: "Denver, CO",
  },
  {
    id: 7,
    name: "Sophia Taylor",
    review: "Adopting my kitten through PetCare was easy and safe. Highly trusted service!",
    fullStory:
      "I've always wanted to adopt a rescue kitten but was worried about the process. PetCare made it so simple and connected me with a verified shelter. My kitten Mochi has been the perfect addition to my home!",
    image: "/ss7.jpg",
    petType: "Cat Owner",
    location: "Boston, MA",
  },
  {
    id: 8,
    name: "Benjamin Harris",
    review: "I booked pet grooming online—so convenient and professional service.",
    fullStory:
      "My poodle Coco needs regular grooming, and with my busy schedule, it was always a hassle. PetCare's online booking system lets me schedule appointments at any time, and the groomers are always professional and caring!",
    image: "/ss8.jpg",
    petType: "Dog Owner",
    location: "Miami, FL",
  },
];

const SuccessStories = () => {
  const storyRefs = useRef([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.8s ease forwards";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    storyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      storyRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [displayCount]);

  const toggleDisplay = () => {
    if (showAll) {
      setDisplayCount(8);
      setShowAll(false);
    } else {
      setDisplayCount(stories.length);
      setShowAll(true);
    }
  };

  return (
    <>
      <ShelterNavbar />

    
      <section className="successstories-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="successstories-hero-heading">Success Stories</h1>
        </div>
      </section>

      
      <div className="cards-heading-container">
        <h2>Our PetCare Success Stories</h2>
        <p>Discover how our platform has helped pets and their families live happier lives.</p>
      </div>

     
      <div className="cards-container">
        {stories.slice(0, displayCount).map((story, index) => (
          <div
            key={story.id}
            className="story-card"
            ref={(el) => (storyRefs.current[index] = el)}
          >
            <div className="image-container">
              <img src={story.image} alt={story.name} className="story-image" />
            </div>

            <div className="story-info">
              <h2 className="story-name">{story.name}</h2>
              <p className="story-review">"{story.review}"</p>
            </div>

            <div className="story-details">
              <h3 className="story-name">{story.name}</h3>
              <div className="full-story">
                <p>{story.fullStory}</p>
              </div>
              <div className="pet-info">
                <span className="story-pet-type">{story.petType}</span>
                <span className="story-location">{story.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stories.length > 8 && (
        <div className="explore-container">
          <button className="explore-btn" onClick={toggleDisplay}>
            {showAll ? "Show Less Stories" : "Show More Stories"}
          </button>
        </div>
      )}
    </>
  );
};

export default SuccessStories;
