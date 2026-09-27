# הצילו את הסוכה!

משחק סוכות משפחתי: הסוכה רועדת, הקישוטים נופלים, וגפן או פלג תופסים אותם. קובץ אחד, `index.html`, רץ בכל דפדפן בטלפון בלי התקנה.

## פרסום ב־GitHub Pages
1. יוצרים ב־GitHub מאגר חדש וציבורי בשם `save-the-sukkah` (בלי README).
2. מהתיקייה הזו:
   ```
   git init -b main
   git add .
   git commit -m "Save the Sukkah game"
   git remote add origin https://github.com/<USER>/save-the-sukkah.git
   git push -u origin main
   ```
3. ב־GitHub: Settings → Pages → Source: "Deploy from a branch", Branch: `main`, תיקייה `/ (root)` → Save.
4. אחרי דקה־שתיים המשחק זמין ב־`https://<USER>.github.io/save-the-sukkah/` — זה הקישור לווטסאפ.

כל שינוי: עורכים את `index.html`, ואז `git commit -am "..."` ו־`git push`.

## טבלת שיאים משותפת (Google Sheets)
1. יוצרים Google Sheet ריק, ואז Extensions → Apps Script.
2. מדביקים את התוכן של `apps-script.gs` ושומרים.
3. Deploy → New deployment → סוג Web app. Execute as: **Me**. Who has access: **Anyone**. מאשרים את ההרשאות.
4. מעתיקים את כתובת ה־`/exec` ומדביקים אותה ב־`index.html` בשורה `const SCORES_URL = '';`.
5. `git commit -am "Shared leaderboard"` ו־`git push`.

בלי כתובת, השיאים נשמרים רק על המכשיר של כל שחקן.
