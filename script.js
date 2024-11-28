let turn = "O";
let opt;
let AllBtns = document.querySelectorAll(".btn");
let changeTurn = (e) => {
  if (turn == "X") {
    turn = "O";
  } else {
    turn = "X";
  }
};
let Write_XO = (e) => {
  if (turn == "X") {
    changeTurn();
    return "O";
  } else {
    changeTurn();
    return "X";
  }
};
let wait = async (e) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, 1500);
  });
};
let clear2 = async () => {
  await wait();
  let AllBtns2 = Array.from(AllBtns);
  if (AllBtns2.every((btn) => btn.textContent != "")) {
    AllBtns2.forEach((e) => {
      e.textContent = "";
      Didisable();
      cover.style.zIndex = "-9999";
      win = false;
    });
  }
};
let clear = async (e) => {
  await wait();
  AllBtns.forEach((e) => {
    e.textContent = "";
    e.classList.remove("green");
    cover.style.zIndex = "-9999";
    win = false;
  });
  await wait();
  Didisable();
};
let passKeys = [
  [0, 4, 8],
  [1, 4, 7],
  [0, 1, 2],
  [3, 4, 5],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [2, 4, 6],
];
let win;
let check = (e) => {
  passKeys.forEach((line) => {
    let [a, b, c] = line;
    if (line.every((e) => AllBtns[e].textContent == "X")) {
      AllBtns[a].classList.add("green");
      AllBtns[b].classList.add("green");
      AllBtns[c].classList.add("green");
      disable();
      clear();
      win = true;
    } else if (line.every((e) => AllBtns[e].textContent == "O")) {
      AllBtns[a].classList.add("green");
      AllBtns[b].classList.add("green");
      AllBtns[c].classList.add("green");
      disable();
      clear();
      win = true;
    }
  });
};

let Options = document.querySelector(".intro");
let play_bord = document.querySelector(".play_bord");

let disable = () => {
  AllBtns.forEach((e) => {
    e.setAttribute("disabled", "true");
  });
};

let Didisable = () => {
  AllBtns.forEach((e) => {
    e.removeAttribute("disabled");
  });
};
let insert = (e) => {};
let insertCPU = async () => {
  let inserted;
  passKeys.forEach((line) => {
    if (
      AllBtns[line[0]].textContent == "O" &&
      AllBtns[line[1]].textContent == "O"
    ) {
      if (AllBtns[line[2]].textContent == "") {
        AllBtns[line[2]].textContent = "O";
        inserted = true;
      }
    } else if (
      AllBtns[line[0]].textContent == "O" &&
      AllBtns[line[2]].textContent == "O"
    ) {
      if (AllBtns[line[1]].textContent == "") {
        AllBtns[line[1]].textContent = "O";
        inserted = true;
      }
    } else if (
      AllBtns[line[1]].textContent == "O" &&
      AllBtns[line[2]].textContent == "O"
    ) {
      if (AllBtns[line[0]].textContent == "") {
        AllBtns[line[0]].textContent = "O";
        inserted = true;
      }
    } else if (
      AllBtns[line[0]].textContent == "X" &&
      AllBtns[line[2]].textContent == "X"
    ) {
      if (AllBtns[line[1]].textContent == "") {
        AllBtns[line[1]].textContent = "O";
        inserted = true;
        cover.style.zIndex = "-9999";
      }
    } else if (
      AllBtns[line[0]].textContent == "X" &&
      AllBtns[line[2]].textContent == "X"
    ) {
      if (AllBtns[line[1]].textContent == "") {
        AllBtns[line[1]].textContent = "O";
        cover.style.zIndex = "-9999";
        inserted = true;
      }
    } else if (
      AllBtns[line[1]].textContent == "X" &&
      AllBtns[line[2]].textContent == "X"
    ) {
      if (AllBtns[line[0]].textContent == "") {
        AllBtns[line[0]].textContent = "O";
        cover.style.zIndex = "-9999";
        inserted = true;
      }
    }
  });
  if (!inserted) {
    let num;
    num = Math.floor(Math.random() * 9);
    if (AllBtns[num].textContent == "") {
      AllBtns[num].textContent = "O";
      cover.style.zIndex = "-9999";
    } else {
      insertCPU();
    }
  }
};
let Man2Man = (e) => {
  Options.style.display = "none";
  play_bord.style.display = "block";
  AllBtns.forEach((btn) => {
    if (opt == "M2M") {
      btn.addEventListener("click", (e) => {
        clear2();
        if (btn.textContent == "") {
          btn.textContent = Write_XO();
          btn.setAttribute("disabled", "true");
        }
        check();
      });
    }
  });
};
let cover = document.querySelector(".cover");
let CPU2Man = async (e) => {
  Options.style.display = "none";
  play_bord.style.display = "block";
  AllBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      clear2();
      if (opt == "CPU") {
        if (btn.textContent == "") {
          btn.textContent = "X";
          btn.setAttribute("disabled", "true");
          cover.style.zIndex = "9999";
        }
        check();
        await wait();
        if (!win) {
          insertCPU();
          check();
        }
      }
    });
  });
};
let manVsManBtn = document.querySelector(".U2U");
manVsManBtn.addEventListener("click", (e) => {
  opt = "M2M";
  AllBtns.forEach((e) => {
    e.textContent = "";
    e.removeAttribute("disabled");
  });
  Man2Man();
});

let CPUVsManBtn = document.querySelector(".CPU");
CPUVsManBtn.addEventListener("click", (e) => {
  opt = "CPU";
  AllBtns.forEach((e) => {
    e.textContent = "";
    e.removeAttribute("disabled");
  });
  CPU2Man();
});

document.querySelector(".back").addEventListener("click", (e) => {
  window.location.href = window.location.href;
});

document.querySelector(".Clear").addEventListener("click", (e) => {
  clear();
});
