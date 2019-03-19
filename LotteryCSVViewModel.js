// Copyright Jason Daniels 2018 Licensed under the Academic Free License version 3.0

///- Parameter fileInput: HTML Input object
///- Parameter onCSVArray: Function to be called when a file has been converted to an array.
function LotteryCSVViewModel(parameters) {
  //title displayed when file is loaded
  //upload button displayed when there is no File

  // var csvInput = document.getElementById("csvInput");
  // var loadFromInput = function(input) {
  //   var csvReader = new FileReader();
  //   csvReader.onload = makeCSVPrinter(csvReader);
  //   csvReader.readAsText(input.files[0]);
  // };
  var csvReader = new FileReader();
  var viewModel = {
    csvArray: [],
    fileName: null
  }

  function csvLoaded() {
    viewModel.csvArray = csvToArray(csvReader.result);

    parameters.onCSVArray(viewModel.csvArray, viewModel.fileName);
  }

  function readCSV() {
    csvReader.onload = csvLoaded
    viewModel.fileName = parameters.fileInput.files[0].name;

    csvReader.readAsText(parameters.fileInput.files[0]);
  }

  parameters.fileInput.onchange = readCSV;
  viewModel.readCSV = readCSV;

  return viewModel;
}
