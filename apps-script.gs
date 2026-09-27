// Shared leaderboard for "הצילו את הסוכה!" — paste into Extensions > Apps Script of an empty Google Sheet.
// Deploy > New deployment > Web app: Execute as "Me", Who has access "Anyone". Copy the /exec URL into SCORES_URL in index.html.

const SHEET = 'scores';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(['name', 'score', 'kid', 'at']); }
  return sh;
}

function top10_() {
  const rows = sheet_().getDataRange().getValues().slice(1)
    .filter((r) => r[0] !== '' && !isNaN(Number(r[1])))
    .map((r) => ({ name: String(r[0]).slice(0, 12), score: Number(r[1]), kid: r[2] === 'peleg' ? 'peleg' : 'gefen', at: Number(r[3]) || 0 }));
  rows.sort((a, b) => b.score - a.score || a.at - b.at);
  return rows.slice(0, 10);
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_(top10_());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    const name = String(d.name || '').trim().slice(0, 12);
    const score = Math.floor(Number(d.score));
    // basic sanity limits so a typo or a prank can't flood the table
    if (name && score > 0 && score < 100000) {
      sheet_().appendRow([name, score, d.kid === 'peleg' ? 'peleg' : 'gefen', Number(d.at) || Date.now()]);
    }
  } finally {
    lock.releaseLock();
  }
  return json_(top10_());
}
