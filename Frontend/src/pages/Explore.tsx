import React from "react";
import "./Explore.css"; // Import custom CSS for styling
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

interface ActivityCardProps {
  title: string;
  description: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ title, description }) => {
  return (
    <>
      <div className="activity-card">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

export const MENU_ITEMS = [
  {
    category: "Breakfast", items: [
      { name: "Signature Budget Breakfast", price: 500, description: "Includes soup, chicken wings, potato wedges, vegetables, fruits & beverages" },
      { name: "Canaville Delight Breakfast", price: 800, description: "Includes soup, salad, hot dishes, sides, bakery & beverages" },
      { name: "Continental Breakfast", price: 1200, description: "Full continental spread with soup, salad bar, bakery, hot dishes, cereal & fruits" }
    ]
  },
  {
    category: "Bites & Burgers", items: [
      { name: "Samosa (2 pcs)", price: 150 },
      { name: "Sausages (2 pcs)", price: 150 },
      { name: "Choma Sausage (1 pc)", price: 150 },
      { name: "Beef Burger with Chips", price: 500 },
      { name: "Chicken Burger with Chips", price: 500 },
      { name: "Chicken Wings (5 pcs) with Chips", price: 500 },
      { name: "Chicken Wings (10 pcs) with Chips", price: 1000 },
      { name: "Fish Fingers (5 pcs) with Chips", price: 500 },
      { name: "Fish Fingers (10 pcs) with Chips", price: 1000 }
    ]
  },
  {
    category: "Soups", items: [
      { name: "Ossobuco Soup", price: 300 },
      { name: "French Onion Soup", price: 300 },
      { name: "Cream of Mushroom Soup", price: 300 },
      { name: "Pumpkin & Coconut Soup", price: 300 },
      { name: "Spiced Lentil Soup", price: 300 }
    ]
  },
  {
    category: "Main Dishes", items: [
      { name: "Whole Fish (Dry/Wet)", price: 1000 },
      { name: "Moroccan Lamb Tajine", price: 1000 },
      { name: "Kwasu Kwasu Chicken", price: 1200 },
      { name: "Samaki wa Nazi", price: 1200 },
      { name: "Kuku wa Kupaka", price: 1200 },
      { name: "Beef Olives", price: 950 },
      { name: "Grilled Lemon Chicken Breast", price: 850 },
      { name: "Chicken Biriyani", price: 600 },
      { name: "Beef Biriyani", price: 500 },
      { name: "Fish Curry", price: 1000 },
      { name: "Beef Curry", price: 700 },
      { name: "Chicken Curry", price: 800 },
      { name: "Mutton Curry", price: 850 }
    ]
  },
  {
    category: "Platters", items: [
      { name: "Mixed Grill Platter", price: 2500, description: "Grilled lamb chops, beef skewers, chicken wings & sausages" },
      { name: "Vegetarian Platter", price: 1800, description: "Grilled halloumi, stuffed mushrooms, roasted peppers & falafel" }
    ]
  },
  {
    category: "Buffet", items: [
      { name: "Canaville Delight", price: 1000, description: "Beef stew, grilled chicken, rice, ugali, chapati & vegetables" },
      { name: "Canaville Bounty", price: 1200, description: "Mbuzi wet/dry fry, pilau, ugali, chapati & vegetables" },
      { name: "Canaville Summit", price: 1500, description: "Kienyeji chicken, mbuzi choma, roast potatoes, veg rice & mboga" }
    ]
  },
  {
    category: "Desserts", items: [
      { name: "Chocolate Lava Cake", price: 450 },
      { name: "Vanilla Panna Cotta", price: 400 },
      { name: "Tropical Fruit Platter", price: 350 },
      { name: "Classic Tiramisu", price: 500 },
      { name: "Ice Cream Trio", price: 300 }
    ]
  }
];

export const calculateTotal = (order: { name: string; price: number; quantity: number }[]) => {
  return order.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const initiateSTKPush = async (phoneNumber: string, totalAmount: number) => {
  const amountToPay = totalAmount * 0.5; // 50% booking fee

  const response = await fetch("https://your-payment-api.com/stk-push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber,
      amount: amountToPay,
      description: "Booking Fee for Canaville Kitchen",
    }),
  });

  const data = await response.json();
  return data;
};


export const ACTIVITIES = [
  {
    image: "/src/assets/gallery/Canaville-Resort-overview(1).jpg",
    title: "Getaways & Relaxation",
    description:
      "Escape the hustle and immerse yourself in nature's tranquility. Our cozy accommodations, breathtaking views, and personalized service make Canaville the perfect retreat for couples, families, and solo travelers."
  },
  {
    image: "/src/assets/gallery/IMG-20221213-WA0015.jpg",
    title: "Camping & Adventure Retreats",
    description:
      "Reconnect with nature at our well-equipped camping grounds. Whether you prefer classic camping or glamping, enjoy sleeping under the stars, guided nature walks, and thrilling outdoor experiences."
  },
  {
    image: "/src/assets/gallery/IMG-20221213-WA0022.jpg",
    title: "Bonfire Nights & Outdoor Movie Experiences",
    description:
      "Nothing beats the warmth of a crackling bonfire under the stars. Enjoy outdoor movie screenings, storytelling, and marshmallow roasting, creating memories that last a lifetime. Perfect for date nights, group hangouts, and team bonding."
  },
  {
    image: "/src/assets/gallery/IMG-20240731-WA0125.jpg",
    title: "Private & Exclusive Events",
    description:
      "Planning a special event? Canaville provides the perfect backdrop for birthdays, bridal showers, anniversaries, and corporate gatherings. Our team handles every detail to ensure an unforgettable experience."
  },
  {
    image: "/src/assets/gallery/IMG-20221221-WA0050.jpg",
    title: " Park & Chill Experience",
    description:
      "Unwind in a vibrant outdoor setting filled with good vibes. Enjoy:",
    subSections: [
      {
        items: [
          "Live music & DJ sets",
          "A cozy bonfire atmosphere",
          "Outdoor movie screenings",
          "Great food & drinks"
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG-20240731-WA0083.jpg",
    title: "Corporate Team-Building & Strategy Retreats",
    description:
      "Boost team morale with our custom corporate packages. Engage in:",
    subSections: [
      {
        items: [
          "Icebreaker activities & challenges",
          "Brainstorming & strategy sessions in a serene setting",
          "Fun team-bonding experiences",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG_20221119_160117.jpg",
    title: "Sports & Ball Games* – Get in the Game!",
    description:
      "For thrill-seekers and sports lovers, we offer:",
    subSections: [
      {
        items: [
          "Football (7-Aside) – Fast-paced and exciting for teams.",
          "Badminton – A fun, energetic game for all.",
          "Basketball – Shoot some hoops and challenge your friends.",
          "Volleyball – Perfect for beach-style fun with a group.",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/Img-165.jpg",
    title: "Archery – Test Your Focus",
    subSections: [
      {
        items: [
          "Kids' Archery – Safe and fun for young archers",
          "Adult Archery – A great mix of skill and competition.",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG_20221126_160716.jpg",
    title: "Darts & Pool Table* – Aim, Shoot & Win!",
    subSections: [
      {
        items: [
          "Kids' Darts – A fun, engaging activity.",
          "Adult Darts & Pool – Relax and challenge friends to a game.",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG-20230403-WA0009.jpg",
    title: "Board Games & Giant Jenga",
    description:
      "Enjoy classic board games or giant Jenga for some lighthearted competition and bonding.",
  },
  {
    image: "/src/assets/gallery/IMG_20221208_173230.jpg",
    title: "Bike Riding – Explore the Outdoors",
    subSections: [
      {
        items: [
          "Kids' Cycling Tracks – Safe and fun routes for young riders.",
          "Adult Bike Trails – Scenic paths for adventure lovers.",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG_20230214_182349.jpg",
    title: "Outdoor Painting – Unleash Your Creativity",
    subSections: [
      {
        items: [
          "Kids' Painting Sessions – Fun, colorful, and interactive.",
          "Adults' Painting – A therapeutic and peaceful experience.",
          "Family Painting – A great way to bond and create lasting memories.",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG-20221213-WA0012.jpg",
    title: "VR & PlayStation Gaming Zone",
    subSections: [
      {
        items: [
          "Immerse yourself in virtual reality adventures",
          "Challenge friends to the ultimate PlayStation battle.",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG-20230216-WA0020.jpg",
    title: "Bonfire, DJ & Dance Competition",
    description: "As the sun sets, the energy rises!",
    subSections: [
      {
        items: [
          "Live DJ & Dance-offs – Show off your moves!",
          "Marshmallow Roasting – A sweet, cozy tradition for all ages.",
          "Outdoor Movie Nights – A cinematic experience under the stars.",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG-20240731-WA0113.jpg",
    title: "Sports & Entertainment Nights",
    subSections: [
      {
        items: [
          "Live Football Screenings – Watch the big game in an electric atmosphere.",
          "Fun Competitions & Themed Nights – A great way to meet new people and enjoy the Canaville vibe",
        ]
      }
    ]
  },
  {
    image: "/src/assets/gallery/IMG-20230403-WA0050.jpg",
    title: "Food & Drinks* – A Culinary Experience",
    description:
      "Indulge in delicious meals and refreshing drinks as you soak in Canaville's peaceful ambiance. Our carefully crafted menu satisfies every craving, making every bite an experience."
  },
]



const Explore: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="explore-container">
        <div>
          <h2 className="menu-category-title">Activities</h2>
        </div>
        <div className="activities-container">
          {ACTIVITIES.map((activity, index) => (
            <div
              key={index}
              className="activity-card"
              style={{
                backgroundColor: index % 2 === 0 ? "#234001" : "#f5f5dc",
                color: index % 2 === 0 ? "#fff" : "#333"
              }}
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="activity-card-image"
              />
              <div className="activity-card-content">
                <h3 className="activity-card-title">{activity.title}</h3>
                <p className="activity-card-description">
                  {activity.description}
                </p>
                {activity.subSections &&
                  activity.subSections.map((section, secIndex) => (
                    <div key={secIndex} className="activity-subsection">
                      {/* {section.title && <h4 className="activity-subsection-title">{section.title}</h4>} */}
                      <ul className="activity-subsection-list">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="activity-subsection-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Explore;