// ===============================
// PsychGrid – kael_dialogue.js (v0.4.0)
// ===============================

export const kaelDialogue = [
  {
    text: "You sure you want to talk to me? I don't have patience for games.",
    options: [
      { label: "Just asking for help.", goto: 1 },
      { label: "I can handle you.", goto: 2 }
    ]
  },

  {
    text: "Help? Hah. Only the strong deserve it.",
    options: [
      { label: "I am strong. Prove me wrong.", goto: 3 },
      { label: "Fine, forget it.", goto: null }
    ]
  },

  {
    text: "You've got guts. But guts aren't enough.",
    options: [
      { label: "You think you're better?", goto: 4 },
      { label: "Maybe you’re just scared to share power.", goto: 5 }
    ]
  },

  // SUCCESSFUL BRANCH – grants iron_ingot
  {
    text: "Hmph. Fine. Take this before I change my mind.",
    options: [
      {
        label: "Thanks. I won’t waste it.",
        goto: null,
        give: "iron_ingot",
        condition: (state) => !state.inventory.includes("iron_ingot")
      }
    ]
  },

  // FAIL PATH
  {
    text: "No. I *am* better. And you just lost your chance.",
    options: [
      { label: "You’ll regret that.", goto: null }
    ]
  },

  // THREAT PATH
  {
    text: "Watch your words. I don’t hand out favors.",
    options: [
      { label: "You're right. That was too far.", goto: null },
      {
        label: "Then I’ll take it by force.",
        goto: null,
        take: "iron_ingot",
        condition: (state) => state.inventory.includes("iron_ingot")
      }
    ]
  }
];
