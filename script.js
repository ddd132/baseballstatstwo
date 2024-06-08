const playerstats = {};
function inputname() {
  const playername = document.getElementById('playername').value;
  if (!playername) return;
  document.getElementById('currentplayer').innerText = playername;
  document.getElementById('statsoptions').style.display = 'block';
  if (!playerstats[playername]) {
    playerstats[playername] = {
      singles: 0,
      doubles: 0,
      triples: 0,
      homeruns: 0,
      strikeouts: 0,
      walks: 0,
      sacrificeflies: 0,
      sacrificebunts: 0,
      interference: 0,
      outs: 0
    };
  }
}

function addstat() {
  const playername = document.getElementById('currentplayer').innerText;
  const choice = document.getElementById('statchosing').value;
  switch (parseInt(choice)) {
    case 1:
      playerstats[playername].singles++;
      break;
    case 2:
      playerstats[playername].doubles++;
      break;
    case 3:
      playerstats[playername].triples++;
      break;
    case 4:
      playerstats[playername].homeruns++;
      break;
    case 5:
      playerstats[playername].strikeouts++;
      break;
    case 6:
      playerstats[playername].walks++;
      break;
    case 7:
      playerstats[playername].sacrificeflies++;
      break;
    case 8:
      playerstats[playername].sacrificebunts++;
      break;
    case 9:
      playerstats[playername].interference++;
      break;
    case 10:
      playerstats[playername].outs++;
      break;
    default:
      alert(' try again.');
  }
  updateplayerstatstable();
}



function querystats() {
  const playername = document.getElementById('findplayername').value;
  if (!playerstats[playername]) {
    alert('player not found.');
    return;
  }

  document.getElementById('queriedplayer').innerText = playername;
  const stats = playerstats[playername];
  const atbats = stats.singles + stats.doubles + stats.triples + stats.homeruns + stats.strikeouts + stats.outs;
  const hits = stats.singles + stats.doubles + stats.triples + stats.homeruns;
  const plateappearances = atbats + stats.walks + stats.sacrificeflies + stats.interference;
  const totalbases = stats.singles + 2 * stats.doubles + 3 * stats.triples + 4 * stats.homeruns;
  const onbasepercentage = plateappearances > 0 ? (hits + stats.walks + stats.interference) / plateappearances : 0;
  const sluggingpercentage = atbats > 0 ? totalbases / atbats : 0;
  const ops = onbasepercentage + sluggingpercentage;

  document.getElementById('atbats').innerText = 'at bats: ' + atbats;
  document.getElementById('onbasepercentage').innerText = 'on-base percentage: ' + onbasepercentage.toFixed(3);
  document.getElementById('sluggingpercentage').innerText = 'slugging percentage: ' + sluggingpercentage.toFixed(3);
  document.getElementById('ops').innerText = 'ops: ' + ops.toFixed(3);
  document.getElementById('displaystats').style.display = 'block';
}

function updateplayerstatstable() {
  const tablebody = document.getElementById('statstablebody');
  tablebody.innerHTML = '';
  for (const playername in playerstats) {
    const stats = playerstats[playername];
    const atbats = stats.singles + stats.doubles + stats.triples + stats.homeruns + stats.strikeouts + stats.outs;
    const hits = stats.singles + stats.doubles + stats.triples + stats.homeruns;
    const plateappearances = atbats + stats.walks + stats.sacrificeflies + stats.interference;
    const totalbases = stats.singles + 2 * stats.doubles + 3 * stats.triples + 4 * stats.homeruns;
    const onbasepercentage = plateappearances > 0 ? (hits + stats.walks + stats.interference) / plateappearances : 0;
    const sluggingpercentage = atbats > 0 ? totalbases / atbats : 0;
    const ops = onbasepercentage + sluggingpercentage;
    const row = document.createElement('tr');
    row.innerHTML = `
              <td>${playername}</td>
              <td>${stats.singles}</td>
              <td>${stats.doubles}</td>
              <td>${stats.triples}</td>
              <td>${stats.homeruns}</td>
              <td>${stats.strikeouts}</td>
              <td>${stats.walks}</td>
              <td>${stats.sacrificeflies}</td>
              <td>${stats.sacrificebunts}</td>
              <td>${stats.interference}</td>
              <td>${stats.outs}</td>
              <td>${atbats}</td>
              <td>${onbasepercentage.toFixed(3)}</td>
              <td>${sluggingpercentage.toFixed(3)}</td>
              <td>${ops.toFixed(3)}</td>
          `;
    tablebody.appendChild(row);
  }
  document.getElementById('playerstatstable').style.display = 'block';
}