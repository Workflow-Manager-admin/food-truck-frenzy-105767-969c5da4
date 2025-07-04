//
// Shared constants for Food Chain Frenzy gameplay
//

// PUBLIC_INTERFACE
export const KITCHEN_ROWS = 3; // Number of conveyor/ingredient rows
export const KITCHEN_COLS = 5; // Ingredient spots per row

export const INGREDIENTS = [
  { name: "Lettuce", type: "veg", color: "#8be054", imgKey: "lettuce", points: 10 },
  { name: "Tomato", type: "veg", color: "#ff495a", imgKey: "tomato", points: 15 },
  { name: "Cheese", type: "dairy", color: "#ffe45e", imgKey: "cheese", points: 12 },
  { name: "Patty", type: "meat", color: "#89542c", imgKey: "patty", points: 20 },
  { name: "Bun", type: "bread", color: "#edc988", imgKey: "bun", points: 8 },
  { name: "Onion", type: "veg", color: "#fff4b5", imgKey: "onion", points: 10 },
  { name: "Pickle", type: "veg", color: "#85e085", imgKey: "pickle", points: 11 },
  { name: "Bacon", type: "meat", color: "#ef6c56", imgKey: "bacon", points: 18 },
  { name: "Fries", type: "side", color: "#fded99", imgKey: "fries", points: 9 },
  { name: "Soda", type: "drink", color: "#79aaff", imgKey: "soda", points: 8 }
];

// Example recipe definitions
export const RECIPES = [
  {
    name: "Classic Burger",
    ingredients: ["Bun", "Patty", "Cheese", "Tomato", "Lettuce", "Bun"],
    imgKey: "burger"
  },
  {
    name: "Veggie Stack",
    ingredients: ["Bun", "Lettuce", "Tomato", "Onion", "Pickle", "Bun"],
    imgKey: "veggieburger"
  },
  {
    name: "Bacon Deluxe",
    ingredients: ["Bun", "Patty", "Bacon", "Cheese", "Lettuce", "Bun"],
    imgKey: "baconburger"
  },
  {
    name: "Fries & Soda Combo",
    ingredients: ["Fries", "Soda"],
    imgKey: "combomeal"
  }
];

// Game timer durations (seconds)
export const GAME_TIMER_SEC = 90;
export const FRENZY_MODE_DURATION_SEC = 10;
export const RAGE_METER_MAX = 100;

// Combo/Streak scoring
export const BASE_SCORE_PER_SERVE = 50;
export const COMBO_BONUS = 20; // per combo increment
export const STREAK_BONUS = 40; // per streak

// Badge/Achievement Criteria
export const BADGES = [
  { key: "firstServe", label: "First Serve!", desc: "Serve your first customer" },
  { key: "combo3", label: "Combo Rookie", desc: "Score a 3x combo" },
  { key: "frenzy", label: "Frenzy Chef", desc: "Activate Fire Frenzy mode once" },
  { key: "rage", label: "Zero Chill", desc: "Trigger customer rage & save the day" },
  { key: "flawless", label: "Flawless Service", desc: "Complete a game with no angry customers" }
];

// Expressive moods for customers
export const CUSTOMER_MOODS = [
  { key: "waiting", label: "Waiting", face: "🙂" },
  { key: "impatient", label: "Impatient", face: "😠" },
  { key: "excited", label: "Excited", face: "🤩" },
  { key: "frenzy", label: "Frenzied!", face: "🔥" },
  { key: "gameover", label: "Gone!", face: "😱" }
];

// Color palette, from container details
export const COLORS = {
  primary: "#fd8188",
  secondary: "#fffefa",
  accent: "#111211"
};
