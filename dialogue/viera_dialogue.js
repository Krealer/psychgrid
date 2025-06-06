// ===============================
// PsychGrid – viera_dialogue.js
// ===============================

export const vieraDialogue = [
  {
    text: "If you're here to ask for help, make it worth my time.",
    options: [
      { label: "You seem to know what you're doing.", goto: 1 },
      { label: "I’ll figure it out without you.", goto: 2 }
    ]
  },
  {
    text: "Of course I do. I don’t waste effort on failure.",
    options: [
      { label: "I’d rather learn than fail.", goto: 3 },
      { label: "Then teach me something.", goto: 4 }
    ]
  },
  {
    text: "Then go. But don’t cry when you get stuck.",
    options: [
      { label: "I won’t. Bye.", goto: null }
    ]
  },
  {
    text: "Curious. That’s not the answer I expected.",
    options: [
      { label: "Maybe you underestimate people.", goto: 5 },
      { label: "Maybe you overestimate yourself.", goto: 6 }
    ]
  },
  {
    text: "Fine. Here’s a piece of the puzzle — don’t mess it up.",
    options: [
      { label: "Thanks, Viera.", goto: null, effect: { give: "wood_handle" } }
    ]
  },
  {
    text: "I *never* overestimate. But now you’ve annoyed me.",
    options: [
      { label: "That wasn’t my intention.", goto: null },
      { label: "Prove it. Take something.", goto: null, effect: { take: "iron_ingot" } }
    ]
  }
];
