tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.12)",
      },
      animation: {
        "in-pop": "inPop .18s ease-out",
        "toast": "toastIn .22s ease-out",
      },
      keyframes: {
        inPop: { "0%": { transform: "scale(.98)", opacity: 0 }, "100%": { transform: "scale(1)", opacity: 1 } },
        toastIn: { "0%": { transform: "translateY(10px)", opacity: 0 }, "100%": { transform: "translateY(0)", opacity: 1 } },
      },
    },
  },
};
