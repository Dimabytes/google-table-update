import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment';

const doc = new GoogleSpreadsheet(process.env.SHEET_ID!);

const init = async () => {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_CLIENT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY!,
  });
};

const main = async () => {
  await doc.loadInfo();
  const summarySheet = doc.sheetsByTitle.Summary;
  const historySheet = doc.sheetsByTitle.history;

  await summarySheet.loadCells('A1:B12');
  const currentDateTime = moment().format('DD.MM.YYYY h:mm:ss a');
  const cash = summarySheet.getCellByA1('B2').value;
  const stocks = summarySheet.getCellByA1('B3').value;
  const gold = summarySheet.getCellByA1('B4').value;
  const funds = summarySheet.getCellByA1('B5').value;
  const bonds = summarySheet.getCellByA1('B6').value;
  const crypto = summarySheet.getCellByA1('B7').value;
  const sumUSD = summarySheet.getCellByA1('B9').value;
  const sumRUB = summarySheet.getCellByA1('B11').value;
  await historySheet.addRows([
    [currentDateTime, cash, stocks, gold, funds, bonds, crypto, sumUSD, sumRUB],
  ]);
};

init().then(main);
