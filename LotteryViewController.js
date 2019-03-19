// Copyright Jason Daniels 2019 Licensed under the Academic Free License version 3.0

function LotteryViewController() {
  var pullAllInstruction = document.getElementById("pullAllInstruction");
  var reviewInstruction = document.getElementById("reviewInstruction");
  var pullAllButton = document.getElementById("pull-all-button");
  var resetButton = document.getElementById("resetButton");
  var pulledNamesTitle = document.getElementById("pulledNamesTitle");
  var titleLabel = document.getElementById("titleLabel");
  var selectedDIV = document.getElementById("pulled-names");
  var chooseInstruction = document.getElementById("chooseInstruction");
  var csvFileInput = document.getElementById("csvFileInput");
  var storage = LotteryStorage();
  var lottery;
  var csvViewModel;

  function pullAll() {
    while (lottery.pull() != null) { }

    storage.store(lottery);
    displayLotteryResult();
  }

  function viewDidLoad() {
    lottery = storage.stored();

    if (lottery != null) {
      displayLotteryResult();
    } else {
      displayLotteryFileInput();
    }
  }

  function displayLotteryResult() {
    var selectedViewModel = LotterySelectedViewModel(lottery.selectedPool());

    titleLabel.innerHTML = lottery.name;

    titleLabel.hidden = false;
    chooseInstruction.hidden = true;
    reviewInstruction.hidden = true;
    csvFileInput.hidden = true;
    pullAllInstruction.hidden = true;
    pullAllButton.hidden = true;
    pulledNamesTitle.hidden = false;
    selectedDIV.innerHTML = selectedViewModel.labelListSelected();
    resetButton.hidden = false;
  }

  function displayLotteryPull() {
    var poolViewModel = LotterySelectedViewModel(lottery.pool);

    csvFileInput.value = null;

    titleLabel.hidden = false;
    chooseInstruction.hidden = true;
    reviewInstruction.hidden = false;
    csvFileInput.hidden = false;
    pullAllInstruction.hidden = false;
    pullAllButton.hidden = false;
    pulledNamesTitle.hidden = true;
    selectedDIV.innerHTML = poolViewModel.labelListSelected();
    resetButton.hidden = true;
  }

  function displayLotteryFileInput() {
    titleLabel.hidden = true;
    chooseInstruction.hidden = false;
    reviewInstruction.hidden = true;
    csvFileInput.hidden = false;
    pullAllInstruction.hidden = true;
    pullAllButton.hidden = true;
    pulledNamesTitle.hidden = true;
    selectedDIV.innerHTML = "";
    resetButton.hidden = true;

    csvViewModel = LotteryCSVViewModel({fileInput: csvFileInput, onCSVArray: didLoadCSVArray})
  }

  function resetStorage() {
    if (confirm("Reset will remove the selected names.")) {
      resetLottery();
    }
  }

  function resetLottery() {
    lottery = null;
    csvFileInput.value = null;

    storage.reset();
    displayLotteryFileInput();
  }

  function didLoadCSVArray(array, name) {
    titleLabel.innerHTML = name;
    lottery = LotteryController({name: name, pool: array, count: 25});

    displayLotteryPull();
  }

  return {
    viewDidLoad: viewDidLoad,
    pullAll: pullAll,
    resetStorage: resetStorage
  }
}
