// ===============================
// PsychGrid – selena_dialogue.js (v0.6.0)
// ===============================

export const selenaDialogue = [
  {
    text: "So, you’ve finally decided to grovel for help.",
    options: [
      { label: "I don’t need your help.", goto: 1, memoryFlag: "challenged_selena" },
      { label: "I respect your intelligence.", goto: 2, memoryFlag: "flattered_selena" }
    ]
  },

  {
    text: "You clearly do. But denying it is so... entertaining.",
    options: [
      { label: "We’ll see who’s laughing last.", goto: 3, memoryFlag: "taunted_selena" },
      { label: "I came for answers, not games.", goto: 4, memoryFlag: "sincere_request" }
    ]
  },

  {
    text: "Flattery? Cute. But not currency I accept.",
    options: [
      { label: "Then what *do* you want?", goto: 5, memoryFlag: "probed_motives" },
      { label: "You’re wasting my time.", goto: 6, memoryFlag: "dismissed_selena" }
    ]
  },

  {
    text: "Poor thing. You’re going to lose something now.",
    options: [
      { label: "Touché.", goto: null, take: "iron_ingot", memoryFlag: "punished_by_selena" }
    ]
  },

  {
    text: "Then you should know — logic will fail you here. Emotion is the only true key.",
    options: [
      { label: "That… actually makes sense.", goto: 7, memoryFlag: "agreed_with_selena" },
      { label: "That’s nonsense.", goto: 3, memoryFlag: "mocked_selena" }
    ]
  },

  {
    text: "What I want is to watch the room consume you.",
    options: [
      { label: "You’re bluffing.", goto: 6, memoryFlag: "called_bluff" },
      { label: "I’ll survive. With or without you.", goto: 7, memoryFlag: "asserted_independence" }
    ]
  },

  {
    text: "And yet here you are. Still listening.",
    options: [
      { label: "Goodbye, Selena.", goto: null, memoryFlag: "walked_away" },
      { label: "You win this round.", goto: null, take: "wood_handle", memoryFlag: "conceded_to_selena" }
    ]
  },

  {
    text: "You're more interesting than I expected. Still doomed, though.",
    options: [
      {
        label: "I have a notebook. Maybe you'd like it for your theories.",
        goto: 8,
        condition: (state) => state.inventory.includes("notebook"),
        memoryFlag: "offered_notebook"
      },
      {
        label: "I'll leave you to your doom speeches.",
        goto: null,
        memoryFlag: "ignored_theory_offer"
      }
    ]
  },

  {
    text: "Intriguing. I *will* take that notebook.",
    options: [
      {
        label: "It's yours. I expect something back.",
        goto: 9,
        take: "notebook",
        memoryFlag: "traded_notebook"
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
        condition: (state) => !state.inventory.includes("key_mold"),
        memoryFlag: "received_key_mold"
      }
    ]
  }
];
