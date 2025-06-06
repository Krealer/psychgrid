// ===============================
// PsychGrid – kael_dialogue.js
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
  {
    text: "Alright. Take this. Don’t make me regret it.",
    options: [
      { label: "Thank you.", goto: null, effect: { give: "wood_handle" } }
    ]
  },
  {
    text: "No. I *am* better. And you just lost your chance.",
    options: [
      { label: "Try me.", goto: null, effect: { take: "iron_ingot" } }
    ]
  },
  {
    text: "Watch your words. Next time, I won’t just take an item.",
    options: [
      { label: "You’re right. That was too far.", goto: null },
      { label: "Go ahead. Do your worst.", goto: null, effect: { take: "wood_handle" } }
    ]
  }
];
