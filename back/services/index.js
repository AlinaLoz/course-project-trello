const HistoryEmmiter = require("./HistoryEmmiter");

class Services {
  constructor() {
    this.historyEmmitter = new HistoryEmmiter();
  }
}

module.exports = Services;