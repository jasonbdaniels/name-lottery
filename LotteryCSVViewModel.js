// Copyright Jason Daniels 2019 Licensed under the Academic Free License version 3.0

///- Parameter fileInput: HTML Input object
///- Parameter onCSVArray: Function to be called when a file has been converted to an array.
function LotteryCSVViewModel(parameters) {
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
