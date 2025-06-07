// ===============================
// PsychGrid – viera_dialogue.js (v0.6.0)
// ===============================

export const vieraDialogue = [
  {
    text: "If you're here to ask for help, make it worth my time.",
    options: [
      { label: "You seem to know what you're doing.", goto: 1, memoryFlag: "viera_respected" },
      { label: "I’ll figure it out without you.", goto: 2, memoryFlag: "viera_dismissed" }
    ]
  },

  {
    text: "Of course I do. I don’t waste effort on failure.",
    options: [
      { label: "I’d rather learn than fail.", goto: 3, memoryFlag: "viera_humbled" },
      { label: "Then teach me something.", goto: 4, memoryFlag: "viera_requested_help" }
    ]
  },

  {
    text: "Then go. But don’t cry when you get stuck.",
    options: [
      { label: "I won’t. Bye.", goto: null, memoryFlag: "viera_rejected" }
    ]
  },

  {
    text: "Curious. That’s not the answer I expected.",
    options: [
      { label: "Maybe you underestimate people.", goto: 5, memoryFlag: "viera_challenged_back" },
      { label: "Maybe you overestimate yourself.", goto: 6, memoryFlag: "viera_insulted" }
    ]
  },

  {
    text: "Fine. Here’s something you might actually use.",
    options: [
      {
        label: "Thanks, Viera.",
        goto: null,
        give: "leather_strip",
        condition: (state) => !state.inventory.includes("leather_strip"),
        memoryFlag: "viera_helped_player"
      }
    ]
  },

  {
    text: "I *never* overestimate. But now you’ve annoyed me.",
    options: [
      { label: "That wasn’t my intention.", goto: null, memoryFlag: "viera_defused" },
      {
        label: "Prove it. Take something.",
        goto: null,
        take: "iron_ingot",
        condition: (state) => state.inventory.includes("iron_ingot"),
        memoryFlag: "viera_punished_player"
      }
    ]
  }
];
