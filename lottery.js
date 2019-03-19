// Copyright Jason Daniels 2019 Licensed under the Academic Free License version 3.0

///Manages a lottery of names by randomly selecting items.
///- Parameter name: The name for the pool
///- Parameter pool: The full list of items.
///- Parameter count: The number of items to randomly select from the pool.
///- Parameter unselected: The unselected indices to choose from in the pool.
///- Parameter selected: The selected indices chooses from the pool.
function LotteryController(lotteryConfig) {
// function LotteryController(pool, count, unselected, selected) {
  function pull() {
    if (this.selected.length == this.count) { return null; }
    var max = this.unselected.length;
    if (max == 0) { return null }
    var index = Math.floor((Math.random() * max));
    var poolIndex = this.unselected[index];

    this.unselected.splice(index, 1);
    this.selected.push(poolIndex);

    return this.pool[poolIndex];
  }

  function selectedPool() {
    var items = [];

    for (index of this.selected) {
      items.push(this.pool[index]);
    }

    return items;
  }

  function isAllPulled() {
    return this.selected.length == count;
  }

  if (lotteryConfig.unselected == null) {
    lotteryConfig.unselected = [];
    lotteryConfig.selected = [];

    for (var i = 0; i < lotteryConfig.pool.length; i++) {
      lotteryConfig.unselected.push(i);
    }
  }

  if (lotteryConfig.count >= lotteryConfig.pool.length) {
    lotteryConfig.count = lotteryConfig.pool.length - 1;
  }

  return {
    name: lotteryConfig.name,
    pool: lotteryConfig.pool,
    count: lotteryConfig.count,
    selected: lotteryConfig.selected,
    unselected: lotteryConfig.unselected,
    pull: pull,
    selectedPool: selectedPool,
    isAllPulled: isAllPulled
  }
}

function LotteryStorage() {
  var storageKey = "lottery-controller"
  function stored() {
    var lotteryJSON = JSON.parse(localStorage.getItem(storageKey));

    if (lotteryJSON != null) {
      return LotteryController(lotteryJSON)
    } else {
      return null;
    }
  }

  function store(lotteryController) {
    localStorage.setItem(storageKey, JSON.stringify(lotteryController));
  }

  function reset() {
    localStorage.removeItem(storageKey);
  }

  if (typeof(Storage) !== "undefined") {
    return {
      stored: stored,
      store: store,
      reset: reset
    }
  } else {
    return null;
  }
}

function LotterySelectedViewModel(selected) {
  function labelListSelected() {
    var html = "<ol>";

    for (selection of this.selected) {
      html += "\n\t<li>" + selection + "</li>"
    }

    return html + "\n</ol>";
  }

  return {
    selected: selected,
    labelListSelected: labelListSelected
  }
}
