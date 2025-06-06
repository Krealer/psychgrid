// ===============================
// PsychGrid – mira_dialogue.js
// ===============================

export const miraDialogue = [
  {
    text: "Oh… hi. I didn’t think anyone would talk to me.",
    options: [
      { label: "Of course I would.", goto: 1 },
      { label: "Are you okay?", goto: 2 }
    ]
  },
  {
    text: "That’s… really nice. I want to help you.",
    options: [
      { label: "Do you know how to get out?", goto: 3 }
    ]
  },
  {
    text: "I… I think so? Maybe the chest has a way.",
    options: [
      { label: "The chest?", goto: 4 },
      { label: "Never mind.", goto: null }
    ]
  },
  {
    text: "Yes! But… I also heard something about iron and a stick. Maybe you can mix them?",
    options: [
      { label: "That actually helps. Thank you.", goto: 5 },
      { label: "That sounds made up.", goto: 6 }
    ]
  },
  {
    text: "You’re welcome! Oh—take this, it might help.",
    options: [
      { label: "Thanks, Mira.", goto: null, effect: { give: "iron_ingot" } }
    ]
  },
  {
    text: "Oh… sorry… maybe I’m wrong.",
    options: [
      { label: "It’s okay. You meant well.", goto: null }
    ]
  }
];
