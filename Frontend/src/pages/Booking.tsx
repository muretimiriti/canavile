/**
 * Booking Component
 * 
 * This component handles the entire booking process for Canaville Resort.
 * It includes functionality for:
 * - Contact information collection
 * - Activity selection and pricing
 * - Accommodation booking with availability checking
 * - Food and beverage ordering
 * - Total cost calculation
 * - Form validation and submission
 */

import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./Booking.css";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import mountainImage from "../assets/mountain.jpg";

interface ActivityOption {
  name: string;
  options: string[];
  numberOfPeople?: number;
}

interface AccommodationOption {
  type: string;
  bedding: boolean;
  pax: number;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  activities: ActivityOption[];
  food: string[];
  drinks: string[];
  accommodation: AccommodationOption[];
  date: string;
  checkInDate?: string;
  checkOutDate?: string;
  checkInTime?: string;
  checkOutTime?: string;
  time: string;
  people: string;
  totalCost: number;
  status: string;
  selectedGround?: string;
  groundCapacity?: number;
  groundDate?: string;
}

interface Ground {
  name: string;
  capacity: number;
}

interface MenuItem {
  name: string;
  price: number;
  quantity?: number;
  description?: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface SelectedMenuItem {
  name: string;
  price: number;
  quantity: number;
}

interface AccommodationAvailability {
  type: string;
  dates: {
    start: string;
    end: string;
  }[];
}

const grounds: Ground[] = [
  { name: "Tulia", capacity: 150 },
  { name: "Lewa", capacity: 100 },
  { name: "Zohari", capacity: 600 },
  { name: "Ekani", capacity: 300 },
  { name: "Zanzi", capacity: 50 },
];

type ActivityPrices = {
  [key: string]: {
    [key: string]: number;
  };
};

type AccommodationPrices = {
  [key: string]: {
    [key: string]: number;
  };
};

const activityPrices: ActivityPrices = {
  "Team Building": {
    "With Facilitator": 15000,
    "With Facilitator, DJ and PA": 20000,
  },
  "Bike Riding": {
    "Adult": 500,
    "Kids": 200,
  },
  "Group Mbuzi": {
    "Own Mbuzi": 7000,
    "Without Mbuzi": 20000,
  },
  "Grounds for Hire": {
    "Photoshoot": 10000,
  },
  "Bonfire and Outdoor Movie": {
    "Non-Drinkers": 20000,
    "Drinkers": 0,
  },
};

const foodPrices: Record<string, number> = {
  "Buffet": 2000,
  "BBQ": 2500,
  "Snacks": 800,
};

const drinkPrices: Record<string, number> = {
  "Soft Drinks": 300,
  "Alcohol": 1500,
  "Cocktails": 2000,
};

const accommodationPrices: AccommodationPrices = {
  "Camping": {
    "2 Pax Without Bedding": 2000,
    "2 Pax With Bedding": 2500,
    "1 Pax Without Bedding": 1500,
    "1 Pax With Bedding": 2000,
  },
  "Big Tent Sharing": {
    "Without Bedding": 1000,
    "With Bedding": 1500,
  },
  "4 Pax Room": {
    "Without Bedding": 5500,
    "With Bedding": 7500,
  },
  "8 Pax Room": {
    "Without Bedding": 11000,
    "With Bedding": 15000,
  },
  "Glamping": {
    "Without Bedding": 5000,
    "With Bedding": 6000,
  },
  "Cabins": {
    "Standard": 3000,
  },
};

const MENU_ITEMS: MenuCategory[] = [
  {
    category: "Bites & Burgers",
    items: [
      { name: "Samosa (2 pcs)", price: 150, description: "Crispy golden pastry filled with a flavorful meat or vegetable stuffing" },
      { name: "Sausages (2 pcs)", price: 150, description: "Juicy, well-seasoned sausages, perfect for a quick bite" },
      { name: "Choma Sausage (1 pc)", price: 150, description: "Grilled sausage with a smoky, flavorful finish" },
      { name: "Beef Burger with Chips", price: 550, description: "Juicy beef patty, fresh lettuce, tomatoes, and cheese in a soft bun, served with crispy chips" },
      { name: "Chicken Burger with Chips", price: 650, description: "Succulent grilled chicken breast, fresh lettuce, tomatoes, and cheese in a soft bun, served with crispy chips" },
      { name: "Chicken Wings Small (5 pcs) with Chips", price: 500, description: "Lightly marinated and perfectly crispy wings served with chips" },
      { name: "Chicken Wings Large (10 pcs) with Chips", price: 1000, description: "A generous portion of flavorful chicken wings with crispy chips" },
      { name: "Fish Fingers Small (5 pcs) with Chips", price: 500, description: "Crispy battered fish fillets served with golden chips" },
      { name: "Fish Fingers Large (10 pcs) with Chips", price: 1000, description: "A hearty serving of crispy fish fillets with golden chips" }
    ]
  },
  {
    category: "Soups",
    items: [
      { name: "Cream of Mushroom Soup", price: 300, description: "A velvety and hearty mushroom-based soup with a hint of herbs" },
      { name: "Roasted Pumpkin & Coconut Soup", price: 300, description: "A silky blend of roasted pumpkin, coconut milk, and spices" },
      { name: "Ginger-Infused Butternut Soup", price: 300, description: "A warm and comforting soup with ginger infusion" },
      { name: "Chicken Broth", price: 300, description: "Traditional chicken broth" },
      { name: "Tomato Soup", price: 300, description: "Classic tomato soup" }
    ]
  },
  {
    category: "Main Dishes - Mbuzi",
    items: [
      { name: "Mbuzi (500g)", price: 650, description: "Dry, wet, or choma style. Served with chips, saute, roast potatoes, ugali" },
      { name: "Mbuzi (1kg)", price: 1300, description: "Dry, wet, or choma style. Served with chips, saute, roast potatoes, ugali" },
      { name: "Mbuzi Tumbukiza (500g)", price: 900, description: "With potato portion and greens" },
      { name: "Mbuzi Tumbukiza (1kg)", price: 1700, description: "With potato portion and greens" },
      { name: "Mutton Curry (500g)", price: 750, description: "Served with veg rice, chapati, ugali" },
      { name: "Mutton Curry (1kg)", price: 1500, description: "Served with veg rice, chapati, ugali" },
      { name: "Moroccan Lamb Tajine (500g)", price: 750, description: "Served with rice, ugali, chapati, chips" },
      { name: "Moroccan Lamb Tajine (1kg)", price: 1500, description: "Served with rice, ugali, chapati, chips" }
    ]
  },
  {
    category: "Main Dishes - Beef",
    items: [
      { name: "Beef (500g)", price: 600, description: "Dry, stir fry, or choma style. Served with ugali, chips, roast potatoes, saute" },
      { name: "Beef (1kg)", price: 1200, description: "Dry, stir fry, or choma style. Served with ugali, chips, roast potatoes, saute" },
      { name: "Beef Tumbukiza (500g)", price: 850, description: "With potato portion and greens" },
      { name: "Beef Tumbukiza (1kg)", price: 1700, description: "With potato portion and greens" },
      { name: "Beef Curry (500g)", price: 700, description: "Served with chapati, rice, ugali" },
      { name: "Beef Curry (1kg)", price: 1400, description: "Served with chapati, rice, ugali" },
      { name: "Beef Biryani (500g)", price: 700, description: "Served with chips, veg rice, ugali, chapati" },
      { name: "Beef Biryani (1kg)", price: 1400, description: "Served with chips, veg rice, ugali, chapati" },
      { name: "Beef in Olives (500g)", price: 750, description: "Served with chips, roast, veg rice, chapati" },
      { name: "Beef in Olives (1kg)", price: 1500, description: "Served with chips, roast, veg rice, chapati" }
    ]
  },
  {
    category: "Main Dishes - Pork",
    items: [
      { name: "Pork (500g)", price: 650, description: "Choma or stir fry style. Served with chips, saute, ugali" },
      { name: "Pork (1kg)", price: 1300, description: "Choma or stir fry style. Served with chips, saute, ugali" },
      { name: "Barbequed Pork (500g)", price: 800, description: "Served with chips, roast, saute, ugali" },
      { name: "Barbequed Pork (1kg)", price: 1500, description: "Served with chips, roast, saute, ugali" }
    ]
  },
  {
    category: "Main Dishes - Chicken",
    items: [
      { name: "Broiler Chicken (Half)", price: 750, description: "Choma, dry or wet style. Served with chips, roast, saute, ugali" },
      { name: "Broiler Chicken (Full)", price: 1500, description: "Choma, dry or wet style. Served with chips, roast, saute, ugali" },
      { name: "Kuku wa Kupaka (Half)", price: 850, description: "Served with roast potatoes, saute, chips" },
      { name: "Kuku wa Kupaka (Full)", price: 1700, description: "Served with roast potatoes, saute, chips" },
      { name: "Malawian Kwasu Kwasu Chicken (Half)", price: 850, description: "Served with mashed potatoes or sweet potatoes" },
      { name: "Malawian Kwasu Kwasu Chicken (Full)", price: 1700, description: "Served with mashed potatoes or sweet potatoes" },
      { name: "Chicken Tikka (Half)", price: 850, description: "Served with rice, chapati, chips, ugali" },
      { name: "Chicken Tikka (Full)", price: 1700, description: "Served with rice, chapati, chips, ugali" },
      { name: "Kuku Kienyeji (Half)", price: 1200, description: "Dry or wet style. Served with potatoes wedges, chips, ugali" },
      { name: "Kuku Kienyeji (Full)", price: 2000, description: "Dry or wet style. Served with potatoes wedges, chips, ugali" }
    ]
  },
  {
    category: "Platters",
    items: [
      { name: "Acacia Platter (6pax)", price: 4500, description: "Herbs infused grilled chicken, oven grilled mbuzi, beef stir fry, honey glazed pork. Served with roast potatoes wedges, grilled corn, butter garlic naan bread, kachumbari, and dipping" },
      { name: "Delight Platter (4pax)", price: 2500, description: "Herbs infused grilled chicken, oven grilled mbuzi, beef stir fry, honey glazed pork. Served with roast potatoes wedges, grilled corn, butter garlic naan bread, kachumbari, and dippings" },
      { name: "Canaville Kuku Bahati", price: 1500, description: "Well marinated full chicken mixed with chips, arrow roots, boiled eggs" }
    ]
  },
  {
    category: "Barbeque",
    items: [
      { name: "Pork Barbeque", price: 1500 },
      { name: "Chicken Barbeque", price: 1700 }
    ]
  },
  {
    category: "Desserts",
    items: [
      { name: "Vanilla Raspberry Sponge Cake Slice", price: 400 },
      { name: "Ice Cream Trio", price: 300, description: "A choice of three flavors: Vanilla, Chocolate, Strawberry" }
    ]
  },
  {
    category: "Accompaniments",
    items: [
      { name: "Chips, Naan", price: 200 },
      { name: "Roast, Saute, Mashed, Mukimo, Veg Rice, Pilau", price: 250 },
      { name: "Chapati", price: 150 },
      { name: "Chips Masala", price: 300 },
      { name: "Kachumbari and Coleslaw", price: 100 },
      { name: "Veggies", price: 150 }
    ]
  },
  {
    category: "Continental Breakfast",
    items: [
      { name: "Continental Breakfast Full", price: 1200, description: "Includes: Soups, Salad Bar, Bakery & Pastries, Hot Dishes & Sides, Cereal & Yogurt Bar, Fruits, Beverages" },
      { name: "Signature Budget Breakfast", price: 600, description: "Includes: Pastries, Main Dishes & Sides, Fruits, Beverages" }
    ]
  }
];

const BookingProgress = ({ activeTab }: { activeTab: string }) => {
  const steps = [
    { id: "contact", label: "Contact Details" },
    { id: "activities", label: "Activities" },
    { id: "menu", label: "Menu" },
    { id: "accommodation", label: "Accommodation" }
  ];

  return (
    <div className="booking-progress">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.id} className={`progress-step ${activeTab === step.id ? 'active' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Booking = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [isContactFilled, setIsContactFilled] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<SelectedMenuItem[]>([]);
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    activities: [],
    food: [],
    drinks: [],
    accommodation: [],
    date: "",
    checkInDate: "",
    checkOutDate: "",
    checkInTime: "",
    checkOutTime: "",
    time: "",
    people: "",
    totalCost: 0,
    status: "Pending",
  });

  const [groundAvailability, setGroundAvailability] = useState<Record<string, boolean>>({});
  const [accommodationAvailability, setAccommodationAvailability] = useState<Record<string, AccommodationAvailability>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get next year's date for max date
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split('T')[0];

  useEffect(() => {
    if (formData.date) {
      checkGroundAvailability(formData.date);
    }
  }, [formData.date]);

  useEffect(() => {
    const { name, email, phone } = formData;
    setIsContactFilled(Boolean(name && email && phone));
  }, [formData.name, formData.email, formData.phone]);

  useEffect(() => {
    const total = calculateTotalCost();
    setFormData(prev => ({ ...prev, totalCost: total }));
  }, [
    formData.activities,
    formData.food,
    formData.drinks,
    formData.accommodation,
    formData.checkInDate,
    formData.checkOutDate,
    selectedMenuItems
  ]);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      checkAccommodationAvailabilityForAll();
    }
  }, [formData.checkInDate, formData.checkOutDate]);

  const checkGroundAvailability = async (date: string) => {
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef, 
      where("groundDate", "==", date)
    );
    const querySnapshot = await getDocs(q);
    
    const bookedGrounds = new Set<string>();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.selectedGround) {
        bookedGrounds.add(data.selectedGround);
      }
    });

    // Update availability status for each ground
    const newAvailability: Record<string, boolean> = {};
    grounds.forEach(ground => {
      newAvailability[ground.name] = !bookedGrounds.has(ground.name);
    });
    setGroundAvailability(newAvailability);

    return !bookedGrounds.has(formData.selectedGround || "");
  };

  const checkAccommodationAvailability = async (checkInDate: string, checkOutDate: string, accommodationType: string) => {
    try {
      // Validate dates first
      if (!checkInDate || !checkOutDate) {
        throw new Error("Check-in and check-out dates are required");
      }

      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      
      if (startDate >= endDate) {
        throw new Error("Check-out date must be after check-in date");
      }

      if (startDate < new Date()) {
        throw new Error("Check-in date cannot be in the past");
      }

      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("status", "in", ["Confirmed", "Pending"]),
        where("checkInDate", "!=", null),
        where("checkOutDate", "!=", null)
      );
      
      const querySnapshot = await getDocs(q);
      
      const conflictingBookings = querySnapshot.docs.some(doc => {
        const booking = doc.data();
        if (!booking.accommodation || !booking.checkInDate || !booking.checkOutDate) return false;
        
        // Check if any accommodation in the booking matches the type we're checking
        const hasMatchingAccommodation = booking.accommodation.some((acc: AccommodationOption) => acc.type === accommodationType);
        if (!hasMatchingAccommodation) return false;

        // Check for date overlap
        const bookingStart = new Date(booking.checkInDate);
        const bookingEnd = new Date(booking.checkOutDate);
        const newStart = new Date(checkInDate);
        const newEnd = new Date(checkOutDate);

        // Check if the new booking overlaps with existing booking
        return (newStart < bookingEnd && newEnd > bookingStart);
      });

      return !conflictingBookings;
    } catch (error) {
      console.error("Error checking accommodation availability:", error);
      setAvailabilityError(error instanceof Error ? error.message : "Failed to check accommodation availability. Please try again.");
      return false;
    }
  };

  const checkAccommodationAvailabilityForAll = async () => {
    if (!formData.checkInDate || !formData.checkOutDate) {
      setAvailabilityError("Please select both check-in and check-out dates");
      return;
    }
    
    setIsCheckingAvailability(true);
    setAvailabilityError(null);
    
    try {
      const availability: Record<string, AccommodationAvailability> = {};
      const checkPromises = Object.keys(accommodationPrices).map(async (type) => {
        const isAvailable = await checkAccommodationAvailability(
          formData.checkInDate!,
          formData.checkOutDate!,
          type
        );
        
        availability[type] = {
          type,
          dates: isAvailable ? [{
            start: formData.checkInDate!,
            end: formData.checkOutDate!
          }] : []
        };
      });

      await Promise.all(checkPromises);
      setAccommodationAvailability(availability);
    } catch (error) {
      console.error("Error checking availability for all accommodations:", error);
      setAvailabilityError(error instanceof Error ? error.message : "Failed to check availability. Please try again.");
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const calculateDays = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleMenuItemSelect = (item: MenuItem) => {
    setSelectedMenuItems(prev => {
      const existingItem = prev.find(i => i.name === item.name);
      if (existingItem) {
        return prev.map(i => 
          i.name === item.name 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleMenuItemQuantityChange = (itemName: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setSelectedMenuItems(prev => prev.filter(i => i.name !== itemName));
    } else {
      setSelectedMenuItems(prev => 
        prev.map(i => i.name === itemName ? { ...i, quantity: newQuantity } : i)
      );
    }
  };

  const calculateMenuTotal = () => {
    return selectedMenuItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalCost = () => {
    const activityCost = formData.activities.reduce((sum, item) => {
      const options = activityPrices[item.name];
      const basePrice = options ? options[item.options[0]] || 0 : 0;
      return sum + (basePrice * (item.numberOfPeople || 1));
    }, 0);

    const foodCost = formData.food.reduce((sum, item) => sum + (foodPrices[item] || 0), 0);
    const drinkCost = formData.drinks.reduce((sum, item) => sum + (drinkPrices[item] || 0), 0);
    const menuCost = calculateMenuTotal();
    
    const accommodationCost = formData.accommodation.reduce((sum, item) => {
      const options = accommodationPrices[item.type];
      let priceKey;

      if (item.type === "Big Tent Sharing") {
        priceKey = item.bedding ? "With Bedding" : "Without Bedding";
      } else if (item.type === "Cabins") {
        priceKey = "Standard";
      } else {
        priceKey = `${item.pax} Pax ${item.bedding ? "With" : "Without"} Bedding`;
      }

      const basePrice = options[priceKey] || 0;
      const days = formData.checkInDate && formData.checkOutDate ? 
        calculateDays(formData.checkInDate, formData.checkOutDate) : 1;

      return sum + (basePrice * days);
    }, 0);

    return activityCost + foodCost + drinkCost + accommodationCost + menuCost;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
    
    if (!formData.phone) errors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) errors.phone = "Invalid phone number format";
    
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    
    if (formData.accommodation.length > 0) {
      if (!formData.checkInDate) errors.checkInDate = "Check-in date is required";
      if (!formData.checkOutDate) errors.checkOutDate = "Check-out date is required";
      if (formData.checkInDate && formData.checkOutDate && 
          new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
        errors.checkOutDate = "Check-out date must be after check-in date";
      }
      if (!formData.checkInTime) errors.checkInTime = "Check-in time is required";
      if (!formData.checkOutTime) errors.checkOutTime = "Check-out time is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Validate activities if any are selected
    if (formData.activities.length > 0) {
      const invalidActivities = formData.activities.filter(activity => 
        !activity.options || activity.options.length === 0
      );
      if (invalidActivities.length > 0) {
        alert("Please complete all selected activities");
        return;
      }
    }

    // Validate accommodation dates if accommodation is selected
    if (formData.accommodation.length > 0) {
      if (!formData.checkInDate || !formData.checkOutDate || !formData.checkInTime || !formData.checkOutTime) {
        alert("Please fill in all accommodation dates and times");
        return;
      }
      if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
        alert("Check-out date must be after check-in date");
        return;
      }

      // Check accommodation availability for each selected accommodation
      for (const acc of formData.accommodation) {
        const isAvailable = await checkAccommodationAvailability(
          formData.checkInDate,
          formData.checkOutDate,
          acc.type
        );
        
        if (!isAvailable) {
          alert(`${acc.type} is not available for the selected dates. Please choose different dates or accommodation.`);
          return;
        }
      }
    }

    const updatedCost = calculateTotalCost();

    try {
      // Create a complete booking object
      const bookingData = {
        ...formData,
        totalCost: updatedCost,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        selectedMenuItems: selectedMenuItems,
        bookingDetails: {
          activities: formData.activities.map(activity => ({
            name: activity.name,
            option: activity.options[0],
            numberOfPeople: activity.numberOfPeople,
            price: activityPrices[activity.name]?.[activity.options[0]] || 0
          })),
          accommodation: formData.accommodation.map(acc => ({
            type: acc.type,
            bedding: acc.bedding,
            pax: acc.pax,
            price: accommodationPrices[acc.type]?.[`${acc.pax} Pax ${acc.bedding ? "With" : "Without"} Bedding`] || 0
          })),
          food: formData.food.map(item => ({
            name: item,
            price: foodPrices[item] || 0
          })),
          drinks: formData.drinks.map(item => ({
            name: item,
            price: drinkPrices[item] || 0
          }))
        }
      };

      await addDoc(collection(db, "bookings"), bookingData);
      alert("Booking successful!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        activities: [],
        food: [],
        drinks: [],
        accommodation: [],
        date: "",
        checkInDate: "",
        checkOutDate: "",
        checkInTime: "",
        checkOutTime: "",
        time: "",
        people: "",
        totalCost: 0,
        status: "Pending",
      });
      setSelectedMenuItems([]);
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="booking-page">
        <div className="booking-image">
          <img src={mountainImage} alt="Mountain view at Canaville Resort" />
        </div>
        
        <div className="booking-form-container">
          <div className="booking-form-inner">
            <h2 className="booking-title">Book a Service</h2>
            <BookingProgress activeTab={activeTab} />
            
            <div className="booking-tabs">
              <button 
                className={`tab ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => setActiveTab("contact")}
              >
                Contact Details *
              </button>
              <button 
                className={`tab ${activeTab === "activities" ? "active" : ""}`}
                onClick={() => setActiveTab("activities")}
                disabled={!isContactFilled}
              >
                Activities
              </button>
              <button 
                className={`tab ${activeTab === "menu" ? "active" : ""}`}
                onClick={() => setActiveTab("menu")}
                disabled={!isContactFilled}
              >
                Menu
              </button>
              <button 
                className={`tab ${activeTab === "accommodation" ? "active" : ""}`}
                onClick={() => setActiveTab("accommodation")}
                disabled={!isContactFilled}
              >
                Accommodation
              </button>
            </div>

            {!isContactFilled && activeTab !== "contact" && (
              <div className="warning-message">
                Please fill in your contact details first
              </div>
            )}

            <form className="booking-form" onSubmit={handleSubmit}>
              {activeTab === "contact" && (
                <div className="tab-content">
                  <div className="form-control">
                    <label className="form-label">Full Name</label>
                    <input 
                      className={`form-input ${formErrors.name ? 'error' : ''}`}
                      name="name" 
                      placeholder="Enter your name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>

                  <div className="form-control">
                    <label className="form-label">Email</label>
                    <input 
                      className={`form-input ${formErrors.email ? 'error' : ''}`}
                      name="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required 
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>

                  <div className="form-control">
                    <label className="form-label">Phone Number</label>
                    <input 
                      className={`form-input ${formErrors.phone ? 'error' : ''}`}
                      name="phone" 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required 
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>

                  <div className="form-control">
                    <label className="form-label">Date</label>
                    <input 
                      className={`form-input ${formErrors.date ? 'error' : ''}`}
                      name="date" 
                      type="date" 
                      value={formData.date} 
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={today}
                      max={maxDate}
                      required 
                    />
                    {formErrors.date && <span className="error-message">{formErrors.date}</span>}
                  </div>

                  <div className="form-control">
                    <label className="form-label">Time</label>
                    <input 
                      className={`form-input ${formErrors.time ? 'error' : ''}`}
                      name="time" 
                      type="time" 
                      value={formData.time} 
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      min="08:00"
                      max="20:00"
                      required 
                    />
                    {formErrors.time && <span className="error-message">{formErrors.time}</span>}
                  </div>
                </div>
              )}

              {activeTab === "activities" && isContactFilled && (
                <div className="tab-content">
                  <div className="form-section">
                    <h3>Activities</h3>
                    {Object.entries(activityPrices).map(([activityName, options]) => (
                      <div key={activityName} className="activity-item">
                        <h4>{activityName}</h4>
                        {Object.entries(options).map(([option, price]) => (
                          <div key={option} className="activity-option">
                            <label className="checkbox-label">
                              <input 
                                type="checkbox"
                                checked={formData.activities.some(a => a.name === activityName && a.options.includes(option))}
                                onChange={() => {
                                  const newActivities = [...formData.activities];
                                  const existingIndex = newActivities.findIndex(a => a.name === activityName);
                                  if (existingIndex >= 0) {
                                    newActivities.splice(existingIndex, 1);
                                  } else {
                                    newActivities.push({ 
                                      name: activityName, 
                                      options: [option],
                                      numberOfPeople: 1
                                    });
                                  }
                                  setFormData({ ...formData, activities: newActivities });
                                }}
                              />
                              {option} - Ksh {price}
                            </label>
                            {formData.activities.some(a => a.name === activityName && a.options.includes(option)) && (
                              <div className="people-input">
                                <label>Number of People:</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={formData.activities.find(a => a.name === activityName)?.numberOfPeople || 1}
                                  onChange={(e) => {
                                    const newActivities = [...formData.activities];
                                    const index = newActivities.findIndex(a => a.name === activityName);
                                    if (index >= 0) {
                                      newActivities[index] = {
                                        ...newActivities[index],
                                        numberOfPeople: parseInt(e.target.value)
                                      };
                                      setFormData({ ...formData, activities: newActivities });
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {activityName === "Grounds for Hire" && (
                          <div className="grounds-section">
                            <h4>Available Grounds</h4>
                            <div className="form-control">
                              <label>Select Date</label>
                              <input
                                type="date"
                                value={formData.groundDate || ""}
                                onChange={async (e) => {
                                  const date = e.target.value;
                                  setFormData({ ...formData, groundDate: date, selectedGround: undefined });
                                }}
                                required
                              />
                            </div>
                            {formData.groundDate && grounds.map((ground) => (
                              <label key={ground.name} className="ground-option">
                                <input
                                  type="radio"
                                  name="ground"
                                  value={ground.name}
                                  checked={formData.selectedGround === ground.name}
                                  disabled={!groundAvailability[ground.name]}
                                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (formData.groundDate && e.target.checked) {
                                      setFormData({
                                        ...formData,
                                        selectedGround: e.target.value,
                                        groundCapacity: ground.capacity
                                      });
                                      const isAvailable = await checkGroundAvailability(formData.groundDate);
                                      if (!isAvailable) {
                                        alert(`${ground.name} is already booked for this date`);
                                        setFormData({
                                          ...formData,
                                          selectedGround: undefined,
                                          groundCapacity: undefined
                                        });
                                      }
                                    }
                                  }}
                                />
                                {ground.name} - Capacity: {ground.capacity} people
                                {!groundAvailability[ground.name] && <span className="unavailable"> (Unavailable)</span>}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "menu" && (
                <div className="tab-content">
                  <div className="menu-section">
                    <h3>Menu</h3>
                    <div className="menu-categories">
                      {MENU_ITEMS.map((category) => (
                        <div key={category.category} className="menu-category">
                          <div 
                            className="category-header"
                            onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                          >
                            <h4>{category.category}</h4>
                            <span className={`expand-icon ${expandedCategory === category.category ? "expanded" : ""}`}>▼</span>
                          </div>
                          {expandedCategory === category.category && (
                            <div className="menu-items">
                              {category.items.map((item, index) => (
                                <div key={index} className="menu-item">
                                  <div className="item-info">
                                    <span className="item-name">{item.name}</span>
                                    {item.description && (
                                      <span className="item-description">{item.description}</span>
                                    )}
                                    <span className="item-price">Ksh {item.price}</span>
                                  </div>
                                  <div className="item-controls">
                                    <button 
                                      className="quantity-btn"
                                      onClick={() => handleMenuItemQuantityChange(item.name, (selectedMenuItems.find(i => i.name === item.name)?.quantity || 0) - 1)}
                                    >-</button>
                                    <span className="quantity">{selectedMenuItems.find(i => i.name === item.name)?.quantity || 0}</span>
                                    <button 
                                      className="quantity-btn"
                                      onClick={() => handleMenuItemSelect(item)}
                                    >+</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedMenuItems.length > 0 && (
                      <div className="selected-items-summary">
                        <h4>Selected Items</h4>
                        {selectedMenuItems.map((item, index) => (
                          <div key={index} className="selected-item">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                            <span>Ksh {item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="menu-total">
                          <strong>Menu Total: Ksh {calculateMenuTotal()}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "accommodation" && isContactFilled && (
                <div className="tab-content">
                  <div className="form-section">
                    <h3>Accommodation</h3>
                    {availabilityError && (
                      <div className="alert alert-error">
                        {availabilityError}
                      </div>
                    )}
                    <div className="date-range">
                      <div className="form-control">
                        <label>Check-in Date</label>
                        <input
                          type="date"
                          value={formData.checkInDate}
                          onChange={(e) => {
                            setFormData({ ...formData, checkInDate: e.target.value });
                            setAvailabilityError(null);
                          }}
                          className={`form-input ${formErrors.checkInDate ? 'error' : ''} ${isCheckingAvailability ? 'loading' : ''}`}
                          min={today}
                          max={maxDate}
                          required={formData.accommodation.length > 0}
                          disabled={isCheckingAvailability}
                        />
                        {formErrors.checkInDate && <span className="error-message">{formErrors.checkInDate}</span>}
                      </div>
                      <div className="form-control">
                        <label>Check-out Date</label>
                        <input
                          type="date"
                          value={formData.checkOutDate}
                          min={formData.checkInDate || today}
                          max={maxDate}
                          onChange={(e) => {
                            setFormData({ ...formData, checkOutDate: e.target.value });
                            setAvailabilityError(null);
                          }}
                          className={`form-input ${formErrors.checkOutDate ? 'error' : ''} ${isCheckingAvailability ? 'loading' : ''}`}
                          required={formData.accommodation.length > 0}
                          disabled={isCheckingAvailability}
                        />
                        {formErrors.checkOutDate && <span className="error-message">{formErrors.checkOutDate}</span>}
                      </div>
                    </div>
                    
                    {isCheckingAvailability && (
                      <div className="loading-message">
                        Checking availability...
                      </div>
                    )}

                    {Object.entries(accommodationPrices).map(([type, options]) => (
                      <div key={type} className={`accommodation-item ${isCheckingAvailability ? 'loading' : ''}`}>
                        <h4>
                          {type}
                          {!accommodationAvailability[type]?.dates && formData.checkInDate && formData.checkOutDate && (
                            <span className="unavailable-badge">Unavailable for selected dates</span>
                          )}
                        </h4>
                        {Object.entries(options).map(([option, price]) => {
                          const withBedding = option.includes("With Bedding");
                          const pax = parseInt(option.match(/\d+/)?.[0] || "1");
                          
                          return (
                            <label key={option} className={`checkbox-label ${!accommodationAvailability[type]?.dates ? 'disabled' : ''}`}>
                              <input 
                                type="checkbox"
                                checked={formData.accommodation.some(a => 
                                  a.type === type && 
                                  a.bedding === withBedding && 
                                  a.pax === pax
                                )}
                                onChange={() => {
                                  if (!accommodationAvailability[type]) return;
                                  
                                  const newAccommodation = [...formData.accommodation];
                                  const existingIndex = newAccommodation.findIndex(a => 
                                    a.type === type && 
                                    a.bedding === withBedding && 
                                    a.pax === pax
                                  );
                                  if (existingIndex >= 0) {
                                    newAccommodation.splice(existingIndex, 1);
                                  } else {
                                    newAccommodation.push({ 
                                      type,
                                      bedding: withBedding,
                                      pax
                                    });
                                  }
                                  setFormData({ ...formData, accommodation: newAccommodation });
                                }}
                                disabled={!accommodationAvailability[type] || isCheckingAvailability}
                              />
                              {option} - Ksh {price}
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="booking-summary">
                <h3>Total Cost: Ksh {calculateTotalCost()}</h3>
                <button 
                  className="form-button" 
                  type="submit"
                  disabled={!isContactFilled}
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Booking;
