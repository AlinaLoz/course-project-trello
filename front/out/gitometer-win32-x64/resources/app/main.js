const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadFile('./public/index.html')

  mainWindow.on('close', function () {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
  console.log('close app');
});