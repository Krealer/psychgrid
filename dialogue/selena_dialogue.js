// ===============================
// PsychGrid – selena_dialogue.js (v0.4.0)
// ===============================

export const selenaDialogue = [
  {
    text: "So, you’ve finally decided to grovel for help.",
    options: [
      { label: "I don’t need your help.", goto: 1 },
      { label: "I respect your intelligence.", goto: 2 }
    ]
  },

  {
    text: "You clearly do. But denying it is so... entertaining.",
    options: [
      { label: "We’ll see who’s laughing last.", goto: 3 },
      { label: "I came for answers, not games.", goto: 4 }
    ]
  },

  {
    text: "Flattery? Cute. But not currency I accept.",
    options: [
      { label: "Then what *do* you want?", goto: 5 },
      { label: "You’re wasting my time.", goto: 6 }
    ]
  },

  {
    text: "Poor thing. You’re going to lose something now.",
    options: [
      { label: "Touché.", goto: null, take: "iron_ingot" }
    ]
  },

  {
    text: "Then you should know — logic will fail you here. Emotion is the only true key.",
    options: [
      { label: "That… actually makes sense.", goto: 7 },
      { label: "That’s nonsense.", goto: 3 }
    ]
  },

  {
    text: "What I want is to watch the room consume you.",
    options: [
      { label: "You’re bluffing.", goto: 6 },
      { label: "I’ll survive. With or without you.", goto: 7 }
    ]
  },

  {
    text: "And yet here you are. Still listening.",
    options: [
      { label: "Goodbye, Selena.", goto: null },
      { label: "You win this round.", goto: null, take: "wood_handle" }
    ]
  },

  // Branch that accepts notebook for key mold
  {
    text: "You're more interesting than I expected. Still doomed, though.",
    options: [
      {
        label: "I have a notebook. Maybe you'd like it for your theories.",
        goto: 8,
        condition: (state) => state.inventory.includes("notebook")
      },
      {
        label: "I'll leave you to your doom speeches.",
        goto: null
      }
    ]
  },

  {
    text: "Intriguing. I *will* take that notebook.",
    options: [
      {
        label: "It's yours. I expect something back.",
        goto: 9,
        take: "notebook"
      }
    ]
  },

  {
    text: "Fair is fair. Here's something... you may find it useful.",
    options: [
      {
        label: "What is it?",
        goto: null,
        give: "key_mold",
        condition: (state) => !state.inventory.includes("key_mold")
      }
    ]
  }
];
