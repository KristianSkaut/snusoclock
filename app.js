// Požádej uživatele o povolení notifikací
if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    console.log("Notification permission:", permission);
  });
}

function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("Snus O'clock 🕒", {
      body: "Je čas na snus!",
      // icon: 'icon.png' // Volitelně přidej ikonu
    });
  }
}

function checkSnusTime() {
  // Nahraje soubor snus.json z kořenového adresáře repozitáře
  fetch("snus.json")
    .then(response => response.json())
    .then(data => {
      const snusTimeStr = data.snus_time; // Např. "16:37"
      const [snusHour, snusMinute] = snusTimeStr.split(":").map(Number);

      const now = new Date();
      // Vytvoří dnešní čas s danou hodinou a minutou
      const snusTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        snusHour,
        snusMinute,
        0
      );
      const diff = snusTime - now;

      if (diff <= 0) {
        document.getElementById("status").innerText = "Dnešní Snus O'clock již proběhl!";
      } else {
        document.getElementById("status").innerText =
          "Čekám na dnešní Snus O'clock v " + snusTimeStr;
        // Po uplynutí rozdílu spustí notifikaci
        setTimeout(showNotification, diff);
      }
    })
    .catch(err => {
      document.getElementById("status").innerText =
        "Chyba při načítání času: " + err;
    });
}

checkSnusTime();
