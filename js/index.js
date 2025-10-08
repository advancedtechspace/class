// const API_URL = "http://localhost:8000";
const API_URL = "https://api-master.onrender.com";

const SUBJECTS = [
  { id: "math", label: "Matemática" },
  { id: "physics", label: "Física" },
  { id: "chemistry", label: "Química" },
  { id: "draw", label: "Desenho" },
  { id: "pt", label: "Português" },
  { id: "eng", label: "Inglês" },
  { id: "history", label: "História" },
  { id: "geo", label: "Geografia" },
  { id: "bio", label: "Biologia" },
  { id: "it", label: "TIC's" },
];

let sbjs = "";

for (const s of SUBJECTS) {
  sbjs += `
    <div>
      <input type="checkbox" name="${s.id}" id="${s.id}" />
      <label for="${s.id}">${s.label}</label>
    </div>
  `;
}

document.querySelector(".subjects").innerHTML = sbjs;

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelector("#submit").disabled = true;

  const subjects = {};

  const form = new FormData(e.target);

  for (const s of SUBJECTS) {
    subjects[s.id] = form.get(s.id);
  }

  let at_least_one_subject = false;

  for (const s in subjects) {
    if (!Object.hasOwn(subjects, s)) continue;

    const element = subjects[s];
    at_least_one_subject = element == "on";
    if (at_least_one_subject) break;
  }

  if (!at_least_one_subject) {
    alert("Seleccione pelo menos uma disciplina!");
    document.querySelector("#submit").disabled = false;
    return;
  }

  const email = form.get("email");
  const contact = form.get("contact");
  const desc = form.get("desc");
  const location = form.get("location");
  const level = form.get("level");

  const data = { email, contact, desc, location, level, subjects };

  const res = await fetch(API_URL + "/class/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      app: "class",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.log(error);
  });

  if (res.status === 200) {
    const data = await res.json();
    console.log(data);
    alert("Obrigado, em breve entraremos em contacto.");
    e.target.reset();
  } else {
    console.log("Erro ao autenticar");
    alert("Erro interno!");
  }

  document.querySelector("#submit").disabled = false;
});
