
  var firebaseConfig = {
    apiKey: "AIzaSyCNyn98mBehZ-Xs-P7ZoMIAeccdSAsWjnE",
    authDomain: "jeel-65147.firebaseapp.com",
    projectId: "jeel-65147",
    storageBucket: "jeel-65147.appspot.com",
    messagingSenderId: "733897492005",
    appId: "1:733897492005:web:39662d61932fd5595321cc",
    
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const projects = document.querySelector(".project-temp");

function loadData(doc) {
  let project_card = document.createElement("div");
  let projectName = document.createElement("h2");
  let date = document.createElement("small");
  let content = document.createElement("p");
  let tags = document.createElement("small");
  let btn = document.createElement("div");
  let link = document.createElement("a");
  let repo = document.createElement("a");

  project_card.setAttribute("class", "project-description");
  btn.setAttribute("class", "button");
  repo.setAttribute("href", doc.data().repo);

  projectName.textContent = doc.data().name;
  date.textContent = doc.data().date;
  content.innerHTML = doc.data().content;
  tags.innerHTML = "<b>Tech-Stack</b> : " + doc.data().tags;
  repo.textContent = "Repo";

  if (doc.data().link != "") {
    link.setAttribute("href", doc.data().link);
    link.textContent = "Link";
    btn.appendChild(link);
  }

  btn.appendChild(repo);

  project_card.appendChild(projectName);
  project_card.appendChild(date);
  project_card.appendChild(content);
  project_card.appendChild(tags);
  project_card.appendChild(btn);

  projects.appendChild(project_card);
}

db.collection("projects")
  .orderBy("createdAt", "desc")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      loadData(doc);
    });
  });
