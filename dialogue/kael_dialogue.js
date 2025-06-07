// ===============================
// PsychGrid – kael_dialogue.js (v0.6.0)
// ===============================

export const kaelDialogue = [
  {
    text: "You sure you want to talk to me? I don't have patience for games.",
    options: [
      { label: "Just asking for help.", goto: 1, memoryFlag: "approached_calmly" },
      { label: "I can handle you.", goto: 2, memoryFlag: "confronted" }
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

  // SUCCESSFUL BRANCH – grants notebook
  {
    text: "Hmph. Fine. Take this before I change my mind.",
    options: [
      {
        label: "Thanks. I won’t waste it.",
        goto: null,
        give: "notebook",
        condition: (state) => !state.inventory.includes("notebook"),
        memoryFlag: "gave_notebook"
      }
    ]
  },

  // FAIL PATH
  {
    text: "No. I *am* better. And you just lost your chance.",
    options: [
      { label: "You’ll regret that.", goto: null, memoryFlag: "rejected_by_kael" }
    ]
  },

  // THREAT PATH – player tries to steal
  {
    text: "Watch your words. I don’t hand out favors.",
    options: [
      {
        label: "You're right. That was too far.",
        goto: null,
        memoryFlag: "backed_down"
      },
      {
        label: "Then I’ll take it by force.",
        goto: null,
        take: "notebook",
        condition: (state) => state.inventory.includes("notebook"),
        memoryFlag: "threatened_kael"
      }
    ]
  }
];
