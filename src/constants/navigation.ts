import type { BaseItem, DropdownItem } from "../types/allTypes";

export const navigationDropdown: DropdownItem[] = [
  { title: "Assets", url: "assets" },
  {
    title: "Boards & Signage",
    url: "boards-signage",
    baseItems: [
      { title: "Guest pick up card", url: "guest-pickup-card" },
      { title: "Playful Sign", url: "playful-sign" },
      { title: "Wedding Contact Board", url: "wedding-contact-board" },
      { title: "Wedding Welcome Board", url: "wedding-welcome-board" },
      { title: "Wedding Vow Board", url: "wedding-vow-board" },
    ],
  },
  {
    title: "Room Stationery",
    url: "room-stationery",
    baseItems: [
      { title: "Door Dangler", url: "door-dangler" },
      { title: "Hangover Kit", url: "hangover-kit" },
      { title: "Itinerary", url: "itinerary" },
      { title: "Tent Card", url: "tent-card" },
      { title: "Gift & Hamper Tags", url: "gift-hamper-tags" },
      { title: "Welcome Note", url: "welcome-note" },
    ],
  },
  {
    title: "Utility Stationery",
    url: "utility-stationery",
    baseItems: [
      { title: "Menu Card", url: "menu-card" },
      { title: "Ritual Kit", url: "ritual-kit" },
    ],
  },
  {
    title: "Fun & Entertainment",
    url: "fun-entertainment",
    baseItems: [
      { title: "Ghunghroo Sticks", url: "ghunghroo-sticks" },
      { title: "Popcorn Tub", url: "popcorn-tub" },
      { title: "Newspaper", url: "newspaper" },
      { title: "Tambola Tickets", url: "tambola-tickets" },
      { title: "Playing Cards", url: "playing-cards" },
      { title: "Instagram / Snapchat Filter", url: "instagram-snapchat-filter" },
    ],
  },
  {
    title: "Thermatic Elements",
    url: "thermatic-elements",
    baseItems: [
      { title: "Coconut Stamp", url: "coconut-stamp" },
      { title: "Food Topper", url: "food-topper" },
      { title: "Drink Stirrers", url: "drink-stirrers" },
      { title: "Petal Cones", url: "petal-cones" },
      { title: "Paper Cups", url: "paper-cups" },
      { title: "Straws", url: "straws" },
      { title: "Tissue Paper", url: "tissue-paper" },
    ],
  },
  {
    title: "Favour & Gifts",
    url: "favour-gifts",
    baseItems: [
      { title: "Bells With Tags", url: "bells-with-tags" },
      { title: "Badges", url: "badges" },
      { title: "Chocolate Wrapper", url: "chocolate-wrapper" },
      { title: "Luggage Tags", url: "luggage-tags" },
      { title: "Favour Paper Bags", url: "favour-paper-bags" },
      { title: "Jute Bags", url: "jute-bags" },
      { title: "Money Envelope", url: "money-envelope" },
      { title: "Pin Brooches", url: "pin-brooches" },
      { title: "Wedding Stickers", url: "wedding-stickers" },
      { title: "Welcome Mala", url: "welcome-mala" },
    ],
  },
  {
    title: "Invites & Planner",
    url: "invites-planner",
    baseItems: [
      { title: "E-Invite", url: "e-invite" },
      { title: "Wardrobe Planner", url: "wardrobe-planner" },
      { title: "Logo", url: "logo" },
      { title: "Hashtag", url: "hashtag" },
      { title: "Wax Seals", url: "wax-seals" },
      { title: "Wedding Logo Template", url: "wedding-logo-template" },
    ],
  },
];
