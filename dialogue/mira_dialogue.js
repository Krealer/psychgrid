// ===============================
// PsychGrid – mira_dialogue.js (v0.6.0)
// ===============================

export const miraDialogue = [
  {
    text: "Oh… hi. I didn’t think anyone would talk to me.",
    options: [
      { label: "Of course I would.", goto: 1, memoryFlag: "felt_seen" },
      { label: "Are you okay?", goto: 2, memoryFlag: "checked_on_her" }
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
      { label: "The chest?", goto: 3 },
      { label: "Never mind.", goto: null, memoryFlag: "dismissed_mira" }
    ]
  },

  {
    text: "Yes! But… I also heard something about iron and a stick. Maybe you can mix them?",
    options: [
      { label: "That actually helps. Thank you.", goto: 4, memoryFlag: "encouraged_mira" },
      { label: "That sounds made up.", goto: 5, memoryFlag: "doubted_mira" }
    ]
  },

  {
    text: "You’re welcome! Oh—take this, it might help.",
    options: [
      {
        label: "Thanks, Mira.",
        goto: null,
        give: "iron_ingot",
        condition: (state) => !state.inventory.includes("iron_ingot"),
        memoryFlag: "gave_iron_ingot"
      }
    ]
  },

  {
    text: "Oh… sorry… maybe I’m wrong.",
    options: [
      { label: "It’s okay. You meant well.", goto: null, memoryFlag: "forgave_mira" }
    ]
  }
];
