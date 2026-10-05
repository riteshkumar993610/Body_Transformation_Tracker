
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodName.css";

/* =========================================================
   FOOD DATA
========================================================= */

const foodData = [
  {
    id: 1,
    name: "Soya Chunks",
    quantity: "100g",
    calories: 345,
    protein: 52,
    carbs: 33,
    fat: 0.5,
    fiber: 13,
    calcium: 350,
    iron: 11,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Dinner", "Snack"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description:
      "Soya chunks provide plant-based protein along with carbohydrates and minerals.",
    benefits:
      "A convenient plant protein option that can be included as part of a varied, balanced meal.",
  },

  {
    id: 2,
    name: "Chicken Breast",
    quantity: "100g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    calcium: 15,
    iron: 1,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description:
      "Lean chicken breast is a protein-rich food with relatively little carbohydrate.",
    benefits:
      "Useful as a protein-rich part of a balanced meal, especially when paired with vegetables and grains.",
  },

  {
    id: 3,
    name: "Egg",
    quantity: "2 eggs",
    calories: 143,
    protein: 12.6,
    carbs: 0.7,
    fat: 9.5,
    fiber: 0,
    calcium: 56,
    iron: 1.8,
    category: "Protein",
    meals: ["Breakfast", "Lunch", "Dinner", "Snack"],
    goals: [
      "Muscle Support",
      "Hair Support",
      "Skin Support",
      "General Health",
    ],
    description:
      "Eggs provide protein, fats and several vitamins and minerals.",
    benefits:
      "A nutrient-dense food that can contribute protein and important micronutrients to a balanced diet.",
  },

  {
    id: 4,
    name: "Paneer",
    quantity: "100g",
    calories: 265,
    protein: 18,
    carbs: 6,
    fat: 20,
    fiber: 0,
    calcium: 208,
    iron: 2.2,
    category: "Protein & Kcal",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Muscle Support", "Strong Bones", "Teeth Support"],
    description:
      "Paneer provides protein, calcium and fat in a compact serving.",
    benefits:
      "Can contribute protein and calcium when included as part of a balanced meal.",
  },

  {
    id: 5,
    name: "Sattu",
    quantity: "100g",
    calories: 380,
    protein: 22,
    carbs: 58,
    fat: 6,
    fiber: 15,
    calcium: 120,
    iron: 5,
    category: "Protein & Carbs",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "Muscle Support", "General Health"],
    description:
      "Sattu made from roasted gram provides protein, carbohydrates and fiber.",
    benefits:
      "A versatile traditional food that can add plant protein, carbohydrates and fiber to meals.",
  },

  {
    id: 6,
    name: "Oats",
    quantity: "100g",
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    fiber: 10.6,
    calcium: 54,
    iron: 4.7,
    category: "High Carbs",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description:
      "Oats provide carbohydrates, protein and fiber and can be used in a variety of meals.",
    benefits:
      "A versatile grain that can contribute carbohydrates and fiber to a balanced diet.",
  },

  {
    id: 7,
    name: "Banana",
    quantity: "100g",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    fiber: 2.6,
    calcium: 5,
    iron: 0.3,
    category: "High Carbs",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description:
      "Bananas provide carbohydrates, fiber and several micronutrients.",
    benefits:
      "An easy-to-eat fruit that can contribute carbohydrates and fiber.",
  },

  {
    id: 8,
    name: "Cooked Rice",
    quantity: "100g",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    calcium: 10,
    iron: 0.2,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description:
      "Cooked rice is a common carbohydrate source that pairs well with vegetables and protein foods.",
    benefits:
      "Provides carbohydrates that can be part of a balanced meal.",
  },

  {
    id: 9,
    name: "Dal",
    quantity: "100g cooked",
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    fiber: 7.9,
    calcium: 19,
    iron: 3.3,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description:
      "Dal provides plant protein, carbohydrates and fiber.",
    benefits:
      "A useful plant-based protein option for balanced meals.",
  },

  {
    id: 10,
    name: "Milk",
    quantity: "100ml",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    fiber: 0,
    calcium: 113,
    iron: 0,
    category: "General Health",
    meals: ["Breakfast", "Snack"],
    goals: ["Strong Bones", "Teeth Support", "General Health"],
    description:
      "Milk provides protein, carbohydrates, fat and calcium.",
    benefits:
      "Can contribute protein and calcium as part of a varied diet.",
  },

    {
    id: 11,
    name: "Apple",
    quantity: "100g",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2,
    fiber: 2.4,
    calcium: 6,
    iron: 0.1,
    category: "Low Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Apple is a fruit that provides carbohydrates and dietary fiber.",
    benefits: "A convenient fruit option that adds variety and fiber to meals.",
  },

  {
    id: 12,
    name: "Orange",
    quantity: "100g",
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fat: 0.1,
    fiber: 2.4,
    calcium: 40,
    iron: 0.1,
    category: "Low Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Orange provides carbohydrates, fiber and vitamin C.",
    benefits: "A refreshing fruit that can contribute fiber and micronutrients.",
  },

  {
    id: 13,
    name: "Sweet Potato",
    quantity: "100g",
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1,
    fiber: 3,
    calcium: 30,
    iron: 0.6,
    category: "High Carbs",
    meals: ["Breakfast", "Lunch", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Sweet potato is a carbohydrate-rich food with dietary fiber.",
    benefits: "A versatile food that can be included in balanced meals.",
  },

  {
    id: 14,
    name: "Boiled Potato",
    quantity: "100g",
    calories: 87,
    protein: 1.9,
    carbs: 20.1,
    fat: 0.1,
    fiber: 1.8,
    calcium: 5,
    iron: 0.3,
    category: "High Carbs",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Boiled potato provides carbohydrates and small amounts of protein.",
    benefits: "A simple carbohydrate source that works well in many meals.",
  },

  {
    id: 15,
    name: "Guava",
    quantity: "100g",
    calories: 68,
    protein: 2.6,
    carbs: 14.3,
    fat: 1,
    fiber: 5.4,
    calcium: 18,
    iron: 0.3,
    category: "Low Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Guava is a fruit containing fiber, carbohydrates and protein.",
    benefits: "A nutrient-rich fruit that adds variety and fiber.",
  },

  {
    id: 16,
    name: "Papaya",
    quantity: "100g",
    calories: 43,
    protein: 0.5,
    carbs: 10.8,
    fat: 0.3,
    fiber: 1.7,
    calcium: 20,
    iron: 0.3,
    category: "Low Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["General Health", "Energy"],
    description: "Papaya is a soft fruit containing carbohydrates and fiber.",
    benefits: "A light and convenient fruit option for a varied diet.",
  },

  {
    id: 17,
    name: "Mango",
    quantity: "100g",
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fat: 0.4,
    fiber: 1.6,
    calcium: 11,
    iron: 0.2,
    category: "High Carbs",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Mango is a sweet fruit rich in carbohydrates.",
    benefits: "Provides carbohydrates and can add variety to meals and snacks.",
  },

  {
    id: 18,
    name: "Pomegranate",
    quantity: "100g",
    calories: 83,
    protein: 1.7,
    carbs: 18.7,
    fat: 1.2,
    fiber: 4,
    calcium: 10,
    iron: 0.3,
    category: "High Carbs",
    meals: ["Breakfast", "Snack"],
    goals: ["General Health", "Energy"],
    description: "Pomegranate provides carbohydrates, fiber and plant nutrients.",
    benefits: "A flavorful fruit that can add variety to a balanced diet.",
  },

  {
    id: 19,
    name: "Watermelon",
    quantity: "100g",
    calories: 30,
    protein: 0.6,
    carbs: 7.6,
    fat: 0.2,
    fiber: 0.4,
    calcium: 7,
    iron: 0.2,
    category: "Low Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["General Health", "Energy"],
    description: "Watermelon is a water-rich fruit containing carbohydrates.",
    benefits: "A refreshing fruit option that adds variety to snacks.",
  },

  {
    id: 20,
    name: "Pineapple",
    quantity: "100g",
    calories: 50,
    protein: 0.5,
    carbs: 13.1,
    fat: 0.1,
    fiber: 1.4,
    calcium: 13,
    iron: 0.3,
    category: "Low Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["General Health", "Energy"],
    description: "Pineapple is a tropical fruit containing carbohydrates and fiber.",
    benefits: "A flavorful fruit that can add variety to meals.",
  },

  {
    id: 21,
    name: "Papad",
    quantity: "100g",
    calories: 350,
    protein: 20,
    carbs: 55,
    fat: 5,
    fiber: 10,
    calcium: 100,
    iron: 5,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health", "Energy"],
    description: "Papad is a thin food commonly made from pulses or flour.",
    benefits: "Can add texture and variety when included as part of a balanced meal.",
  },

  {
    id: 22,
    name: "Moong Dal",
    quantity: "100g cooked",
    calories: 105,
    protein: 7,
    carbs: 19,
    fat: 0.4,
    fiber: 7,
    calcium: 27,
    iron: 1.4,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Moong dal is a pulse that provides protein, carbohydrates and fiber.",
    benefits: "A versatile plant-based protein option for everyday meals.",
  },

  {
    id: 23,
    name: "Masoor Dal",
    quantity: "100g cooked",
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    fiber: 7.9,
    calcium: 19,
    iron: 3.3,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Masoor dal provides plant protein, carbohydrates and fiber.",
    benefits: "A useful pulse for balanced meals.",
  },

  {
    id: 24,
    name: "Chana Dal",
    quantity: "100g cooked",
    calories: 164,
    protein: 8.9,
    carbs: 27.4,
    fat: 2.6,
    fiber: 7.6,
    calcium: 49,
    iron: 2.9,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Chana dal is a pulse rich in protein, carbohydrates and fiber.",
    benefits: "A filling plant-based food that works well in Indian meals.",
  },

  {
    id: 25,
    name: "Rajma",
    quantity: "100g cooked",
    calories: 127,
    protein: 8.7,
    carbs: 22.8,
    fat: 0.5,
    fiber: 6.4,
    calcium: 28,
    iron: 2.9,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Rajma provides plant protein, carbohydrates and dietary fiber.",
    benefits: "A popular pulse that can be part of balanced meals.",
  },

  {
    id: 26,
    name: "Black Chana",
    quantity: "100g cooked",
    calories: 164,
    protein: 8.9,
    carbs: 27.4,
    fat: 2.6,
    fiber: 7.6,
    calcium: 49,
    iron: 2.9,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Snack"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Black chana is a pulse containing protein, carbohydrates and fiber.",
    benefits: "A versatile plant-based food suitable for many meals.",
  },

  {
    id: 27,
    name: "Green Peas",
    quantity: "100g",
    calories: 81,
    protein: 5.4,
    carbs: 14.5,
    fat: 0.4,
    fiber: 5.1,
    calcium: 25,
    iron: 1.5,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Green peas provide plant protein, carbohydrates and fiber.",
    benefits: "Easy to include in curries, rice dishes and mixed meals.",
  },

  {
    id: 28,
    name: "Chickpeas",
    quantity: "100g cooked",
    calories: 164,
    protein: 8.9,
    carbs: 27.4,
    fat: 2.6,
    fiber: 7.6,
    calcium: 49,
    iron: 2.9,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Snack"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Chickpeas provide protein, carbohydrates and dietary fiber.",
    benefits: "A versatile pulse that can be used in salads, curries and snacks.",
  },

  {
    id: 29,
    name: "Black Beans",
    quantity: "100g cooked",
    calories: 132,
    protein: 8.9,
    carbs: 23.7,
    fat: 0.5,
    fiber: 8.7,
    calcium: 27,
    iron: 2.1,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Black beans are a plant-based food rich in protein and fiber.",
    benefits: "Can add variety to balanced meals.",
  },

  {
    id: 30,
    name: "Soybean",
    quantity: "100g cooked",
    calories: 173,
    protein: 16.6,
    carbs: 9.9,
    fat: 9,
    fiber: 6,
    calcium: 102,
    iron: 5.1,
    category: "High Protein",
    meals: ["Lunch", "Dinner", "Snack"],
    goals: ["Muscle Support", "General Health"],
    description: "Soybeans are a plant food containing substantial protein and fat.",
    benefits: "A versatile plant-based protein source.",
  },

  {
    id: 31,
    name: "Tofu",
    quantity: "100g",
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fat: 4.8,
    fiber: 0.3,
    calcium: 350,
    iron: 5.4,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Muscle Support", "Strong Bones", "General Health"],
    description: "Tofu is a soy-based food providing protein and minerals.",
    benefits: "A versatile plant-based option for a variety of meals.",
  },

  {
    id: 32,
    name: "Greek Yogurt",
    quantity: "100g",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    calcium: 110,
    iron: 0,
    category: "High Protein",
    meals: ["Breakfast", "Snack"],
    goals: ["Muscle Support", "Strong Bones", "General Health"],
    description: "Greek yogurt provides protein and calcium.",
    benefits: "A convenient protein-containing dairy option.",
  },

  {
    id: 33,
    name: "Curd",
    quantity: "100g",
    calories: 61,
    protein: 3.5,
    carbs: 4.7,
    fat: 3.3,
    fiber: 0,
    calcium: 121,
    iron: 0.1,
    category: "General Health",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Strong Bones", "Teeth Support", "General Health"],
    description: "Curd is a fermented dairy food containing protein and calcium.",
    benefits: "Can complement a balanced meal and provide dairy nutrients.",
  },

  {
    id: 34,
    name: "Buttermilk",
    quantity: "100ml",
    calories: 40,
    protein: 3.3,
    carbs: 4.8,
    fat: 0.9,
    fiber: 0,
    calcium: 116,
    iron: 0,
    category: "General Health",
    meals: ["Lunch", "Snack"],
    goals: ["Strong Bones", "Teeth Support", "General Health"],
    description: "Buttermilk is a light dairy beverage containing protein and calcium.",
    benefits: "A refreshing dairy option for meals.",
  },

  {
    id: 35,
    name: "Cheese",
    quantity: "100g",
    calories: 402,
    protein: 25,
    carbs: 1.3,
    fat: 33,
    fiber: 0,
    calcium: 721,
    iron: 0.7,
    category: "High Kcal",
    meals: ["Breakfast", "Lunch", "Snack"],
    goals: ["Strong Bones", "Teeth Support", "General Health"],
    description: "Cheese is a dairy food containing protein, fat and calcium.",
    benefits: "Can provide dairy nutrients when included in varied meals.",
  },

  {
    id: 36,
    name: "Almonds",
    quantity: "100g",
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9,
    fiber: 12.5,
    calcium: 269,
    iron: 3.7,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Almonds provide protein, healthy fats, fiber and minerals.",
    benefits: "A nutrient-dense snack option in suitable portions.",
  },

  {
    id: 37,
    name: "Walnuts",
    quantity: "100g",
    calories: 654,
    protein: 15.2,
    carbs: 13.7,
    fat: 65.2,
    fiber: 6.7,
    calcium: 98,
    iron: 2.9,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Walnuts provide fats, protein and dietary fiber.",
    benefits: "A nutrient-dense nut that adds variety to snacks.",
  },

  {
    id: 38,
    name: "Cashews",
    quantity: "100g",
    calories: 553,
    protein: 18.2,
    carbs: 30.2,
    fat: 43.9,
    fiber: 3.3,
    calcium: 37,
    iron: 6.7,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Cashews provide protein, carbohydrates, fats and minerals.",
    benefits: "A convenient nutrient-dense snack option.",
  },

  {
    id: 39,
    name: "Peanuts",
    quantity: "100g",
    calories: 567,
    protein: 25.8,
    carbs: 16.1,
    fat: 49.2,
    fiber: 8.5,
    calcium: 92,
    iron: 4.6,
    category: "High Protein",
    meals: ["Breakfast", "Snack"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Peanuts provide protein, fats, carbohydrates and fiber.",
    benefits: "A versatile food that can be used in snacks and meals.",
  },

  {
    id: 40,
    name: "Pistachios",
    quantity: "100g",
    calories: 562,
    protein: 20.2,
    carbs: 27.2,
    fat: 45.3,
    fiber: 10.6,
    calcium: 105,
    iron: 3.9,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Pistachios contain protein, fats, carbohydrates and fiber.",
    benefits: "A nutrient-dense nut that can add variety to snacks.",
  },

  {
    id: 41,
    name: "Chia Seeds",
    quantity: "100g",
    calories: 486,
    protein: 16.5,
    carbs: 42.1,
    fat: 30.7,
    fiber: 34.4,
    calcium: 631,
    iron: 7.7,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Chia seeds provide fiber, protein, fats and minerals.",
    benefits: "Can be added to yogurt, oats and other foods.",
  },

  {
    id: 42,
    name: "Flax Seeds",
    quantity: "100g",
    calories: 534,
    protein: 18.3,
    carbs: 28.9,
    fat: 42.2,
    fiber: 27.3,
    calcium: 255,
    iron: 5.7,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Flax seeds contain fiber, protein and fats.",
    benefits: "A versatile seed that can be added to everyday foods.",
  },

  {
    id: 43,
    name: "Pumpkin Seeds",
    quantity: "100g",
    calories: 559,
    protein: 30.2,
    carbs: 10.7,
    fat: 49.1,
    fiber: 6,
    calcium: 46,
    iron: 8.8,
    category: "High Protein",
    meals: ["Breakfast", "Snack"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Pumpkin seeds provide protein, fats, fiber and minerals.",
    benefits: "A nutrient-dense seed option for snacks and meals.",
  },

  {
    id: 44,
    name: "Sunflower Seeds",
    quantity: "100g",
    calories: 584,
    protein: 20.8,
    carbs: 20,
    fat: 51.5,
    fiber: 8.6,
    calcium: 78,
    iron: 5.3,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Sunflower seeds provide protein, fats, fiber and minerals.",
    benefits: "Can add crunch and nutrients to meals and snacks.",
  },

  {
    id: 45,
    name: "Brown Rice",
    quantity: "100g cooked",
    calories: 123,
    protein: 2.7,
    carbs: 25.6,
    fat: 1,
    fiber: 1.6,
    calcium: 10,
    iron: 0.6,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Brown rice provides carbohydrates, fiber and a small amount of protein.",
    benefits: "A whole-grain alternative for varied meals.",
  },

  {
    id: 46,
    name: "Quinoa",
    quantity: "100g cooked",
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    fiber: 2.8,
    calcium: 17,
    iron: 1.5,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Quinoa provides carbohydrates, protein and dietary fiber.",
    benefits: "A versatile grain-like food for balanced meals.",
  },

  {
    id: 47,
    name: "Poha",
    quantity: "100g cooked",
    calories: 130,
    protein: 2.6,
    carbs: 25,
    fat: 2,
    fiber: 1.5,
    calcium: 20,
    iron: 1.2,
    category: "High Carbs",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Poha is a rice-based Indian breakfast food containing carbohydrates.",
    benefits: "A simple and versatile breakfast option.",
  },

  {
    id: 48,
    name: "Upma",
    quantity: "100g cooked",
    calories: 120,
    protein: 3,
    carbs: 20,
    fat: 3,
    fiber: 2,
    calcium: 15,
    iron: 0.8,
    category: "High Carbs",
    meals: ["Breakfast"],
    goals: ["Energy", "General Health"],
    description: "Upma is commonly prepared using semolina and vegetables.",
    benefits: "Can be combined with vegetables and other foods for a balanced meal.",
  },

  {
    id: 49,
    name: "Ragi",
    quantity: "100g",
    calories: 336,
    protein: 7.3,
    carbs: 72,
    fat: 1.3,
    fiber: 3.6,
    calcium: 344,
    iron: 3.9,
    category: "High Carbs",
    meals: ["Breakfast", "Snack"],
    goals: ["Strong Bones", "Energy", "General Health"],
    description: "Ragi is a millet containing carbohydrates, fiber and calcium.",
    benefits: "A traditional grain option that adds variety to meals.",
  },

  {
    id: 50,
    name: "Bajra",
    quantity: "100g",
    calories: 361,
    protein: 11,
    carbs: 67,
    fat: 5,
    fiber: 8,
    calcium: 42,
    iron: 8,
    category: "High Carbs",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Bajra is a millet containing carbohydrates, protein and fiber.",
    benefits: "A traditional grain that can be used in rotis and other dishes.",
  },

  {
    id: 51,
    name: "Jowar",
    quantity: "100g",
    calories: 329,
    protein: 10.4,
    carbs: 72.1,
    fat: 3.1,
    fiber: 6.7,
    calcium: 25,
    iron: 4.1,
    category: "High Carbs",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Jowar is a millet rich in carbohydrates and dietary fiber.",
    benefits: "A traditional grain option for varied meals.",
  },

  {
    id: 52,
    name: "Barley",
    quantity: "100g cooked",
    calories: 123,
    protein: 2.3,
    carbs: 28.2,
    fat: 0.4,
    fiber: 3.8,
    calcium: 11,
    iron: 1.3,
    category: "High Carbs",
    meals: ["Breakfast", "Lunch"],
    goals: ["Energy", "General Health"],
    description: "Barley provides carbohydrates and dietary fiber.",
    benefits: "Can be used in soups, porridge and grain-based meals.",
  },

  {
    id: 53,
    name: "Whole Wheat Roti",
    quantity: "100g",
    calories: 297,
    protein: 11,
    carbs: 55,
    fat: 4,
    fiber: 11,
    calcium: 34,
    iron: 3.9,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Whole wheat roti provides carbohydrates, protein and fiber.",
    benefits: "A common staple that can be paired with vegetables and pulses.",
  },

  {
    id: 54,
    name: "Multigrain Roti",
    quantity: "100g",
    calories: 300,
    protein: 10,
    carbs: 52,
    fat: 6,
    fiber: 8,
    calcium: 40,
    iron: 3.5,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Multigrain roti combines grains and provides carbohydrates and fiber.",
    benefits: "Can add variety to everyday meals.",
  },

  {
    id: 55,
    name: "Besan",
    quantity: "100g",
    calories: 387,
    protein: 22,
    carbs: 58,
    fat: 6.7,
    fiber: 10.8,
    calcium: 45,
    iron: 4.9,
    category: "High Protein",
    meals: ["Breakfast", "Snack"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Besan is flour made from chickpeas and provides protein and carbohydrates.",
    benefits: "Useful for preparing dishes such as chilla and pakoras.",
  },

  {
    id: 56,
    name: "Moong Dal Chilla",
    quantity: "100g",
    calories: 180,
    protein: 9,
    carbs: 28,
    fat: 4,
    fiber: 4,
    calcium: 35,
    iron: 2.5,
    category: "High Protein",
    meals: ["Breakfast", "Snack"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Moong dal chilla is a savory pancake made from moong dal batter.",
    benefits: "A protein-containing Indian breakfast option.",
  },

  {
    id: 57,
    name: "Dosa",
    quantity: "100g",
    calories: 168,
    protein: 3.9,
    carbs: 29,
    fat: 3.7,
    fiber: 1.5,
    calcium: 20,
    iron: 1.5,
    category: "High Carbs",
    meals: ["Breakfast", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Dosa is a fermented rice and lentil-based Indian dish.",
    benefits: "A versatile meal that can be paired with vegetables and pulses.",
  },

  {
    id: 58,
    name: "Idli",
    quantity: "100g",
    calories: 130,
    protein: 4,
    carbs: 25,
    fat: 1,
    fiber: 1.5,
    calcium: 20,
    iron: 1.2,
    category: "High Carbs",
    meals: ["Breakfast"],
    goals: ["Energy", "General Health"],
    description: "Idli is a steamed fermented rice and lentil food.",
    benefits: "A light and convenient breakfast option.",
  },

  {
    id: 59,
    name: "Sambar",
    quantity: "100g",
    calories: 70,
    protein: 3.5,
    carbs: 10,
    fat: 2,
    fiber: 2.5,
    calcium: 35,
    iron: 1,
    category: "General Health",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["General Health", "Energy"],
    description: "Sambar is a lentil and vegetable-based South Indian dish.",
    benefits: "Combines vegetables with lentils and adds variety to meals.",
  },

  {
    id: 60,
    name: "Sprouted Moong",
    quantity: "100g",
    calories: 30,
    protein: 3,
    carbs: 6,
    fat: 0.2,
    fiber: 1.8,
    calcium: 13,
    iron: 1,
    category: "High Protein",
    meals: ["Breakfast", "Snack"],
    goals: ["Muscle Support", "General Health"],
    description: "Sprouted moong provides plant protein, carbohydrates and fiber.",
    benefits: "A versatile addition to salads and snacks.",
  },

  {
    id: 61,
    name: "Boiled Egg",
    quantity: "1 egg",
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fat: 5.3,
    fiber: 0,
    calcium: 25,
    iron: 0.9,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Snack"],
    goals: ["Muscle Support", "General Health"],
    description: "A boiled egg provides protein, fats and several micronutrients.",
    benefits: "A convenient protein-containing food.",
  },

  {
    id: 62,
    name: "Fish",
    quantity: "100g",
    calories: 120,
    protein: 22,
    carbs: 0,
    fat: 3,
    fiber: 0,
    calcium: 20,
    iron: 0.5,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Fish provides high-quality protein and varying amounts of healthy fats.",
    benefits: "A versatile protein option for balanced meals.",
  },

  {
    id: 63,
    name: "Salmon",
    quantity: "100g",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
    calcium: 9,
    iron: 0.3,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Salmon provides protein and naturally occurring fats.",
    benefits: "A nutrient-dense fish option for varied meals.",
  },

  {
    id: 64,
    name: "Tuna",
    quantity: "100g",
    calories: 132,
    protein: 28,
    carbs: 0,
    fat: 1.3,
    fiber: 0,
    calcium: 10,
    iron: 1,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Tuna is a protein-rich fish with very little carbohydrate.",
    benefits: "A convenient protein option for meals and salads.",
  },

  {
    id: 65,
    name: "Chicken Thigh",
    quantity: "100g",
    calories: 209,
    protein: 26,
    carbs: 0,
    fat: 11,
    fiber: 0,
    calcium: 12,
    iron: 1.3,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Chicken thigh provides protein and fat.",
    benefits: "A versatile poultry option for balanced meals.",
  },

  {
    id: 66,
    name: "Turkey",
    quantity: "100g",
    calories: 135,
    protein: 29,
    carbs: 0,
    fat: 1.6,
    fiber: 0,
    calcium: 13,
    iron: 1.1,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Turkey provides protein with relatively little carbohydrate.",
    benefits: "A versatile poultry protein option.",
  },

  {
    id: 67,
    name: "Paneer Tikka",
    quantity: "100g",
    calories: 220,
    protein: 16,
    carbs: 8,
    fat: 14,
    fiber: 1,
    calcium: 200,
    iron: 1.5,
    category: "High Protein",
    meals: ["Lunch", "Dinner", "Snack"],
    goals: ["Muscle Support", "Strong Bones", "General Health"],
    description: "Paneer tikka combines paneer with vegetables and spices.",
    benefits: "Provides protein and calcium while adding variety to meals.",
  },

  {
    id: 68,
    name: "Soya Milk",
    quantity: "100ml",
    calories: 54,
    protein: 3.3,
    carbs: 6,
    fat: 1.8,
    fiber: 0.6,
    calcium: 25,
    iron: 0.6,
    category: "High Protein",
    meals: ["Breakfast", "Snack"],
    goals: ["Muscle Support", "General Health"],
    description: "Soy milk is a plant-based beverage containing protein.",
    benefits: "A dairy alternative that can contribute protein to meals.",
  },

  {
    id: 69,
    name: "Coconut",
    quantity: "100g",
    calories: 354,
    protein: 3.3,
    carbs: 15.2,
    fat: 33.5,
    fiber: 9,
    calcium: 14,
    iron: 2.4,
    category: "High Kcal",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Coconut provides fats, carbohydrates and dietary fiber.",
    benefits: "Can be used in a variety of traditional dishes.",
  },

  {
    id: 70,
    name: "Avocado",
    quantity: "100g",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    calcium: 12,
    iron: 0.6,
    category: "General Health",
    meals: ["Breakfast", "Snack"],
    goals: ["Energy", "General Health"],
    description: "Avocado provides fats, fiber and small amounts of protein.",
    benefits: "A versatile fruit that can add variety and texture to meals.",
  },

  {
    id: 71,
    name: "Tomato",
    quantity: "100g",
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    calcium: 10,
    iron: 0.3,
    category: "Low Kcal",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Tomato is a low-energy vegetable-like fruit containing fiber and carbohydrates.",
    benefits: "Easy to include in salads, curries and sandwiches.",
  },

  {
    id: 72,
    name: "Carrot",
    quantity: "100g",
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
    fiber: 2.8,
    calcium: 33,
    iron: 0.3,
    category: "Low Kcal",
    meals: ["Breakfast", "Lunch", "Snack"],
    goals: ["General Health", "Energy"],
    description: "Carrot provides carbohydrates, fiber and micronutrients.",
    benefits: "A versatile vegetable for salads, snacks and cooked meals.",
  },

  {
    id: 73,
    name: "Spinach",
    quantity: "100g",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    calcium: 99,
    iron: 2.7,
    category: "Low Kcal",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Strong Bones", "General Health"],
    description: "Spinach provides fiber, plant protein, calcium and iron.",
    benefits: "A leafy vegetable that can be added to many balanced meals.",
  },

  {
    id: 74,
    name: "Broccoli",
    quantity: "100g",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    fiber: 2.6,
    calcium: 47,
    iron: 0.7,
    category: "Low Kcal",
    meals: ["Lunch", "Dinner"],
    goals: ["Strong Bones", "General Health"],
    description: "Broccoli provides fiber, protein and several micronutrients.",
    benefits: "A versatile vegetable for balanced meals.",
  },

  {
    id: 75,
    name: "Cucumber",
    quantity: "100g",
    calories: 15,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1,
    fiber: 0.5,
    calcium: 16,
    iron: 0.3,
    category: "Low Kcal",
    meals: ["Breakfast", "Lunch", "Dinner", "Snack"],
    goals: ["General Health"],
    description: "Cucumber is a water-rich vegetable containing small amounts of fiber.",
    benefits: "A refreshing addition to salads and meals.",
  },


    {
    id: 76,
    name: "Aloo Gobi",
    quantity: "150g",
    calories: 160,
    protein: 4,
    carbs: 22,
    fat: 6,
    fiber: 5,
    calcium: 55,
    iron: 1.5,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Aloo gobi is a common Indian vegetable dish made with potato and cauliflower.",
    benefits: "Provides carbohydrates, vegetables and dietary fiber.",
  },

  {
    id: 77,
    name: "Bhindi Masala",
    quantity: "150g",
    calories: 145,
    protein: 4,
    carbs: 17,
    fat: 7,
    fiber: 6,
    calcium: 100,
    iron: 1.5,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Bhindi masala is an Indian okra dish prepared with spices and vegetables.",
    benefits: "Provides vegetables and dietary fiber as part of a balanced meal.",
  },

  {
    id: 78,
    name: "Baingan Bharta",
    quantity: "150g",
    calories: 135,
    protein: 3,
    carbs: 15,
    fat: 7,
    fiber: 5,
    calcium: 35,
    iron: 1.2,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Baingan bharta is a roasted eggplant dish cooked with onion, tomato and spices.",
    benefits: "A flavorful vegetable dish that provides fiber and variety.",
  },

  {
    id: 79,
    name: "Matar Paneer",
    quantity: "150g",
    calories: 270,
    protein: 13,
    carbs: 14,
    fat: 18,
    fiber: 3,
    calcium: 180,
    iron: 1.8,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "Strong Bones", "General Health"],
    description: "Matar paneer combines paneer and green peas in a spiced gravy.",
    benefits: "Provides protein, calcium and carbohydrates.",
  },

  {
    id: 80,
    name: "Palak Paneer",
    quantity: "150g",
    calories: 240,
    protein: 13,
    carbs: 10,
    fat: 17,
    fiber: 3,
    calcium: 250,
    iron: 2.5,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "Strong Bones", "General Health"],
    description: "Palak paneer combines paneer with spinach and spices.",
    benefits: "Provides protein, calcium, iron and leafy vegetables.",
  },

  {
    id: 81,
    name: "Shahi Paneer",
    quantity: "150g",
    calories: 320,
    protein: 14,
    carbs: 12,
    fat: 25,
    fiber: 2,
    calcium: 220,
    iron: 1.5,
    category: "High Kcal",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "Strong Bones", "General Health"],
    description: "Shahi paneer is a rich paneer curry prepared with a creamy spiced gravy.",
    benefits: "Provides protein and calcium in a rich meal option.",
  },

  {
    id: 82,
    name: "Dal Tadka",
    quantity: "150g",
    calories: 150,
    protein: 8,
    carbs: 22,
    fat: 4,
    fiber: 6,
    calcium: 35,
    iron: 2,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Dal tadka is cooked lentil prepared with spices and a tempering.",
    benefits: "Provides plant protein, carbohydrates and dietary fiber.",
  },

  {
    id: 83,
    name: "Dal Makhani",
    quantity: "150g",
    calories: 250,
    protein: 10,
    carbs: 25,
    fat: 12,
    fiber: 7,
    calcium: 55,
    iron: 2.5,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Dal makhani is a creamy lentil dish commonly served with rice or breads.",
    benefits: "Provides plant protein, fiber and carbohydrates.",
  },

  {
    id: 84,
    name: "Chole Masala",
    quantity: "150g",
    calories: 200,
    protein: 10,
    carbs: 30,
    fat: 5,
    fiber: 8,
    calcium: 70,
    iron: 3,
    category: "High Protein",
    meals: ["Breakfast", "Lunch", "Dinner"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Chole masala is a chickpea curry cooked with tomato and Indian spices.",
    benefits: "Provides plant protein, carbohydrates and fiber.",
  },

  {
    id: 85,
    name: "Kadhi Pakora",
    quantity: "200g",
    calories: 240,
    protein: 8,
    carbs: 25,
    fat: 12,
    fiber: 3,
    calcium: 120,
    iron: 1.5,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["Strong Bones", "General Health"],
    description: "Kadhi pakora combines yogurt-based gravy with gram-flour pakoras.",
    benefits: "Provides dairy nutrients and carbohydrates in a traditional Indian dish.",
  },

  {
    id: 86,
    name: "Aloo Matar",
    quantity: "150g",
    calories: 170,
    protein: 4,
    carbs: 25,
    fat: 6,
    fiber: 5,
    calcium: 35,
    iron: 1.4,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Aloo matar is a home-style curry made with potatoes and green peas.",
    benefits: "Provides carbohydrates, vegetables and fiber.",
  },

  {
    id: 87,
    name: "Matar Mushroom",
    quantity: "150g",
    calories: 155,
    protein: 6,
    carbs: 15,
    fat: 8,
    fiber: 4,
    calcium: 30,
    iron: 1.5,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Matar mushroom combines mushrooms and green peas in a spiced gravy.",
    benefits: "Provides vegetables, plant protein and dietary fiber.",
  },

  {
    id: 88,
    name: "Mix Veg Curry",
    quantity: "150g",
    calories: 150,
    protein: 4,
    carbs: 18,
    fat: 7,
    fiber: 5,
    calcium: 55,
    iron: 1.5,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health", "Energy"],
    description: "Mixed vegetable curry combines several vegetables with Indian spices.",
    benefits: "Adds variety of vegetables and dietary fiber to meals.",
  },

  {
    id: 89,
    name: "Lauki Chana",
    quantity: "150g",
    calories: 135,
    protein: 6,
    carbs: 18,
    fat: 4,
    fiber: 5,
    calcium: 45,
    iron: 1.5,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Lauki chana is a home-style curry made with bottle gourd and chickpeas.",
    benefits: "Provides vegetables, plant protein and fiber.",
  },

  {
    id: 90,
    name: "Karela Sabzi",
    quantity: "150g",
    calories: 120,
    protein: 3,
    carbs: 14,
    fat: 6,
    fiber: 5,
    calcium: 35,
    iron: 1.3,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Karela sabzi is a bitter gourd preparation cooked with spices.",
    benefits: "Provides vegetables and dietary fiber.",
  },

  {
    id: 91,
    name: "Methi Aloo",
    quantity: "150g",
    calories: 155,
    protein: 4,
    carbs: 22,
    fat: 6,
    fiber: 4,
    calcium: 75,
    iron: 2,
    category: "General Health",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Methi aloo combines fenugreek leaves with potato and spices.",
    benefits: "Provides carbohydrates, leafy greens and fiber.",
  },

  {
    id: 92,
    name: "Jeera Aloo",
    quantity: "150g",
    calories: 180,
    protein: 3,
    carbs: 27,
    fat: 7,
    fiber: 4,
    calcium: 25,
    iron: 1.2,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Jeera aloo is a simple potato dish flavored with cumin and spices.",
    benefits: "A familiar home-style carbohydrate dish.",
  },

  {
    id: 93,
    name: "Tinda Masala",
    quantity: "150g",
    calories: 110,
    protein: 3,
    carbs: 13,
    fat: 5,
    fiber: 4,
    calcium: 30,
    iron: 1,
    category: "Low Kcal",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Tinda masala is a traditional Indian vegetable preparation.",
    benefits: "Provides vegetables and dietary fiber.",
  },

  {
    id: 94,
    name: "Lauki Sabzi",
    quantity: "150g",
    calories: 90,
    protein: 2,
    carbs: 12,
    fat: 4,
    fiber: 3,
    calcium: 30,
    iron: 0.8,
    category: "Low Kcal",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Lauki sabzi is a simple bottle-gourd dish commonly prepared at home.",
    benefits: "Provides vegetables and dietary fiber.",
  },

  {
    id: 95,
    name: "Tori Sabzi",
    quantity: "150g",
    calories: 105,
    protein: 2,
    carbs: 13,
    fat: 5,
    fiber: 3,
    calcium: 35,
    iron: 1,
    category: "Low Kcal",
    meals: ["Lunch", "Dinner"],
    goals: ["General Health"],
    description: "Tori sabzi is a home-style ridge gourd preparation.",
    benefits: "Adds vegetables and fiber to everyday meals.",
  },

  {
    id: 96,
    name: "Butter Chicken",
    quantity: "200g",
    calories: 420,
    protein: 28,
    carbs: 12,
    fat: 29,
    fiber: 2,
    calcium: 80,
    iron: 2,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Butter chicken is a popular chicken dish served in a creamy tomato-based gravy.",
    benefits: "Provides protein and can be paired with rice or Indian breads.",
  },

  {
    id: 97,
    name: "Chicken Tikka",
    quantity: "150g",
    calories: 250,
    protein: 35,
    carbs: 5,
    fat: 10,
    fiber: 1,
    calcium: 35,
    iron: 1.5,
    category: "High Protein",
    meals: ["Lunch", "Dinner", "Snack"],
    goals: ["Muscle Support", "General Health"],
    description: "Chicken tikka consists of marinated chicken cooked with spices.",
    benefits: "A protein-rich dish commonly served as a restaurant starter.",
  },

  {
    id: 98,
    name: "Chicken Curry",
    quantity: "200g",
    calories: 320,
    protein: 30,
    carbs: 10,
    fat: 18,
    fiber: 2,
    calcium: 45,
    iron: 2,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Chicken curry is a common Indian dish made with chicken and spiced gravy.",
    benefits: "Provides protein and can be served with rice or roti.",
  },

  {
    id: 99,
    name: "Mutton Curry",
    quantity: "200g",
    calories: 390,
    protein: 28,
    carbs: 8,
    fat: 27,
    fiber: 2,
    calcium: 35,
    iron: 3,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Mutton curry is a traditional meat dish prepared with spices and gravy.",
    benefits: "Provides protein and iron as part of a varied diet.",
  },

  {
    id: 100,
    name: "Mutton Rogan Josh",
    quantity: "200g",
    calories: 410,
    protein: 27,
    carbs: 9,
    fat: 30,
    fiber: 2,
    calcium: 35,
    iron: 3,
    category: "High Protein",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "General Health"],
    description: "Rogan josh is a richly spiced meat curry associated with Kashmiri cuisine.",
    benefits: "Provides protein and iron in a traditional meat dish.",
  },

  {
    id: 101,
    name: "Chicken Biryani",
    quantity: "350g",
    calories: 600,
    protein: 28,
    carbs: 72,
    fat: 22,
    fiber: 3,
    calcium: 60,
    iron: 3,
    category: "High Kcal",
    meals: ["Lunch", "Dinner"],
    goals: ["Muscle Support", "Energy", "General Health"],
    description: "Chicken biryani combines rice, chicken, spices and aromatic ingredients.",
    benefits: "Provides carbohydrates and protein in a complete-style meal.",
  },

  {
    id: 102,
    name: "Veg Biryani",
    quantity: "350g",
    calories: 520,
    protein: 10,
    carbs: 78,
    fat: 17,
    fiber: 5,
    calcium: 55,
    iron: 3,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Vegetable biryani is an aromatic rice dish cooked with mixed vegetables and spices.",
    benefits: "Provides carbohydrates along with vegetables and fiber.",
  },

  {
    id: 103,
    name: "Garlic Naan",
    quantity: "1 piece",
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 8,
    fiber: 2,
    calcium: 70,
    iron: 2,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Garlic naan is a leavened Indian flatbread topped with garlic and herbs.",
    benefits: "A restaurant-style bread commonly paired with curries.",
  },

  {
    id: 104,
    name: "Tandoori Roti",
    quantity: "1 piece",
    calories: 120,
    protein: 4,
    carbs: 23,
    fat: 1.5,
    fiber: 3,
    calcium: 20,
    iron: 1.5,
    category: "High Carbs",
    meals: ["Lunch", "Dinner"],
    goals: ["Energy", "General Health"],
    description: "Tandoori roti is a wheat-based flatbread cooked in a tandoor.",
    benefits: "A common restaurant bread that pairs well with Indian curries.",
  },

  {
    id: 105,
    name: "Aloo Paratha",
    quantity: "1 piece",
    calories: 300,
    protein: 7,
    carbs: 40,
    fat: 12,
    fiber: 5,
    calcium: 40,
    iron: 2,
    category: "High Carbs",
    meals: ["Breakfast", "Lunch"],
    goals: ["Energy", "General Health"],
    description: "Aloo paratha is a stuffed Indian flatbread filled with seasoned potato.",
    benefits: "A popular home-style breakfast or meal option.",
  },
];

/* =========================================================
   GOALS
========================================================= */

const goalOptions = [
  { label: "All Goals", value: "All" },
  { label: "Muscle Support", value: "Muscle Support" },
  { label: "Strong Bones", value: "Strong Bones" },
  { label: "Teeth Support", value: "Teeth Support" },
  { label: "Hair Support", value: "Hair Support" },
  { label: "Skin Support", value: "Skin Support" },
  { label: "Energy", value: "Energy" },
  { label: "General Health", value: "General Health" },
];

/* =========================================================
   MEALS
========================================================= */

const mealOptions = [
  { label: "All Meals", value: "All" },
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" },
  { label: "Snack", value: "Snack" },
];

/* =========================================================
   FOOD COMPONENT
========================================================= */

function FoodName() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [meal, setMeal] = useState("All");
  const [goal, setGoal] = useState("All");

  const [selectedFood, setSelectedFood] = useState(null);

  const [showLimitFoods, setShowLimitFoods] = useState(false);

  /* =======================================================
     NEW ADD FOOD STATES
  ======================================================= */

  const [addFood, setAddFood] = useState(null);
  const [grams, setGrams] = useState("");

  const categories = [
    "All",
    "High Protein",
    "High Carbs",
    "High Kcal",
    "Low Kcal",
  ];

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredFoods = foodData.filter((food) => {
    const matchesCategory =
      category === "All" ||
      (category === "High Protein" && food.protein >= 15) ||
      (category === "High Carbs" && food.carbs >= 30) ||
      (category === "High Kcal" && food.calories >= 300) ||
      (category === "Low Kcal" && food.calories <= 100);

    const matchesMeal =
      meal === "All" || food.meals.includes(meal);

    const matchesGoal =
      goal === "All" || food.goals.includes(goal);

    return (
      matchesCategory &&
      matchesMeal &&
      matchesGoal
    );
  });

  /* =======================================================
     LABELS
  ======================================================= */

  const activeMealLabel =
    meal === "All" ? "All meals" : meal;

  const activeGoalLabel =
    goal === "All" ? "All goals" : goal;

  /* =======================================================
     RESET
  ======================================================= */

  const resetFilters = () => {
    setMeal("All");
    setGoal("All");
    setCategory("All");
  };

  /* =======================================================
     OPEN ADD FOOD CARD
  ======================================================= */

  const handleAddFood = (food) => {
    setAddFood(food);
    setGrams("");
  };

  /* =======================================================
     CLOSE ADD FOOD CARD
  ======================================================= */

  const closeAddFood = () => {
    setAddFood(null);
    setGrams("");
  };

  /* =======================================================
     NUTRITION CALCULATION ALGORITHM
  ======================================================= */

  const gramsNumber = Number(grams);

  const nutrition =
    addFood && gramsNumber > 0
      ? {
          calories:
            (addFood.calories / 100) *
            gramsNumber,

          protein:
            (addFood.protein / 100) *
            gramsNumber,

          carbs:
            (addFood.carbs / 100) *
            gramsNumber,

          fat:
            (addFood.fat / 100) *
            gramsNumber,

          fiber:
            (addFood.fiber / 100) *
            gramsNumber,
        }
      : null;

  /* =======================================================
     SAVE FOOD TO LOCAL STORAGE
  ======================================================= */

  const saveFoodToHome = () => {
    if (!addFood) {
      return;
    }

    if (!gramsNumber || gramsNumber <= 0) {
      alert("Please enter how many grams you ate.");
      return;
    }

    /*
      If user has selected a meal, use that meal.
      If "All Meals" is selected, default to Breakfast.
    */

    const selectedMeal =
      meal !== "All"
        ? meal
        : "Breakfast";

    const data =
      JSON.parse(
        localStorage.getItem("foodData")
      ) || {};

    const currentDate = new Date();

    const month =
      currentDate.toLocaleString(
        "en-US",
        {
          month: "long",
        }
      );

    const dateKey =
      `${month}-${currentDate.getDate()}`;

    /* Create date object */
    if (!data[dateKey]) {
      data[dateKey] = {};
    }

    /* Create meal array */
    if (!data[dateKey][selectedMeal]) {
      data[dateKey][selectedMeal] = [];
    }

    /* Food entry */
    const foodEntry = {
      name: addFood.name,

      grams: gramsNumber,

      calories: Number(
        nutrition.calories.toFixed(2)
      ),

      protein: Number(
        nutrition.protein.toFixed(2)
      ),

      carbs: Number(
        nutrition.carbs.toFixed(2)
      ),

      fat: Number(
        nutrition.fat.toFixed(2)
      ),

      fiber: Number(
        nutrition.fiber.toFixed(2)
      ),
    };

    /* Add food */
    data[dateKey][selectedMeal].push(
      foodEntry
    );

    /* Save */
    localStorage.setItem(
      "foodData",
      JSON.stringify(data)
    );

    /*
      Send update event.
      CalorieCircle.jsx can listen to this event
      and reload its data.
    */

    window.dispatchEvent(
      new Event("foodUpdated")
    );

    /* Close card */
    closeAddFood();

    /*
      Go back to Home.
      Home will read the updated foodData.
    */

    navigate("/");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="food-container">

      {/* ================= HERO ================= */}

      <header className="food-header">

        <div className="food-header-badge">
          NUTRITION PLANNER
        </div>

        <h1 className="food-title">
          Food & Nutrition
        </h1>

        <p className="food-subtitle">
          Build a better food selection by choosing
          a meal, nutrition goal and food category.
          Explore each food's key nutrients without
          clutter.
        </p>

        <div className="food-hero-stats">

          <div>
            <strong>
              {foodData.length}
            </strong>
            <span>
              Foods
            </span>
          </div>

          <div>
            <strong>
              {goalOptions.length - 1}
            </strong>
            <span>
              Goals
            </span>
          </div>

          <div>
            <strong>
              {mealOptions.length - 1}
            </strong>
            <span>
              Meal types
            </span>
          </div>

        </div>

      </header>

      {/* ================= CUSTOMIZATION ================= */}

      <section className="customization-panel">

        <div className="customization-heading">

          <div className="customization-icon">
            ⚙️
          </div>

          <div>

            <span className="customization-eyebrow">
              PERSONALIZE
            </span>

            <h2>
              Customize Your Food Choices
            </h2>

            <p>
              Choose your meal and nutrition focus.
              The food library updates automatically.
            </p>

          </div>

        </div>

        {/* MEAL FILTER */}

        <div className="customization-row">

          <div className="customization-group">

            <label>
              Meal
            </label>

            <div className="food-filters">

              {mealOptions.map((item) => (

                <button
                  type="button"
                  key={item.value}
                  className={
                    meal === item.value
                      ? "filter-btn active-filter"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setMeal(item.value)
                  }
                  aria-pressed={
                    meal === item.value
                  }
                >
                  {item.label}
                </button>

              ))}

            </div>

          </div>

          {/* GOAL FILTER */}

          <div className="customization-group">

            <label>
              Goal
            </label>

            <div className="food-filters">

              {goalOptions.map((item) => (

                <button
                  type="button"
                  key={item.value}
                  className={
                    goal === item.value
                      ? "filter-btn active-filter"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setGoal(item.value)
                  }
                  aria-pressed={
                    goal === item.value
                  }
                >
                  {item.label}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="customization-summary">

          <div className="summary-left">

            <span className="summary-dot" />

            <span>
              Showing foods for
            </span>

            <strong>
              {activeMealLabel}
            </strong>

            <span className="summary-divider">
              •
            </span>

            <strong>
              {activeGoalLabel}
            </strong>

          </div>

          <button
            type="button"
            className="reset-customization"
            onClick={resetFilters}
          >
            Reset
          </button>

        </div>

      </section>

      {/* ================= CATEGORY FILTER ================= */}

      <section className="category-section">

        <div className="category-heading">

          <div>

            <span className="section-eyebrow">
              REFINE RESULTS
            </span>

            <h2>
              Nutrition Categories
            </h2>

            <p>
              Filter the library by the nutrition
              profile you want to explore.
            </p>

          </div>

          <span className="food-count">
            {filteredFoods.length}{" "}
            {filteredFoods.length === 1
              ? "food"
              : "foods"}
          </span>

        </div>

        <div className="food-filters">

          {categories.map((item) => (

            <button
              type="button"
              key={item}
              className={
                category === item
                  ? "filter-btn active-filter"
                  : "filter-btn"
              }
              onClick={() =>
                setCategory(item)
              }
              aria-pressed={
                category === item
              }
            >
              {item}
            </button>

          ))}

        </div>

      </section>

      {/* ================= FOOD LIST ================= */}

      <section className="food-list-section">

        <div className="food-list-header">

          <div>

            <span className="list-eyebrow">
              FOOD LIBRARY
            </span>

            <h2>
              Recommended Food Choices
            </h2>

            <p className="food-results-meta">
              {filteredFoods.length} matching{" "}
              {filteredFoods.length === 1
                ? "option"
                : "options"}{" "}
              based on your current selection.
            </p>

          </div>

          <p className="food-list-helper">
            Open any card to see its complete
            nutrition profile, description and
            supported goals.
          </p>

        </div>

        {/* FOOD GRID */}

        <div className="food-grid">

          {filteredFoods.length > 0 ? (

            filteredFoods.map((food) => (

              <article
                className="food-card"
                key={food.id}
              >

                {/* CARD HEADER */}

                <div className="food-card-header">

                  <div className="food-name-area">

                    <div
                      className="food-avatar"
                      aria-hidden="true"
                    >
                      {food.name.charAt(0)}
                    </div>

                    <div className="food-name-copy">

                      <h3 className="food-name">
                        {food.name}
                      </h3>

                      <p className="food-quantity">
                        Per {food.quantity}
                      </p>

                    </div>

                  </div>

                  {/* CARD ACTIONS */}

                  <div className="food-card-actions">

                    <span className="food-category">
                      {food.category}
                    </span>

                    <button
                      type="button"
                      className="add-food-card-btn"
                      onClick={() =>
                        handleAddFood(food)
                      }
                      aria-label={`Add ${food.name}`}
                    >
                      <span className="add-icon">
                        +
                      </span>

                      <span>
                        Add
                      </span>

                    </button>

                  </div>

                </div>

                {/* CALORIES */}

                <div className="calorie-box">

                  <div className="calorie-main">

                    <strong>
                      {food.calories}
                    </strong>

                    <span>
                      kcal
                    </span>

                  </div>

                  <small>
                    Energy
                  </small>

                </div>

                {/* MACROS */}

                <div className="macro-container">

                  <div className="macro-box">

                    <span className="macro-icon">
                      💪
                    </span>

                    <strong>
                      {food.protein}g
                    </strong>

                    <small>
                      Protein
                    </small>

                  </div>

                  <div className="macro-box">

                    <span className="macro-icon">
                      ⚡
                    </span>

                    <strong>
                      {food.carbs}g
                    </strong>

                    <small>
                      Carbs
                    </small>

                  </div>

                  <div className="macro-box">

                    <span className="macro-icon">
                      🥑
                    </span>

                    <strong>
                      {food.fat}g
                    </strong>

                    <small>
                      Fat
                    </small>

                  </div>

                </div>

                {/* CARD FOOTER */}

                <div className="food-card-footer">

                  <p className="food-description">
                    {food.description}
                  </p>

                  <button
                    type="button"
                    className="view-details-btn"
                    onClick={() =>
                      setSelectedFood(food)
                    }
                    aria-label={`View details for ${food.name}`}
                  >

                    <span>
                      View Details
                    </span>

                    <span className="details-arrow">
                      →
                    </span>

                  </button>

                </div>

              </article>

            ))

          ) : (

            <div className="empty-state">

              <div className="empty-icon">
                🍽️
              </div>

              <h3>
                No matching foods
              </h3>

              <p>
                Try another meal, goal or
                nutrition category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
              >
                Reset Filters
              </button>

            </div>

          )}

        </div>

      </section>

      {/* ================= LIMIT FOODS ================= */}

      <section className="limit-foods-section">

        <button
          type="button"
          className="limit-foods-toggle"
          onClick={() =>
            setShowLimitFoods(
              (previous) => !previous
            )
          }
          aria-expanded={showLimitFoods}
        >

          <span>
            Foods to consider less often
          </span>

          <span>
            {showLimitFoods ? "−" : "+"}
          </span>

        </button>

        {showLimitFoods && (

          <div className="limit-foods-content">

            <p>
              Choose a varied diet and enjoy
              different foods across your meals.
              Foods high in added sugar or heavily
              processed foods can be enjoyed less often.
            </p>

          </div>

        )}

      </section>

      {/* ================= FOOTNOTE ================= */}

      <div className="nutrition-note">

        <span>
          💡
        </span>

        <p>
          Nutrition values are approximate and can
          vary with food variety, brand, portion and
          preparation method. Use the information as
          a general guide rather than a medical or
          dietary prescription.
        </p>

      </div>

      {/* =====================================================
          ADD FOOD GRAMS MODAL
      ===================================================== */}

      {addFood && (

        <div
          className="food-modal-overlay"
          onClick={closeAddFood}
          role="presentation"
        >

          <div
            className="food-modal add-food-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-food-title"
          >

            {/* CLOSE */}

            <button
              type="button"
              className="modal-close"
              onClick={closeAddFood}
              aria-label="Close add food"
            >
              ×
            </button>

            {/* HEADER */}

            <div className="modal-header">

              <div
                className="modal-avatar"
                aria-hidden="true"
              >
                {addFood.name.charAt(0)}
              </div>

              <div className="modal-title-area">

                <span className="modal-category">
                  {addFood.category}
                </span>

                <h2 id="add-food-title">
                  Add {addFood.name}
                </h2>

                <p>
                  Meal:{" "}
                  {meal === "All"
                    ? "Breakfast"
                    : meal}
                </p>

              </div>

            </div>

            {/* GRAMS INPUT CARD */}

            <div className="modal-block">

              <div className="modal-block-title">

                <span>
                  ⚖️
                </span>

                <div>

                  <h3>
                    How much did you eat?
                  </h3>

                  <p>
                    Enter the amount in grams.
                  </p>

                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "16px",
                }}
              >

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={grams}
                  placeholder="Enter grams"
                  onChange={(event) =>
                    setGrams(event.target.value)
                  }
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(0,0,0,0.12)",
                    fontSize: "16px",
                    outline: "none",
                  }}
                />

                <strong>
                  g
                </strong>

              </div>

            </div>

            {/* CALCULATED NUTRITION CARD */}

            {nutrition && (

              <div className="modal-block">

                <div className="modal-block-title">

                  <span>
                    📊
                  </span>

                  <div>

                    <h3>
                      Your Nutrition
                    </h3>

                    <p>
                      Calculated for {gramsNumber}g
                    </p>

                  </div>

                </div>

                <div className="nutrition-grid">

                  <div className="nutrition-item">

                    <span>
                      Calories
                    </span>

                    <strong>
                      {nutrition.calories.toFixed(1)} kcal
                    </strong>

                  </div>

                  <div className="nutrition-item">

                    <span>
                      Protein
                    </span>

                    <strong>
                      {nutrition.protein.toFixed(1)}g
                    </strong>

                  </div>

                  <div className="nutrition-item">

                    <span>
                      Carbs
                    </span>

                    <strong>
                      {nutrition.carbs.toFixed(1)}g
                    </strong>

                  </div>

                  <div className="nutrition-item">

                    <span>
                      Fat
                    </span>

                    <strong>
                      {nutrition.fat.toFixed(1)}g
                    </strong>

                  </div>

                  <div className="nutrition-item">

                    <span>
                      Fiber
                    </span>

                    <strong>
                      {nutrition.fiber.toFixed(1)}g
                    </strong>

                  </div>

                </div>

              </div>

            )}

            {/* ADD BUTTON */}

            <button
              type="button"
              className="modal-done-btn"
              onClick={saveFoodToHome}
            >
              Add Food
            </button>

          </div>

        </div>

      )}

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {selectedFood && (

        <div
          className="food-modal-overlay"
          onClick={() =>
            setSelectedFood(null)
          }
          role="presentation"
        >

          <div
            className="food-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="food-modal-title"
          >

            {/* CLOSE */}

            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setSelectedFood(null)
              }
              aria-label="Close details"
            >
              ×
            </button>

            {/* HEADER */}

            <div className="modal-header">

              <div
                className="modal-avatar"
                aria-hidden="true"
              >
                {selectedFood.name.charAt(0)}
              </div>

              <div className="modal-title-area">

                <span className="modal-category">
                  {selectedFood.category}
                </span>

                <h2 id="food-modal-title">
                  {selectedFood.name}
                </h2>

                <p>
                  Nutrition per{" "}
                  {selectedFood.quantity}
                </p>

              </div>

            </div>

            {/* CALORIES */}

            <div className="modal-calorie">

              <div>

                <strong>
                  {selectedFood.calories}
                </strong>

                <span>
                  kcal
                </span>

              </div>

              <small>
                Energy
              </small>

            </div>

            {/* NUTRITION */}

            <div className="modal-block">

              <div className="modal-block-title">

                <span>
                  📊
                </span>

                <div>

                  <h3>
                    Nutrition Breakdown
                  </h3>

                  <p>
                    Key nutrients in this serving
                  </p>

                </div>

              </div>

              <div className="nutrition-grid">

                {[
                  [
                    "Protein",
                    `${selectedFood.protein}g`,
                  ],
                  [
                    "Carbohydrates",
                    `${selectedFood.carbs}g`,
                  ],
                  [
                    "Fat",
                    `${selectedFood.fat}g`,
                  ],
                  [
                    "Fiber",
                    `${selectedFood.fiber}g`,
                  ],
                  [
                    "Calcium",
                    `${selectedFood.calcium}mg`,
                  ],
                  [
                    "Iron",
                    `${selectedFood.iron}mg`,
                  ],
                ].map(
                  ([label, value]) => (

                    <div
                      className="nutrition-item"
                      key={label}
                    >

                      <span>
                        {label}
                      </span>

                      <strong>
                        {value}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* ABOUT */}

            <div className="modal-block">

              <div className="modal-block-title">

                <span>
                  ℹ️
                </span>

                <div>

                  <h3>
                    About This Food
                  </h3>

                  <p>
                    A quick overview of the food
                    and its nutrition profile.
                  </p>

                </div>

              </div>

              <p className="modal-description">
                {selectedFood.description}
              </p>

            </div>

            {/* BENEFITS */}

            <div className="modal-benefit">

              <div className="benefit-icon">
                ✓
              </div>

              <div>

                <h3>
                  Why Include It?
                </h3>

                <p>
                  {selectedFood.benefits}
                </p>

              </div>

            </div>

            {/* GOALS */}

            <div className="modal-block">

              <div className="modal-block-title">

                <span>
                  🎯
                </span>

                <div>

                  <h3>
                    Suitable For
                  </h3>

                  <p>
                    Nutrition goals this food
                    can support
                  </p>

                </div>

              </div>

              <div className="modal-goals">

                {selectedFood.goals.map(
                  (item) => (

                    <span key={item}>
                      {item}
                    </span>

                  )
                )}

              </div>

            </div>

            {/* DONE */}

            <button
              type="button"
              className="modal-done-btn"
              onClick={() =>
                setSelectedFood(null)
              }
            >
              Done
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default FoodName;

