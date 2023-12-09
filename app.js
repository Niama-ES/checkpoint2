const express = require('express');
const app = express();

// Middleware personnalisé pour vérifier l'heure
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (dimanche) à 6 (samedi)
  const hourOfDay = now.getHours();

  // Vérifier si c'est un jour de travail (lundi à vendredi) et si c'est entre 9h et 17h
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Heures de travail, continuer avec la requête suivante
  } else {
    res.send('L\'application n\'est disponible que pendant les heures de travail.');
  }
};

// Utiliser le middleware personnalisé pour toutes les routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
  res.send('Page d\'accueil');
});

app.get('/services', (req, res) => {
  res.send('Nos services');
});

app.get('/contact', (req, res) => {
  res.send('Nous contacter');
});

// Lancer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.set('view engine', 'ejs'); // Remplacez 'ejs' par le moteur de template de votre choix